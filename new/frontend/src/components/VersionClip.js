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

const HeaderBar = () => {
    const navigate = useNavigate();
    return (
      <div className='absolute bottom-0 left-0 right-0 flex justify-center'>
          <p className='text-brand-300 text-sm rounded-xl bg-brand-200 px-2 -py-2 mb-2 bg-brand-100'> 
              Version 3.1 Powered by Google
              <a href="https://deepmind.google/technologies/gemini/#gemini-1.5" rel="noopener noreferrer" target="_blank" className='ml-1 bg-gradient-to-br from-[#4285f4] via-[#9b72cb] to-[#d96570] bg-clip-text [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]'> 
              Gemini 1.5
              </a>  
          </p>
      </div>
    );
}

export default HeaderBar;