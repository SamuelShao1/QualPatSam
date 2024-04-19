import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, Switc, useLocation } from 'react-router-dom';
import Papa from 'papaparse';
//import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import { CSVLink } from 'react-csv';
import '../App.js';
import '../index.css';
import '../style.css';
import { FaGoogleDrive } from 'react-icons/fa';
import Construction from '../pages/utilityPages/Construction.js';
import TooltipAnimate from '../utility/TooltipAnimate.js';
import { Tooltip, Button } from "@material-tailwind/react";

import {
  Settings,
  CircleEllipsis,
  CircleChevronLeft,
  Pause,
  Package,
  Home,
  CircleCheckBig,
  RefreshCwOff,
  Upload,
  UserRound,
} from 'lucide-react';
import ExpandingMenu from './ExpandingMenu.js';
//        <CircleEllipsis size={20} className='text-brand-300 w-4 h-4'/> 

const ProjectBar = () => {
    const navigate = useNavigate(); 
    const currentPath = useLocation().pathname;
    const [tooltipVisible, setTooltipVisible] = useState(false);

    const items = [
      { label: (
        <div 
        onMouseEnter={() => setTooltipVisible(true)}
        onMouseLeave={() => setTooltipVisible(false)}
    >
        {tooltipVisible && (
            <TooltipAnimate tooltipContent="Options">
                <div/>
            </TooltipAnimate>
        )}
        <ExpandingMenu setTooltipVisible={setTooltipVisible}/>
    </div>
        ), 
        path: null },
      { label: 
        <TooltipAnimate tooltipContent="Project Dashboard">
        <Home size={20} className='text-brand-300 w-4 h-4'/>
        </TooltipAnimate>, 
        path: '' },
      { label: 'New Analysis', path: 'newanalysis' }, 
      { label: 'Results', path: 'results' }, 
      { label: 'Models & Training', path: 'modelsandtraining' }, 
      { label: 'Uploads', path: 'uploads' }, 
      { label: 
        <TooltipAnimate tooltipContent="Export as zipped">
        <Upload size={20} className='text-brand-300 w-4 h-4'/>
        </TooltipAnimate>, 
        path: '/construction' },
      { label: 
        <TooltipAnimate tooltipContent="Settings">
        <Settings size={20} className='text-brand-300 w-4 h-4'/>
        </TooltipAnimate>, 
        path: '/construction' },
    ];
    return (
      <nav className='cursor-pointer flex items-center justify-between p-5  py-[0.8rem] font-light text-brand-300'>
        <div className='rounded-xl px-2 hover:bg-brand-200' onClick={() => navigate('/')}>
          <TooltipAnimate tooltipContent="Back to Start">
            <button className='text-bold text-[1.5rem]'>QualPat</button>
          </TooltipAnimate>
        </div>

        <div className='plop-animation'>

          <div className=' w-full m-4 flex  justify-center items-center'>

            <div className='mr-5 w-[100px] h-[35px] rounded-full cursor-pointer flex justify-center items-center px-2 font-light bg-brand-100'>
              <div className='mx-[10px] rounded-full px-[8px] py-[0px] hover:bg-brand-200 justify-center'>
                  <p className='flex items-center group'>
                    <RefreshCwOff color="red" className='text-brand-300 w-4 h-4'/>
                    <TooltipAnimate tooltipContent="Google Drive not connected. Not synched.">
                      <button className='ml-1 text-xs relative flex items-center'>Off</button>
                    </TooltipAnimate>
                  </p>
              </div>
            </div>
            
            <nav className='max-w-[700px] w-full rounded-full cursor-pointer flex justify-between items-center px-2 py-2 font-light bg-brand-100'>
              {items.map((item, index) => ( 
                <div key={index} className={`mx-[10px] rounded-full px-[8px] py-[4px] text-brand-300 ${currentPath === `${"/projectMain/" + item.path}`  ? 'bg-brand-250' : 'hover:bg-brand-200'}`} onClick={() => navigate(item.path)}>
                  <p className='gradient-underline text-l justify-center'>{item.label}</p>
                </div> 
              ))}
            </nav>
            
            <div className='ml-5 w-[100px] h-[35px] rounded-full cursor-pointer flex justify-center items-center px-2 font-light bg-brand-100'>
              <div className='mx-[10px] rounded-full px-[8px] py-[0px] hover:bg-brand-200 justify-center'>
                  <p className='flex items-center group'>
                    <TooltipAnimate tooltipContent="No running processes.">
                      <Pause className='text-brand-300 w-4 h-4'/>
                    </TooltipAnimate>
                  </p>
              </div>
            </div>
          </div>
        
        </div>

        <div className='grid h-10 w-10 place-items-center rounded-full bg-brand-100'>
          <UserRound className='min-w-4 ' size={16} />
        </div>
      </nav>
  );

}

export default ProjectBar;