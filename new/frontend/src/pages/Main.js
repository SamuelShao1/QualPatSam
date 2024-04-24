import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, Switc, useLocation } from 'react-router-dom';
import Papa from 'papaparse';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import { CSVLink } from 'react-csv';
import '../App.css';
import '../index.css';
import '../style.css';
import HeaderBar from '../components/HeaderBar.js';
import ProjectMain from './projectWorkspace/ProjectMain.js';
import Construction from './utilityPages/Construction.js';
import NotFound from './utilityPages/NotFound.js';
import Loading from './utilityPages/Loading.js';
import Login from '../pages/entry/Login.js';
import Entry from '../pages/entry/Entry.js';
import useAuth from '../hooks/useAuth.js';
import RequireAuth from '../utility/RequireAuth.js'
import { useSpring, animated } from 'react-spring';

import {
  Code,
  Compass,
  DraftingCompass,
  Lightbulb,
  UserRound,
  Info,
  FolderOpen,
  Rabbit,
} from 'lucide-react';
import { getAuth } from "firebase/auth";


function Home() {
  const auth = getAuth();
  const user = auth.currentUser;
  
  const navigate = useNavigate();

  const items = [
    { label: 'Create a New Project', Icon: DraftingCompass, path: '/projectMain' },
    { label: 'Quick Analysis', Icon: Rabbit, path: '/uploadText' },
    { label: 'Open a Project', Icon: FolderOpen, path: '/open-project' },
    { label: 'Help Desk', Icon: Lightbulb, path: '/help-desk' },
  ];
  const props = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 }
  });
  

  const name = () => {
    if (user && user.displayName) {
      const firstName = user.displayName.split(" ")[0];
      return firstName || 'User';
    } else {
      return ''
    }
  };
  return (
      <animated.div style={props} className="relative h-screen flex-1 pb-[15vh] overflow-hidden no-scroll bg-gradient-to-b from-blue-200 via-white to-white">
        <HeaderBar className=''/>
        <div className=' h-screen flex items-center justify-center'>
          <div className='no-scrollbar h-full pb-40 flex-col items items-center '>  
          
            { user ? 
              ( 
                <div className='h-full'>
                  <div className='flex justify-center items-center w-[80vh]'>
                    <div className=' my-[5vh] p-[1vh] text-[7vh] font-medium  w-[70vh] '>
                      <span className='text-black flex justify-center bg-gradient-to-br from-[#1b8f53] via-[#4285f4] to-[#1b8f53] bg-clip-text [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]'>
                        <p className='flex justify-center '>
                          Hello, 
                        </p>
                        <p className='ml-2 flex justify-center '>
                          {name()}
                        </p>
                      </span>
                      <p className='flex items-center justify-center'>
                        Let's get started.
                      </p>
                    </div>
                  </div>
                  <div className='pb-[5vh] flex justify-center bg-overflow-hidden no-scroll text-[2vh] grid grid-cols-[repeat(auto-fill,minmax(20vh,25vh))] gap-[1vh] p-5 '>
                    {items.map(({ label, Icon, path }, idx) => (
                        <div
                          className='group relative h-[23vh] w-[23vh] cursor-pointer rounded-3xl bg-white border shadow-xl p-[2vh] duration-300 hover:bg-brand-100 hover:shadow-blue-100 '
                          key={idx}
                          onClick={() => navigate(path)}
                        >
                          <p className='text-brand-300 gradient-text'>{label}</p>
                          <div className='text-brand-300 absolute bottom-4 right-4 rounded-full bg-white border shadow p-2'>
                            <Icon style={{ width: '2vh', height: '2vh' }} />
                          </div>
                        </div>
                    ))}
                    </div>
                </div>
                ) 
                : 
                (
                <div className='flex-col justify-center'>
                    <div className='flex justify-center items-center w-[80vh]'>
                      <div className=' my-[5vh] p-[1vh] text-[7vh] font-medium  w-[70vh] '>
                        <span className='text-black flex-col justify-center'>
                          <p className='flex justify-center bg-gradient-to-br from-[#1b8f53] via-[#4285f4] to-[#1b8f53] bg-clip-text [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]'>
                            Hello
                          </p>
                          <p className='flex justify-center'>
                            Let's get started.
                          </p>
                        </span>
                      </div>
                    </div>
                    <div className='flex justify-center'>
                      <div className=' hover:text-white hover:bg-gradient-to-br hover:from-[#1b8f53] hover:via-[#4285f4] hover:to-[#1b8f53] cursor-pointer border w-[25vh] flex justify-center p-3 bg-white shadow-md rounded-2xl' onClick={() => navigate('/entry')}>
                        <p className=' '>
                          Sign in to get started
                        </p>
                      </div>
                    </div>
                    
                </div>
                
              )
            }
           
            <div className='absolute bottom-0 left-0 right-0 flex justify-center'>
              <p className='text-brand-300 text-sm rounded-xl bg-brand-200 px-2 -py-2 mb-2 bg-brand-100'> 
                Version 3.1 Powered by Google
                <a href="https://deepmind.google/technologies/gemini/#gemini-1.5" rel="noopener noreferrer" target="_blank" className='ml-1 bg-gradient-to-br from-[#4285f4] via-[#9b72cb] to-[#d96570] bg-clip-text [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]'> 
                  Gemini 1.5
                </a>  
              </p>
            </div>
          </div>
        </div>
      </animated.div>
  );
}

