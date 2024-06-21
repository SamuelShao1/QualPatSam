import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, Switc, useLocation } from 'react-router-dom';
import '../../App.css';
import '../../index.css';
import '../../style.css';
import HeaderBar from '../../components/HeaderBar/HeaderBar';

import {
  Code,
} from 'lucide-react';

const Settings = () => {
    const navigate = useNavigate(); 
    return (
      <div>
        <HeaderBar/>
        Settings
      </div>
        
    );
}

export default Settings;