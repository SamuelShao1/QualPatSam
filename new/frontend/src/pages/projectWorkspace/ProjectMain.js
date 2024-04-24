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
import ProjectDash from '../projectWorkspace/ProjectDash.js';
import { Menu } from '@headlessui/react'
import ExpandingMenu from '../../components/ExpandingMenu.js';
import {
  Code,
  Compass,
  DraftingCompass,
  Lightbulb,
  UserRound,
  Info,
  FolderOpen,
  Rabbit,
  Pencil,
  Copy,
  Archive,
  Replace,
  Trash,

} from 'lucide-react';
import ProjectBar from '../../components/ProjectBar.js';
import EditableTitle from '../../utility/EditableTitle.js';
import NewAnalysis from './NewAnalysis.js';
import Results from './Results.js';
import ModelsTraining from './ModelsTraining.js';
import Uploads from './Uploads.js';
import Loading from '../utilityPages/Loading.js';
import VersionClip from '../../components/VersionClip.js';
import { Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef } from 'react'
import { ChevronDownIcon } from 'lucide-react';
import { useSpring, animated } from 'react-spring';

const ProjectMain = () => {
    const navigate = useNavigate();

    const props = useSpring({
      to: { opacity: 1 },
      from: { opacity: 0 }
    });

    return (
      <animated.div style={props} className='w-full h-full overflow-hidden'>
        <div className="grid grid-rows h-screen">
          <div className='z-50 relative '>
            <div className='absolute top-0 w-full'>
              <ProjectBar className=''/> 
            </div>
          </div>

          <div className="grid grid-rows-[36fr_0fr] overflow-auto">
            {/*<div className='relative z-0  '>
              <div className='pl-7 border-b shadow-md pb-2 '>
                  <p className='text-brand-400 '>
                      <EditableTitle className="" defaultTitle={<span className=' codeFont text-2xl bg-gradient-to-br from-[#1b8f53] via-[#4285f4] to-[#1b8f53] bg-clip-text [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]'>
                      Untitled Project
                      </span>}></EditableTitle>
                  </p>
              </div>
            </div> */}

            <div className='relative flex-col px-7  z-0 w-full h-screen '>  {/* Project Pages */}
              <div className='h-[10vh]'>
              </div>
              <div className='overflow-auto'>
                <Routes className='relative z-0'>
                  <Route path="/" element={<ProjectDash className=""/>} />
                  <Route path="/newanalysis/*" element={<NewAnalysis />} />
                  <Route path="/results" element={<Results />} />
                  <Route path="/modelsandtraining" element={<ModelsTraining />} />
                  <Route path="/uploads" element={<Uploads />} />
                </Routes>
              </div>
              
            </div>

            <div className=''>
              <VersionClip className=""/>
            </div>
          </div>
        </div>
        
      </animated.div>
        

    );
}

export default ProjectMain;