function LoadingPage() {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
    </div>
  );
}



function UploadText() {
  const navigate = useNavigate();
  const [text, setText] = useState('');

  const handleFormChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/loading');

    const peopleQuestions = [["Manual Entry", text]];
    const peopleActualQuestions = [["Manual Entry", text]];

    fetch('http://127.0.0.1:5000/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: text })
    })
      .then((response) => response.text())
      .then((analysisString) => {
        const apiResults = [["Manual Entry", analysisString]];

        navigate('/results', { state: { apiResults, peopleQuestions, peopleActualQuestions } });
      });
  };

  return (
    <div>
      <h2>Upload Text</h2>
      <div className="buttons">
        <form onSubmit={handleSubmit} method="POST">
          <label>Text Input</label>
          <input
            type="text"
            name='text'
            placeholder="Text"
            onChange={(event) => handleFormChange(event)}
          />
          <button className="back-button-style" type="button">
            <Link to="/">BACK</Link>
          </button>
          <button className="button-style" type="submit">Upload</button>
        </form>
      </div>
    </div>
  );
}

ChartJS.register(ArcElement, Tooltip, Legend);

function Results() {
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

  return (
    <div>
      <h2>Results</h2>
      <div className="results-container">{generateTables()}</div>
      <div className="right">
        <CSVLink className="button-style" filename="analysis_results.csv" data={prepareCSVData()}>
          Export to CSV
        </CSVLink>
      </div>
      <div className="center-hor">
        <Doughnut data={data} />
      </div>
      <div style={{ height: 310 }}></div>
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
    </div>
  );
}

function History() {
  return (
    <div>
      <h2>Upload History</h2>
      <div className='left'>
        <button className="button-style" type="button">
          <Link to="/uploadFile">Upload</Link>
        </button>
      </div>
      <div className="right">
        <button className="button-style" type="button">
          <Link to="/">Home</Link>
        </button>
      </div>
    </div>
  );
}

/*
async function loginUser(credentials) {
  return fetch('http://127.0.0.1:5000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}*/

function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.token;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
    localStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken.token);
  };

  return {
    setToken: saveToken,
    token
  }
}

/*
function Login({ setToken }) {
  const { token } = useToken();
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  if (token) {
    navigate('/');
    return (
      <div className="login-wrapper">
        <h1>You are already logged in!</h1>
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <button className="button-style" type="button">
            <Link to="/">OK</Link>
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password
    });
    setToken(token);
    navigate('/');
  }

  return (
    <div className="login-wrapper">
      <h1>Log In to QualPat</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={e => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}
*/
function NavBar() {
  return (
    <nav>
      <ul>
        <li id="name">QUALPAT</li>
        <div id="links">
          <li>
            <Link to="/login">Sign In</Link>
          </li>
          <li>
            <Link to="/history">History</Link>
          </li>
          <li>
            <Link to="/results">Results</Link>
          </li>
          <li>
            <Link to="/uploadFile">Upload File</Link>
          </li>
          <li>
            <Link to="/uploadText">Upload Text</Link>
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
        </div>
      </ul>
    </nav>
  );
}

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Main() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="projectMain/*" element={<RequireAuth><ProjectMain /></RequireAuth>} />
      <Route path="construction" element={<RequireAuth><Construction /></RequireAuth>} />
      <Route path="entry/*" element={<Entry />} />
      <Route path="loading" element={<RequireAuth><Loading /></RequireAuth>} />
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}

const GradientBackground = ({ children }) => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-red-500 h-screen flex items-center justify-center">
      {children}
    </div>
  );
}

