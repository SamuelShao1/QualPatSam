import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, Switc, useLocation } from 'react-router-dom';
import { Doughnut } from 'react-chartjs-2';
import '../../App.js';
import '../../index.css';
import '../../style.css';
import { Disclosure, Transition } from '@headlessui/react'

import {
  DraftingCompass,
  Lightbulb,
  FolderOpen,
  Rabbit,
  ChevronUp,
} from 'lucide-react';
import ProjectBar from './ProjectBar/ProjectBar'

const Results = () => {
  const navigate = useNavigate(); 


  const items = [
    { label: 'Create a New Project', Icon: DraftingCompass, path: '/projectMain' },
    { label: 'Quick Analysis', Icon: Rabbit, path: '/uploadText' },
    { label: 'Open a Project', Icon: FolderOpen, path: '/open-project' },
    { label: 'Help Desk', Icon: Lightbulb, path: '/help-desk' },
  ];

  const location = useLocation();
  const apiResults = location.state?.apiResults || [];
  const peopleQuestions = location.state?.peopleQuestions || [];
  const peopleActualQuestions = location.state?.peopleActualQuestions || [];
  let sentiment = [];
  let topics = [];
  let totalcount = [];
  

  let sentimentTally = [0, 0, 0]; // 0 for Positive, 1 for Neutral, 2 for Negative

  const extractData = (analysisString) => {
    analysisString = analysisString.replace(/^"|"$/g, '');

    const scoresMatch = analysisString.match(/\[\[(.*?)\]/);
    const scores = scoresMatch ? scoresMatch[1].split(',').map(Number) : [];
    sentiment.push(scores);
    const wordCountMatch = analysisString.match(/\], (\d+),/);
    const wordCount = wordCountMatch ? parseInt(wordCountMatch[1], 10) : null;
    totalcount.push(wordCount);

    const topicsMatch = analysisString.match(/\], \d+, \[(.*?)\]\]$/);
    let topicsWithScores = topicsMatch ? topicsMatch[1] : '';

    const topicsStringMatch = analysisString.match(/\], \d+, \[(.*?)\]\]$/);
    let topicsString = topicsStringMatch ? topicsStringMatch[1] : '';
    topicsString = topicsString.replace(/[{()}]/g, '');
    topicsString = topicsString.replace(/[\[\]']+/g, '');
    topicsString = topicsString.replace(/_/g, ' ');
    topicsWithScores = topicsWithScores.split("', '").map(topicScoreStr => {
      const [topic, score] = topicScoreStr
        .replace(/^\('/, '') // Remove "('"
        .replace(/\)'$/, '') // Remove "')"
        .split("', ")
        .map(s => s.trim().replace(/^'|'$/g, ''));
      return { topic, score: parseFloat(score) };
    });
    topics.push(topicsWithScores);
    const highestTopic = topicsWithScores.reduce(
      (max, current) => (max.score > current.score ? max : current),
      { topic: '', score: -Infinity }
    ).topic;

    return { scores, wordCount, topicsString, highestTopic };
  };

  const determineSentiment = (scores) => {
    const [positiveScore, neutralScore, negativeScore] = scores;
    return 'Positive: ' + positiveScore + ', Neutral: ' + neutralScore + ', Negative: ' + negativeScore;
  };

  const processSentiment = (questionData) => {
    const sentiment = determineSentiment(questionData.scores);
    const positiveScore = parseFloat(sentiment.match(/Positive: (\d+(\.\d+)?)/)[1]);
    const neutralScore = parseFloat(sentiment.match(/Neutral: (\d+(\.\d+)?)/)[1]);
    const negativeScore = parseFloat(sentiment.match(/Negative: (\d+(\.\d+)?)/)[1]);

    if (positiveScore > negativeScore && positiveScore > neutralScore) sentimentTally[0]++;
    else if (neutralScore > positiveScore && neutralScore > negativeScore) sentimentTally[1]++;
    else if (negativeScore > positiveScore && negativeScore > neutralScore) sentimentTally[2]++;
  };

  const createTableForPerson = (personName, questions, personApiResults) => {
    let topicsFrequency = {};
    let sentimentFrequency = {};
    let totalWordCount = 0;

    let sentimentTally = [0, 0, 0];

    const questionRows = questions.map((question, index) => {
      const analysisString = personApiResults[index + 1];
      const data = extractData(analysisString);

      if (!data) {
        return (
          <tr key={index}>
            <td>{question}</td>
            <td colSpan="3">Error: Analysis data is not available.</td>
          </tr>
        );
      }

      processSentiment(data);
      const sentiment = determineSentiment(data.scores);

      topicsFrequency[data.highestTopic] = (topicsFrequency[data.highestTopic] || 0) + 1;
      sentimentFrequency[sentiment] = (sentimentFrequency[sentiment] || 0) + 1;
      totalWordCount += data.wordCount;
      return (
        <tr key={index}>
          <td>{question}</td>
          <td>{data.topicsString}</td>
          <td>{sentiment}</td>
          <td>{data.wordCount}</td>
        </tr>
      );
    });

    const getTopTopics = () => {
      return Object.entries(topicsFrequency)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(entry => entry[0])
        .join(', ');
    };

    const getMostFrequentSentiment = () => {
      return Object.entries(sentimentFrequency)
        .sort((a, b) => b[1] - a[1])
        .map(entry => entry[0])[0];
    };

    return (
      <table className="results-table" key={personName}>
        <thead>
          <tr>
            <th>Speaker 1</th>
            <th colSpan="3">Speaker 2</th>
          </tr>
          <tr>
            <th>{personName}</th>
            <th>Topics</th>
            <th>Sentiment</th>
            <th>Word Count</th>
          </tr>
        </thead>
        <tbody>{questionRows}</tbody>
        <tfoot>
          <tr>
            <td>Summary</td>
            <td>{getTopTopics()}</td>
            <td>{getMostFrequentSentiment()}</td>
            <td>{totalWordCount}</td>
          </tr>
        </tfoot>
      </table>
    );
  };

  const generateTables = () => {
    return apiResults.map((personResults, index) => {
      const [personName, ...questions] = peopleActualQuestions[index];
      let topicsFrequency = {};
      let sentimentFrequency = { 'Positive': 0, 'Neutral': 0, 'Negative': 0 };
      let totalWordCount = 0;
      let questionDetails = questions.map((question, idx) => {
        const analysisString = personResults[idx + 1];
        const data = extractData(analysisString);
        if (data) {
          processSentiment(data);
          topicsFrequency[data.highestTopic] = (topicsFrequency[data.highestTopic] || 0) + 1;
          totalWordCount += data.wordCount;
          return {
            question,
            topicsString: data.topicsString,
            sentiment: determineSentiment(data.scores),
            wordCount: data.wordCount
          };
        }
        return {
          question,
          topicsString: 'Error: Analysis data is not available',
          sentiment: 'Error',
          wordCount: 0
        };
      });
  
      const sentimentCounts = {
        Positive: sentimentTally[0],
        Neutral: sentimentTally[1],
        Negative: sentimentTally[2]
      };
  
      return {
        personName,
        questionDetails,
        totalWordCount,
        sentimentCounts
      };
    });
  };
  

  const tables = generateTables();

  const data = {
    labels: ['Positive', 'Negative', 'Neutral'],
    datasets: [
      {
        label: 'Sentiment',
        data: [sentimentTally[0], sentimentTally[2], sentimentTally[1]],
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };


  const prepareCSVData = () => {
    let questions = peopleActualQuestions.toString().split(',')
    const numRows = peopleActualQuestions.toString().split(',').length;
    const csvData = [];

    for (let i = 0; i < numRows - 1; i++) {
      const row = [
        questions[i + 1],
        sentiment[i],
        topics[i],
        totalcount[i],
      ];
      csvData.push(row.join(','));
    }

    return csvData.toString();
  };

  const tablesData = generateTables();

  function judgeResponse (sentimentCounts) {
    let totalcount = sentimentCounts.Positive + sentimentCounts.Neutral + sentimentCounts.Negative;
    let positiveRatio = sentimentCounts.Positive / totalcount;
    let neutralRatio = sentimentCounts.Neutral / totalcount;
    let negativeRatio = sentimentCounts.Negative / totalcount;
    let judgement = "Error."
    let ratio =
    console.log("pos", positiveRatio);
    if (positiveRatio > .50) {
      if  (positiveRatio > .8) {
        judgement = (<div className='bg-green-400 mx-1 p-1 px-2 text-xs rounded-full'>Very Positive</div>);
        ratio = (<div className='bg-green-400 mx-1 p-1 px-2 text-xs rounded-full'>+{(positiveRatio * 100).toFixed(0)}%</div>);
      } else if (positiveRatio + negativeRatio > 0.7){
        judgement = (<div className='bg-green-100 mx-1 p-1 px-2 text-xs rounded-full'>Slightly Positive</div>);
        ratio = (<div className='bg-green-100 mx-1 p-1 px-2 text-xs rounded-full'>+{(positiveRatio * 100).toFixed(0)}%</div>);
      } else {
        judgement = (<div className='bg-green-200 mx-1 p-1 px-2 text-xs rounded-full'>More Positive</div>);
        ratio = (<div className='bg-green-200 mx-1 p-1 px-2 text-xs rounded-full'>+{(positiveRatio * 100).toFixed(0)}%</div>);
      }
    } else if (neutralRatio > .50) {
      judgement = (<div className='bg-yellow-200 mx-1 p-1 px-2 text-xs rounded-full'>Neutral</div>);
      ratio = (<div className='bg-green-200 mx-1 p-1 px-2 text-xs rounded-full'>{(neutralRatio * 100).toFixed(0)}%</div>);
    } else if (negativeRatio > .50) {
      if  (negativeRatio > .8) {
        judgement = (<div className='bg-red-400 mx-1 p-1 px-2 text-xs rounded-full'>Very Negative</div>);
        ratio = (<div className='bg-red-400 mx-1 p-1 px-2 text-xs rounded-full'>-{(negativeRatio * 100).toFixed(0)}%</div>);
      } else if (positiveRatio + negativeRatio > 0.7){
        judgement = (<div className='bg-red-100 mx-1 p-1 px-2 text-xs rounded-full'>Slightly Negative</div>);
        ratio = (<div className='bg-red-100 mx-1 p-1 px-2 text-xs rounded-full'>-{(negativeRatio * 100).toFixed(0)}%</div>);
      } else {
        judgement = (<div className='bg-red-200 mx-1 p-1 px-2 text-xs rounded-full'>More Negative</div>);
        ratio = (<div className='bg-red-200 mx-1 p-1 px-2 text-xs rounded-full'>-{(negativeRatio * 100).toFixed(0)}%</div>);
      }
    } else {
      judgement = (<div className='bg-gray-200 mx-1 p-1 px-2 text-xs rounded-full'>Mixed</div>);
      ratio = (<div className='bg-gray-200 mx-1 p-1 px-2 text-xs rounded-full'>NA%</div>);
    }

    return [judgement, ratio];

  }

  return (
    <div className='w-full h-full '>
      <div className='grid grid-cols-[3fr_2fr] gap-[2vh] py-[2vh] px-[1.5vw] '>
        <div className='flex flex-col border shadow-lg  shadow-blue rounded-xl p-[2vh] shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] shadow-blue-100 '>
          <div className="overflow-auto flex-grow bg-white rounded-xl p-[1vh] ">
            <h className="m-2 text-brand-300">Responses</h>

            {tablesData.map((table, index) => (
              
              <div className='flex-col mb-2 rounded-xl  border-[1.5px] items-center hover:bg-blue-100 hover:border-blue-300 ' key={index}>
                
                <Disclosure>
                    {({ open }) => (
                <>
                  <Disclosure.Button className="items-center flex justify-between py-1.5 w-full rounded-full text-left px-5 text-brand-300">
                    <span className='text-sm'>{table.personName}</span>

                    <div className='flex items-center'>
                      <span>{judgeResponse(table.sentimentCounts)[0]}</span>
                      <span>{judgeResponse(table.sentimentCounts)[1]}</span>
                      <span className='text-xs bg-brand-200 flex items-center rounded-full p-1 px-2 mx-2'>{table.totalWordCount} words</span>

                      <ChevronUp
                        className={`${
                          open ? 'rotate-180 transform ' : ''
                        } h-5 w-5 text-brand-blue`}
                      />
                    </div>
                  </Disclosure.Button>
                  <Transition
                    show={open}
                    enter="transition duration-300 ease-out"
                    enterFrom="transform scale-y-0 opacity-0"
                    enterTo="transform scale-y-100 opacity-100"
                    leave="transition duration-150 ease-in"
                    leaveFrom="transform scale-y-100 opacity-100"
                    leaveTo="transform scale-y-0 opacity-0"
                    className="origin-top"
                  >
                    <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
                    <table className="results-table">
                        <thead>
                          <tr>
                            <th>Question</th>
                            <th>Topics</th>
                            <th>Sentiment</th>
                            <th>Word Count</th>
                          </tr>
                        </thead>
                        <tbody>
                          {table.questionDetails.map((detail, idx) => (
                            <tr key={idx}>
                              <td>{detail.question}</td>
                              <td>{detail.topicsString}</td>
                              <td>{detail.sentiment}</td>
                              <td>{detail.wordCount}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <p>Total Word Count: {table.totalWordCount}</p>
                <p>Sentiment Counts: Positive - {table.sentimentCounts.Positive}, Neutral - {table.sentimentCounts.Neutral}, Negative - {table.sentimentCounts.Negative}</p>
                  </Disclosure.Panel>
                  </Transition>
                  
                </>
              )}
                  
                </Disclosure>
                
                
              </div>
            ))}
            
          </div>
        </div>
        <div className='flex flex-col rounded-xl border p-[2vh] shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] shadow-blue-100 '>
          <span className='text-[1rem] text-brand-300'>Insights</span>
          <div className=' bg-white rounded-3xl p-[3vh] w-[40vh]'><Doughnut data={data} /></div>
          
        </div>
      </div>
      
    </div>
  );
}



export default Results;