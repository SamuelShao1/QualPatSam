import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, Switc, useLocation } from 'react-router-dom';
import Papa from 'papaparse';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import { CSVLink } from 'react-csv';
import './App.css';
import '../index.css';
import '../style.css';
import HeaderBar from '../../components/HeaderBar.js';

import {
  Code,
} from 'lucide-react';

const HeaderBar = () => {
    const navigate = useNavigate(); 
    return (
        <HeaderBar/>
    );
}

export default HeaderBar;