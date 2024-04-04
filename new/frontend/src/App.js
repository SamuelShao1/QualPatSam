
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, Switch, useLocation } from 'react-router-dom';
import './style.css';
import Papa from 'papaparse';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import { CSVLink } from "react-csv";
//import LineChart from './LineChart';

function Home() {
  return (
  <div>
    <div style={{height: 100}}></div>
    <div style={{textAlign: 'center', color: 'black', fontSize: 24, fontFamily: 'Inter, sans-serif', fontWeight: '700', wordWrap: 'break-word'}}>WELCOME TO QUALPAT </div>
    <div style={{textAlign: 'center', color: 'black', fontSize: 64, fontFamily: 'Inter, sans-serif', fontWeight: '700', wordWrap: 'break-word'}}>A SENTIMENT ANALYSIS TOOL</div>
    <div style={{height: 100}}></div>
     
    <div class = "main">
    <div style={{width: 400, background: '#E7E5DD'}} >
    <div style={{height: 15}}></div>

      <div style={{width: 400, height: 78, textAlign: 'center', color: 'black', fontSize: 24, fontFamily: 'Inter, sans-serif', fontWeight: '700', wordWrap: 'break-word'}}>START WITH TEXT </div>
      <div style={{width: 400, height: 153, textAlign: 'center', color: 'black', fontSize: 24, fontFamily: 'Inter, sans-serif', fontWeight: '400', wordWrap: 'break-word'}}>Text based analysis allows users to paste text into a text box for analysis</div>
      
      <button class = "home-button-style" type="button">
        <Link to="/uploadText">&rarr;</Link>
      </button>
    </div>
     
    <div style={{width: 400, background: '#E7E5DD'}} >
    <div style={{height: 15}}></div>

      <div style={{width: 400, height: 78, textAlign: 'center', color: 'black', fontSize: 24, fontFamily: 'Inter, sans-serif', fontWeight: '700', wordWrap: 'break-word'}}>START WITH A FILE  </div>
      <div style={{width: 400, height: 153, textAlign: 'center', color: 'black', fontSize: 24, fontFamily: 'Inter, sans-serif', fontWeight: '400', wordWrap: 'break-word'}}>File based analysis allows users to upload a csv file for analysis</div>
      <button class = "home-button-style" type="button">
        <Link to="/uploadFile">&rarr;</Link>
      </button>
    </div>
    </div>
</div>
  );
}

function LoadingPage() {

  return (
    <div className="spinner-container">
      <div className="spinner"></div>
    </div>
  );
}

