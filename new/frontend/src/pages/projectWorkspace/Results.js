import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, Switc, useLocation } from 'react-router-dom';
import Papa from 'papaparse';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import { CSVLink } from 'react-csv';
import '../../App.js';
import '../../index.css';
import '../../style.css';
import HeaderBar from '../../components/HeaderBar.js';
import TooltipAnimate from '../../utility/TooltipAnimate.js';
import Loading from '../utilityPages/Loading.js';

import {
  Code,
  Compass,
  DraftingCompass,
  Lightbulb,
  UserRound,
  Info,
  FolderOpen,
  Rabbit,
  Circle,
} from 'lucide-react';
import ProjectBar from '../../components/ProjectBar.js';
import EditableTitle from '../../utility/EditableTitle.js';

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
      return createTableForPerson(personName, questions, personResults);
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

  console.log(sentiment);
  console.log(topics);
  console.log(totalcount);

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
      console.log(csvData);
    }

    return csvData.toString();
  };


    return (
      <div className=' w-full h-full'>   

          <div className='h-screen flex'>
            <div className=' w-full h-full'>   
              <div className=' font-medium'>
                  <p className=''>
                      <p className='text-brand-250 text-2xl'>
                          Results
                      </p>
                  </p>
              </div>
              
              <div>
                <div className='left'>
                  <button className="button-style" type="button">
                    <Link to="/uploadFile">Back</Link>
                  </button>
                </div>
                <div className="right">
                  <button className="button-style" type="button">
                    <Link to="/history">History</Link>
                  </button>
                </div>
                <div className="right">
                  <CSVLink className="button-style" filename="analysis_results.csv" data={prepareCSVData()}>
                    Export to CSV
                  </CSVLink>
                </div>
                
                <div className="results-container">{generateTables()}</div>
                <div className="center-hor w-[50rem]">
                  <Doughnut data={data} />
                </div>
                <div style={{ height: 310 }}></div>

              </div>
            </div>
          </div>
      </div>

    );
}


export default Results;