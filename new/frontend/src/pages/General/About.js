import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, Switc, useLocation } from 'react-router-dom';
import '../../App.css';
import '../../index.css';
import '../../style.css';
import HeaderBar from '../../components/HeaderBar/HeaderBar';

import {
  Code,
} from 'lucide-react';

const About = () => {
    const navigate = useNavigate(); 
    return (
      <div className='flex-col w-full h-full animated-gradient overflow-hidden'>
        <HeaderBar/>
        <div className='flex justify-center items-center mt-[10vh]'>
        <div className='p-[5vh] pt-[8vh] grid-cols pb-[5vh] justify-center items-center bg-opacity-60 shadow-2xl bg-white backdrop-blur-lg w-[60vw] h-[70vh] rounded-3xl'>
            <h1 className="flex text-5xl text-black justify-center">
                About QualPat
            </h1>
            <p className="text-brand-300 flex text-[1.5vh] text-black justify-center mx-[7vw] p-[2vh] m-[2vh] bg-opacity-60 bg-white rounded-xl">
              QualPat is a AI powered sentiment analysis application specifically for interview style, user feedback, or other text-based inputs. This application creates analysis reports in the form of tables and graphs that show topics, sentiment and word count. The input data as well as results are also available to be downloaded on each user’s local machine.
            </p>
            <p className="text-brand-300 flex text-[1.5vh] text-black justify-center mx-[7vw] p-[1vh] m-[2vh] bg-opacity-60 bg-white rounded-xl">
              Licensed under a MIT License. (2024)
            </p>
            <p className="text-brand-300 flex text-[1.5vh] text-black justify-center mx-[7vw] p-[1vh] m-[2vh] bg-opacity-60 bg-white rounded-xl">
                Version 3.1 -
                <div className='ml-[.5rem] bg-gradient-to-br from-[#1b8f53] via-[#4285f4] to-[#1b8f53] bg-clip-text [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]'>
                  Amicalola
                </div>
            </p>
            <p className="text-brand-300 flex-col text-[1.5vh] text-black justify-center mx-[7vw] p-[2vh] m-[2vh] bg-opacity-60 bg-white rounded-xl">
              <div className='flex justify-center bg-gradient-to-br from-[#1b8f53] via-[#4285f4] to-[#1b8f53] bg-clip-text [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]'>
                  What's New in Amicalola:
              </div>
              <div className='grid-cols mx-[7vh]'>
                <p className='flex justify-center '>
                  User Authentication
                </p>
                <p className='flex justify-center'>
                  Project Workspace
                </p>
                <p className='flex justify-center'>
                  Bard Retraining
                </p>
                <p className='flex justify-center'>
                  Application Hosting
                </p>
                <p className='flex justify-center'>
                  UI Redesign
                </p>
              </div>
              
            </p>
            <p className="text-gray-400 flex text-[1.5vh] justify-center mx-[7vw] p-[1vh] m-[2vh] bg-opacity-60 bg-white rounded-xl">
              Previous Versions - Version 1 & 2 - Jekyll
            </p>
          </div>
        </div>
        
      </div>
        
    );
}

export default About;