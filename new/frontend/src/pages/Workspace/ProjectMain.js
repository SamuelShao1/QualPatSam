import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, Switc, useLocation } from 'react-router-dom';
import ProjectDash from './ProjectDash.js';
import ProjectBar from './ProjectBar/ProjectBar';
import NewAnalysis from './NewAnalysis';
import Results from './Results.js';
import ModelsTraining from './ModelsTraining.js';
import Uploads from './Uploads.js';
import VersionClip from '../../components/common/VersionClip.js';
import EditableTitle from '../../components/textEffects/EditableTitle';
import { useSpring, animated } from 'react-spring';

const ProjectMain = () => {
    const navigate = useNavigate();

    const props = useSpring({
      to: { opacity: 1 },
      from: { opacity: 0 }
    });

    return (
      <animated.div style={props} className='relative w-full  h-full overflow-hidden flex-col h-screen w-full overflow-hidden'>
       <div className="">
          
          <div className="absolute w-full h-full fixed top-0 grid grid-rows-[36fr_0fr] overflow-auto">

            <div className='relative flex-col z-0 w-full '>  {/* Project Pages */}
              <div className='h-[15vh]'>
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
          <div className='absolute top-0 w-full'>
            <ProjectBar className=''/>
          </div>

        </div>
        
      </animated.div>
        

    );
}

export default ProjectMain;