function UploadFile() {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission
    if (file) {
      navigate('/loading')
      Papa.parse(file, {
        complete: function(results) {
          const csvData = results.data;
          processCSVData(csvData);
        },
        header: true
      });
    }
  }
  
  const processCSVData = (csvData) => {
    let peopleQuestions = []; // Holds the name (Speaker 1) and answers for each person
    let peopleActualQuestions = []; // Holds the actual questions for each person (Speaker 1)

    // Iterate over the CSV data by two rows at a timeX
    for (let i = 0; i < csvData.length; i += 2) {
      const name = csvData[i]["Name"];
      const questions = Object.values(csvData[i + 1])
                              .slice(1)
                              .filter(question => question.trim() !== "");

      peopleQuestions.push([name, ...questions]);
    }

    for (let i = 0; i < csvData.length; i += 2) {
      const name = csvData[i]["Name"];
      const questions = Object.values(csvData[i])
                              .slice(1)
                              .filter(question => question.trim() !== "");

      peopleActualQuestions.push([name, ...questions]);
    }

    //console.log(peopleQuestions);
    //console.log(peopleActualQuestions);
    
    Promise.all(peopleQuestions.map(person => {
      const name = person[0];
      const questions = person.slice(1);
      
      return Promise.all(questions.map(question => {
        return fetch('http://127.0.0.1:5000/data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: question })
        })
        .then(response => response.text());
      }))
      .then(results => [name, ...results]);
    }))
    .then(apiResults => {
      console.log(apiResults);
      navigate('/results', { state: { apiResults, peopleQuestions, peopleActualQuestions } });
    })
    .catch(error => {
      console.error('Error processing CSV data:', error);
    });
  }; 

  return (
    <div>
      <h2>Upload File</h2>
      <div className="buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <form onSubmit={handleSubmit}>
          <input type="file" accept=".csv" onChange={handleChange} style={{ marginBottom: '10px' }} />
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <button className="back-button-style" type="button">
            <Link to="/">BACK</Link>
          </button>
            <button className="button-style" type="submit">
                Upload
            </button>
          </div>
        </form>
      </div>   
    </div>
  );
}
function UploadText() {
  const [text, setText] = useState('');
  const navigate = useNavigate();

  function handleFormChange(event){
    setText(event.target.value)
  }
  function handleSubmit(event) {
    event.preventDefault();
    navigate('/loading');
  
    // Construct the initial peopleQuestions array
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
      //console.log(analysisString);
      
      const apiResults = [["Manual Entry", analysisString]];

      navigate('/results', { state: { apiResults, peopleQuestions, peopleActualQuestions } });
    });
  }

  return (
    <div>
      <h2>Upload Text</h2>
      <div class = "buttons">
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
            <button className="button-style"type="submit">Upload</button>
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
  //console.log(peopleQuestions);
  //console.log(peopleActualQuestions);

  let sentimentTally = [0, 0, 0]; // 0 for Positive, 1 for Neutral, 2 for Negative

  // Function to extract data from the string
  function extractData(analysisString) {
    // Remove surrounding quotes if they exist
    analysisString = analysisString.replace(/^"|"$/g, '');
  
    // Extract scores and word count
    const scoresMatch = analysisString.match(/\[\[(.*?)\]/);
    const scores = scoresMatch ? scoresMatch[1].split(',').map(Number) : [];
    sentiment.push(scores);
    const wordCountMatch = analysisString.match(/\], (\d+),/);
    const wordCount = wordCountMatch ? parseInt(wordCountMatch[1], 10) : null;
    totalcount.push(wordCount);
    // Extract topics with scores
    const topicsMatch = analysisString.match(/\], \d+, \[(.*?)\]\]$/);
    let topicsWithScores = topicsMatch ? topicsMatch[1] : '';
    
    // Directly extract the topic and score string without splitting into individual topics
    const topicsStringMatch = analysisString.match(/\], \d+, \[(.*?)\]\]$/);
    let topicsString = topicsStringMatch ? topicsStringMatch[1] : '';
    // Split the matched string by '), (' to get individual topics with scores
    topicsString = topicsString.replace(/[{()}]/g, '');
    topicsString = topicsString.replace(/[\[\]']+/g, '');
    topicsString = topicsString.replace(/_/g,' ');
    topicsWithScores = topicsWithScores.split("', '").map(topicScoreStr => {
      const [topic, score] = topicScoreStr
        .replace(/^\('/, '') // Remove "('"
        .replace(/\)'$/, '') // Remove "')"
        .split("', ")
        .map(s => s.trim().replace(/^'|'$/g, ''));
      return { topic, score: parseFloat(score) };
    });
    topics.push(topicsWithScores);
    // Find the topic with the highest score
    const highestTopic = topicsWithScores.reduce(
      (max, current) => (max.score > current.score ? max : current),
      { topic: '', score: -Infinity }
    ).topic;
  
    return { scores, wordCount, topicsString, highestTopic };
  }
  
  // Function to determine the sentiment based on the scores
  const determineSentiment = (scores) => {
    const [positiveScore, neutralScore, negativeScore] = scores;
    return 'Positive: ' + positiveScore + ', Neutral: ' + neutralScore + ', Negative: ' + negativeScore;
  };

  function processSentiment(questionData) {
    const sentiment = determineSentiment(questionData.scores);
    const positiveScore = parseFloat(sentiment.match(/Positive: (\d+(\.\d+)?)/)[1]);
    const neutralScore = parseFloat(sentiment.match(/Neutral: (\d+(\.\d+)?)/)[1]);
    const negativeScore = parseFloat(sentiment.match(/Negative: (\d+(\.\d+)?)/)[1]);

    if (positiveScore > negativeScore && positiveScore > neutralScore) sentimentTally[0]++;
    else if (neutralScore > positiveScore && neutralScore > negativeScore) sentimentTally[1]++;
    else if (negativeScore > positiveScore && negativeScore > neutralScore) sentimentTally[2]++;
    // if (sentiment === 'Positive') sentimentTally[0]++;
    // if (sentiment === 'Neutral') sentimentTally[1]++;
    // if (sentiment === 'Negative') sentimentTally[2]++;
  }

  // Function to create a table for each person
  const createTableForPerson = (personName, questions, personApiResults) => {
    let topicsFrequency = {}; // Holds frequency of each topic
    let sentimentFrequency = {}; // Holds frequency of each sentiment
    let totalWordCount = 0; // Holds total word count

    let sentimentTally = [0, 0, 0]; // 0 for Positive, 1 for Neutral, 2 for Negative

    const questionRows = questions.map((question, index) => {
      const analysisString = personApiResults[index + 1]; // index + 1 b/c the first element is the person's name
      const data = extractData(analysisString);

      if (!data) {
        return (
          <tr key={index}>
            <td>{question}</td>
            <td colSpan="3">Error: Analysis data is not available.</td>
          </tr>
        );
      }
      
      processSentiment(data); // Update sentiment tally for each question
      const sentiment = determineSentiment(data.scores);

      // Increment the frequency count for the highest topic
      topicsFrequency[data.highestTopic] = (topicsFrequency[data.highestTopic] || 0) + 1;
      // Increment the frequency count for sentiment
      sentimentFrequency[sentiment] = (sentimentFrequency[sentiment] || 0) + 1;
      // Add to the total word count
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
    
    // Function to sort topics by frequency and return the top 3
    const getTopTopics = () => {
      return Object.entries(topicsFrequency)
        .sort((a, b) => b[1] - a[1]) // Sort by frequency
        .slice(0, 3) // Get top 3
        .map(entry => entry[0]) // Return only the topics
        .join(', ');
    };

    // Function to get the most frequent sentiment
    const getMostFrequentSentiment = () => {
      return Object.entries(sentimentFrequency)
        .sort((a, b) => b[1] - a[1]) // Sort by frequency
        .map(entry => entry[0])[0]; // Return the top sentiment
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
            {/* <td colSpan="3">Summary Content Placeholder</td> */}
            <td>{getTopTopics()}</td>
            <td>{getMostFrequentSentiment()}</td>
            <td>{totalWordCount}</td>
          </tr>
        </tfoot>
      </table>
    );
  };

  // Function to generate all tables
  const generateTables = () => {
    return apiResults.map((personResults, index) => {
      const [personName, ...questions] = peopleActualQuestions[index];
      return createTableForPerson(personName, questions, personResults);
    });
  };

  // After generateTables is called and all processing is done, log the sentiment tally
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
    // Assuming all arrays have the same length and represent rows
  let questions = peopleActualQuestions.toString().split(',')
  const numRows = peopleActualQuestions.toString().split(',').length;
  // Create an array to store CSV rows
  const csvData = [];
  // Iterate through each index
  for (let i = 0; i < numRows - 1; i++) {
    // Assuming sentiment, topics, and totalCount are arrays
    const row = [
      questions[i + 1],
      sentiment[i],  // Replace with the actual name of your array
      topics[i],     // Replace with the actual name of your array
      totalcount[i], // Replace with the actual name of your array
    ];
    // Join the elements of the row array with commas and push to csvData
    csvData.push(row.join(','));
    console.log(csvData);
  }

  // Return the array of CSV rows
  return csvData.toString();
  };
  
  return (
    <div>
      <h2>Results</h2>
      <div className="results-container">{generateTables()}</div>
      <div class = "right">
      <CSVLink className="button-style" filename="analysis_results.csv" data={prepareCSVData()}>
        Export to CSV
      </CSVLink>
      </div>
      <div class = "center-hor"  >
      <Doughnut data={data} />
        </div>
        <div style={{height: 310}}></div>
        <div class = 'left'>
        <button class = "button-style" type="button">
        <Link to="/uploadFile">Back</Link>
      </button>
      </div>
      <div class ="right">
      <button class = "button-style" type="button">
        <Link to="/history">History</Link>
      </button >
      </div>
    </div>
  );
}

function History() {
  return (
    <div>
      <h2>Upload History</h2>
      <div class = 'left'>
      <button class = "button-style" type="button">
        <Link to="/uploadFile">Upload</Link>
      </button>
      </div>
      <div class ="right">
      <button class = "button-style" type="button">
        <Link to="/">Home</Link>
      </button>
      </div>
    </div>
  );
}

async function loginUser(credentials) {
  return fetch('http://127.0.0.1:5000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }

function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.token
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

function Login( { setToken }) {
  const { token } = useToken();
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  if (token) {
    navigate('/');
    return(
      <div classname="login-wrapper">
        <h1>You are already logged in!</h1>
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <button class = "button-style" type="button">
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

  return(
    <div className="login-wrapper">
      <h1>Log In to QualPat</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={e => setUserName(e.target.value)}/>
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)}/>
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

function App() {
  
  const { setToken } = useToken();
/*
  if(!token) {
    return <Login setToken={setToken} />
  }
  */
  

  return (
    <div>
      <Router>
        <h1> </h1>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/uploadFile" element={<UploadFile/>} />
          <Route path="/uploadText" element={<UploadText/>} />
          <Route path="/results" element={<Results />} />
          <Route path="/history" element={<History />} />
          <Route path="/login" element={<Login setToken = {setToken}/>} />
          <Route path="/loading" element={<LoadingPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;