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
import { getAuth } from "firebase/auth";

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
  Pencil,
  Copy,
  Archive,
  Replace,
  FolderArchive,
  Maximize2,
  Users,
  UserRoundPlus,
  Globe,
  Check,
  User,
  Trash2
} from 'lucide-react';

import {Link as LinkIcon } from 'lucide-react';
import ExpandingMenu from './ExpandingMenu.js';
import { useAuth } from '../context/AuthContext.js';
const menuOptionItems = [
  { icon: Pencil, label: 'Rename' },
  { icon: Copy, label: 'Duplicate' },
  { icon: Archive, label: 'Archive' },
  { icon: Replace, label: 'Move' },
  { icon: Trash2, label: (<p className='text-red-500'>Delete</p>) },

];

const menuShareItems = [
  { icon: UserRoundPlus, label: 'Invite' },
  { icon: LinkIcon, label: 'Share Link' },
  { icon: Users, label: 'Sharing Access'},
  { icon: FolderArchive, label: 'Compress and Download'},
  { icon: Globe, label: 'Publish' },
]

const menuSettingItems = [
  { icon: null, label: 'Data Usage' },
  { icon: null, label: 'Version History' },
  { icon: null, label: 'Details' },
  { icon: null, label: 'History' },
]

//        <CircleEllipsis size={20} className='text-brand-300 w-4 h-4'/> 

const ProjectBar = () => {
    const navigate = useNavigate(); 
    const currentPath = useLocation().pathname;
    const { currentUser } = useAuth();
    const auth = getAuth();
  
    const items = [
      { label: (
          <div className=''>
              <ExpandingMenu 
                className="bg-red-900"
                menuItems={menuOptionItems} 
                defaultIcon={CircleEllipsis}
                toolTipMessage={<><Maximize2 className="w-[.7rem]"/><p className='pl-1'>Options </p></>}
              />
          </div>
        ), 
        path: null },
      { label: 
        <TooltipAnimate className="" tooltipContent="Project Dashboard">
        <Home size={20} className='text-brand-300 w-4 h-4'/>
        </TooltipAnimate>, 
        path: '' },
      { label: 'New Analysis', path: 'newanalysis' }, 
      { label: 'Results', path: 'results' }, 
      { label: 'Models & Training', path: 'modelsandtraining' }, 
      { label: 'Uploads', path: 'uploads' }, 
      { label: (
        <div className=''>
            <ExpandingMenu 
              className=''
              menuItems={menuShareItems} 
              defaultIcon={Upload}
              toolTipMessage={<><Maximize2 className="w-[.7rem]"/><p className='pl-1'>Sharing and Export </p></>}
            />
        </div>
      ),  
        path: null },
      { label: (
        <div className=''>
            <ExpandingMenu 
              menuItems={menuSettingItems} 
              defaultIcon={Settings}
              toolTipMessage={<><Maximize2 className="w-[.7rem]"/><p className='pl-1'>Project Settings </p></>}
            />
        </div>
      ),  
        path: null },
    ];
    return (
      <nav className='relative cursor-pointer flex items-center justify-between p-5  py-[0.8rem] font-light text-brand-300'>
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
            
            <nav className='relative  max-w-[700px] w-full rounded-full cursor-pointer flex justify-between items-center px-2 py-2 font-light bg-brand-100 '>
              {items.map((item, index) => ( 
                <div key={index} className={`mx-[10px] rounded-full px-[8px] py-[4px] text-brand-300 ${currentPath === `${"/projectMain/" + item.path}`  ? 'bg-brand-250' : 'hover:bg-brand-200'}`} onClick={() => navigate(item.path)}>
                  <span className='relative z-50'>
                    <span className='gradient-underline text-l justify-center'>{item.label}</span>
                  </span>
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
        <Tooltip 
          animate={{ mount: { scale: 1, y: 0 }, unmount: { scale: 0, y: 0 } }}
          content={
            <div className='bg-brand-100 h-[2rem] w-[8rem] rounded-full shadow-lg'>
              <span className='text-md flex justify-center text-brand-300'>
                {currentUser ? 
                  (
                    <p className='text-brand-300 text-xs p-2 overflow-hidden whitespace-nowrap overflow-ellipsis'>
                      Logged in as {auth.currentUser.displayName}
                    </p>
                  ) : (
                    <p className='text-brand-300 overflow-hidden whitespace-nowrap overflow-ellipsis'>
                      Not logged in.
                    </p>
                  )
                } 
              </span>
            </div>
          }
          placement="left"
        >
          {currentUser ? 
            (<Check className='min-w-4' size={16} onClick={() => navigate('/entry/profile')} />) : 
            (<UserRound className='min-w-4' size={16} onClick={() => navigate('/entry')} />) 
          } 
        </Tooltip>
      </div>
      </nav>
  );

}

export default ProjectBar;