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
import ProjectBar from '../../components/ProjectBar.js';
import EditableTitle from '../../utility/EditableTitle.js';

const ModelsTraining = () => {
    const navigate = useNavigate(); 


    const items = [
      { label: 'Create a New Project', Icon: DraftingCompass, path: '/projectMain' },
      { label: 'Quick Analysis', Icon: Rabbit, path: '/uploadText' },
      { label: 'Open a Project', Icon: FolderOpen, path: '/open-project' },
      { label: 'Help Desk', Icon: Lightbulb, path: '/help-desk' },
    ];

    


    return (
      <div className=' w-full h-full'>   

          <div className='h-screen flex'>
            <div className=' w-full h-full'>   
            <p className='text-brand-250 text-2xl'>
                New Analysis
            </p>
              
              
              
            </div>
          </div>
      </div>

    );
}

export default ModelsTraining;