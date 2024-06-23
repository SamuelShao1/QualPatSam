import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, Switc, useLocation } from 'react-router-dom';
import '../../../App.js';
import '../../../index.css';
import '../../../style.css';
import TooltipAnimate from '../../../components/menu/TooltipAnimate.js';
import { Tooltip, Button } from "@material-tailwind/react";
import { getAuth } from "firebase/auth";

import {
  CircleChevronLeft,
  Pause,
  CircleCheckBig,
  RefreshCwOff,
  UserRound,
  Check,
  Home,
  ArrowLeftFromLine,
  FilePieChart,
  BrainCircuit,
  CirclePlus,
} from 'lucide-react';

import { useAuth } from '../../../context/AuthContext';
import EditableTitle from '../../../components/textEffects/EditableTitle.js'
import OptionsMenu from './menus/OptionsMenu.js';
import ShareMenu from './menus/ShareMenu.js';
import SettingsMenu from './menus/SettingsMenu.js';
const ProjectBar = () => {

    const navigate = useNavigate(); 

    const currentPath = useLocation().pathname;

    const { currentUser } = useAuth();
    const auth = getAuth();


    //dynamic menu
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const updateWindowWidth = () => {
      setWindowWidth(window.innerWidth);
    };
    useEffect( () => {
      window.addEventListener('resize', updateWindowWidth);
      return () => window.removeEventListener('resize', updateWindowWidth);
    }, []);
    const items = [
      { path: null, label: OptionsMenu, icon: OptionsMenu },
      { path: '', label: 'Dashboard', icon:<TooltipAnimate tooltipContent="Project Dashboard"><Home className='w-4 h-4'/></TooltipAnimate> },
      { path: 'newanalysis', label: 'New Analysis', icon: <TooltipAnimate tooltipContent="New Analysis"><CirclePlus className='w-4 h-4' /></TooltipAnimate> },
      { path: 'modelsandtraining', label: 'Model', icon: <TooltipAnimate tooltipContent="Model"><BrainCircuit className='w-4 h-4' /></TooltipAnimate> },
      { path: 'uploads', label: 'Uploads', icon: <TooltipAnimate tooltipContent="Uploads"><FilePieChart className='w-4 h-4' /></TooltipAnimate> },
      { path: null, label: ShareMenu, icon: ShareMenu },
      { path: null, label: SettingsMenu, icon: SettingsMenu },
    ];
  
    
    const getVisibleItems = () => {
      const breakpoints = [1600, 1600, 1400, 1300, 1100, 1000, 0]
      const itemsToShow = items.length - breakpoints.findIndex(bp => windowWidth > bp);
      return itemsToShow > 0 ? itemsToShow : 1;
    }
    const visibleItemsCount = getVisibleItems();


    return (
      <nav className='grid grid-cols-[2fr_2fr_18fr_3fr] plop-animation relative cursor-pointer flex items-center  p-5  py-[0.2rem] font-light text-brand-300 border shadow-lg m-5 rounded-2xl bg-white bg-opacity-10 backdrop-blur-lg'>        
        <div className='rounded-xl px-2 hover:bg-brand-200 flex items-center' onClick={() => navigate('/')}>
          <TooltipAnimate tooltipContent="Back to Start">
            {visibleItemsCount > 2 ? 
              ( <button className='text-bold text-[1.5rem]'>QualPat</button>) 
              : ( <button className='text-bold text-[1.5rem]'><ArrowLeftFromLine/></button>)
            }
          </TooltipAnimate>
        </div>
        <div className='p-7'>
            <p className='overflow-hidden whitespace-nowrap w-[9vw] '>
                <EditableTitle defaultTitle='Untitled Project'></EditableTitle>
            </p>
        </div>

        <div className='w-full my-4'>
          <div className='flex justify-center items-center'>
            <div className=' mr-5 w-[6vw] h-[35px] shadow-md rounded-full cursor-pointer flex justify-center items-center px-2 font-light bg-brand-100'>
              <div className=' mx-[10px] rounded-full px-[8px] py-[0px] hover:bg-brand-200 justify-center'>
                  <p className='flex items-center group'>
                    <RefreshCwOff color="red" className='text-brand-300 w-4 h-4'/>
                    <div className='z-50'>
                      <TooltipAnimate tooltipContent="Google Drive not connected. Not synched.">
                        <button className='ml-1 text-xs relative flex items-center'>Off</button>
                      </TooltipAnimate>
                    </div>
                  </p>
              </div>
            </div>
            
            <nav className='relative shadow-md max-w-[70vw] rounded-full cursor-pointer flex justify-between items-center px-2 py-2 font-light bg-brand-100 '>
              {items.map((item, index) => ( 
                <div 
                  key={index} 
                  className={`mx-[10px] rounded-full px-[8px] py-[4px] text-brand-300 ${currentPath === `${"/projectMain/" + item.path}`  ? 'bg-brand-250' : 'hover:bg-brand-200'}`} 
                  onClick={() => navigate(item.path)}>
                  <span className='relative z-50'>
                    {index < visibleItemsCount ? (
                      <span className='gradient-underline text-l justify-center overflow-hidden whitespace-nowrap overflow-ellipsis'>{item.label}</span>
                    ) : (
                      <span className='flex items-center justify-center'>
                        {item.icon}
                      </span>
                    )}
                  </span>
                </div> 
              ))}
            </nav>
            
            <div className='shadow-md ml-5 w-[6vw] h-[35px] rounded-full cursor-pointer flex justify-center items-center px-2 font-light bg-brand-100'>
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

        <div className='flex justify-end'>
          <div className='ml-5 grid h-10 w-10 place-items-center rounded-full bg-brand-100 shadow-md'>
            <Tooltip 
              animate={{ mount: { scale: 1, y: 0 }, unmount: { scale: 0, y: 0 } }}
              content={
                <div className='bg-brand-100 h-[2rem] w-[10vw] rounded-full shadow-lg'>
                  
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
              {currentUser ? (
              currentUser.photoURL ? (
                <img
                  src={currentUser.photoURL}
                  alt="Profile"
                  className="rounded-full"
                  size={16}
                  onClick={() => navigate('/entry/profile')}
                />
              ) : (
                <Check
                  className="rounded-full"
                  size={16}
                  onClick={() => navigate('/entry/profile')}
                />
              )
            ) : (
              <UserRound
                className="min-w-4"
                size={16}
                onClick={() => navigate('/entry')}
              />
            )}
            </Tooltip>
          </div>
        </div>
        
      </nav>
  );

}

export default ProjectBar;