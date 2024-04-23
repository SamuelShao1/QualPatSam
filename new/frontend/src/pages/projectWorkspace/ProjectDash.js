import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, Switc, useLocation } from 'react-router-dom';
import '../../App.js';
import '../../index.css';
import '../../style.css';
import TooltipAnimate from '../../utility/TooltipAnimate.js';
import EditableTitle from '../../utility/EditableTitle.js';
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

const ProjectDash = () => {
    const navigate = useNavigate(); 


    const items = [
      { label: 'Create a New Project', Icon: DraftingCompass, path: '/projectMain' },
      { label: 'Quick Analysis', Icon: Rabbit, path: '/uploadText' },
      { label: 'Open a Project', Icon: FolderOpen, path: '/open-project' },
      { label: 'Help Desk', Icon: Lightbulb, path: '/help-desk' },
    ];

    return (
        <div className='relative w-full h-full'>   
            <div className=' font-medium'>
                <p className='text-brand-250 text-2xl'>
                        Dashboard
                </p>
            </div>


            <div className='relative overflow-hidden text-xl grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4 p-5'>
            
            </div>
            
        </div>
    );
}

export default ProjectDash;