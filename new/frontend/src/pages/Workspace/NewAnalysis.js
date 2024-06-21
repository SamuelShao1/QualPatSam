import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, Switch, useLocation } from 'react-router-dom';
import Papa from 'papaparse';
import '../../App.js';
import '../../index.css';
import '../../style.css';
import Loading from '../UtilityPages/Loading.js';
import { ArrowRightToLine } from 'lucide-react';
import Results from './Results.js';
import TransitionWrapper from '../../wrappers/TransitionWrapper';

import {
  DraftingCompass,
  Lightbulb,
  FolderOpen,
  Rabbit,
} from 'lucide-react';

const NewAnalysis = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);

  const handleChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (file) {
      navigate('loading');
      Papa.parse(file, {
        complete: function (results) {
          const csvData = results.data;
          processCSVData(csvData);
        },
        header: true
      });
    }
  };

  const processCSVData = (csvData) => {
    let peopleQuestions = []; 
    let peopleActualQuestions = []; 

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
        navigate('../results', { state: { apiResults, peopleQuestions, peopleActualQuestions } });
      })
      .catch(error => {
        console.error('Error processing CSV data:', error);
      });
  };

  const items = [
    { label: 'Create a New Project', Icon: DraftingCompass, path: '/projectMain' },
    { label: 'Quick Analysis', Icon: Rabbit, path: '/uploadText' },
    { label: 'Open a Project', Icon: FolderOpen, path: '/open-project' },
    { label: 'Help Desk', Icon: Lightbulb, path: '/help-desk' },
  ];

    


    return (
      <div className='w-full h-full'>   

          <p className='text-brand-250 text-2xl'>
              New Analysis
          </p>
          <div className='w-full flex px-7 justify-center items-center '>  {/* Project Pages */}
            <TransitionWrapper location={location}>
              <Routes location={location}>
                <Route path="/" element={
                    <div className=' pt-10'>
                      <div className="buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <form className="text-brand-300 rounded-full flex-row" onSubmit={handleSubmit}>
                          <div className='flex p-1 h-9'> 
                            <input className="p-1 h-9 flex file:hover:bg-blue-300 file:items-center file:text-brand-300 file:hover:bg-brand-250 rounded-full file:rounded-full file:border-none file:bg-brand-250 bg-brand-100" type="file" accept=".csv" onChange={handleChange}  />
                            {/*<div class="flex items-center justify-center w-full">
                                  <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                      <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                          <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                          </svg>
                                          <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                                          <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                      </div>
                                      <input id="dropzone-file" type="file" accept=".csv" class="hidden" onChange={handleChange}/>
                                  </label>
                            </div> */}
                            <button className="rounded-full bg-blue-200 h-9 w-9  flex items-center justify-center bg-brand-100 button-style hover:bg-blue-300" type="submit">
                                <ArrowRightToLine className='w-5  ' />
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                } />
                <Route path="loading" element={<Loading />} />
                <Route path="results" element={<Results />} />
              </Routes>
            </TransitionWrapper>
          </div>
          
      </div>

    );
}


export default NewAnalysis;