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

const Uploads = () => {
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
              <div className=' font-medium'>
                  <p className=''>
                      <p className='text-brand-250 text-2xl'>
                          Uploads
                      </p>
                  </p>
              </div>
              
              <div className='overflow-hidden text-xl grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4 p-5'>
                {items.map(({ label, Icon, path }, idx) => (
                  <div
                    className='group relative h-52 cursor-pointer rounded-xl bg-brand-100 p-4 duration-300 hover:bg-brand-200 '
                    key={idx}
                    onClick={() => navigate(path)} // Navigate when clicked
                  >
                    <p className='text-brand-300 gradient-text'>{label}</p>
                    <div className='text-brand-300 absolute bottom-4 right-4 rounded-full bg-white p-2'>
                      <Icon size={20} />
                    </div>
                  </div>
                ))}
              </div>
              
            </div>
          </div>
      </div>

    );
}

export default Uploads;