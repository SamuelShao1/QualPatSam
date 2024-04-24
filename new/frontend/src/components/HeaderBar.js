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
import { useAuth } from '../context/AuthContext.js';

import {
  Code,
  Compass,
  DraftingCompass,
  Lightbulb,
  UserRound,
  Info,
  FolderOpen,
  Rabbit,
  Check,
} from 'lucide-react';

const HeaderBar = () => {
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    return (
        <nav className='mt-[1.25rem] cursor-pointer flex items-center justify-between px-5 py-[0.8rem] text-[1.5rem] font-light text-brand-300'>
          <div className='rounded-xl px-2 hover:bg-white hover:bg-opacity-30' onClick={() => navigate('/')}>
            <p className='text-bold text-black'>QualPat</p>
          </div>
          <div className='grid h-10 w-10 place-items-center rounded-full bg-white shadow-lg'>
            { currentUser ? 
              (<Check className='min-w-4 ' size={16} onClick={() => navigate('/entry/profile')} />) : 
              (<UserRound className='min-w-4 ' size={16} onClick={() => navigate('/entry')} />) 
            } 
          </div>
        </nav>
    );
}

export default HeaderBar;