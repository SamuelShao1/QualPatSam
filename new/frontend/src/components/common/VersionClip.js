import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, Switc, useLocation } from 'react-router-dom';

import '../../App.css';
import '../../index.css';
import '../../style.css';

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
              <div className='ml-1 bg-gradient-to-br from-[#4285f4] via-[#9b72cb] to-[#d96570] bg-clip-text [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]'> 
              QualPat 1.1 Development
              </div>  
          </p>
      </div>
    );
}

export default HeaderBar;