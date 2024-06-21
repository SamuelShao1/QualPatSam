import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, Switc, useLocation } from 'react-router-dom';
import '../../App.js';
import '../../index.css';
import '../../style.css';

import {
  DraftingCompass,
  Lightbulb,
  FolderOpen,
  Rabbit,
} from 'lucide-react';

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