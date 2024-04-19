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
        <nav className='mt-[1.25rem] cursor-pointer flex items-center justify-between px-5 py-[0.8rem] text-[1.5rem] font-light text-brand-300'>
          <div className='rounded-xl px-2 hover:bg-brand-200' onClick={() => navigate('/')}>
            <p className='text-bold'>QualPat</p>
          </div>
          <div className='grid h-10 w-10 place-items-center rounded-full bg-brand-100'>
            <UserRound className='min-w-4 ' size={16} />
          </div>
        </nav>
    );
}

export default HeaderBar;