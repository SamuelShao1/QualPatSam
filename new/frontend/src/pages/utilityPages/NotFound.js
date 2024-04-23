import React from "react";
import BackButton from "../../utility/BackButton";

const NotFound = () => {
    return (
        <div className=' mt-[10rem] container x-auto  w-screen flex items-center justify-center no-scroll overflow-x-hidden overflow-y-hidden'>
          <div className='no-scroll h-[calc(100vh-5.25rem)] px-[5%] pb-40 '>  
            <div className='my-14 p-5 text-[10vw] md:text-[5vh] font-medium'>
              <span className=' text-brand-400 flex-col justify-center no-scroll '>
                <span className='flex bg-gradient-to-br from-[#1b8f53] via-[#4285f4] to-[#1b8f53] bg-clip-text [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]'>
                  Uh Oh. 
                </span>
                <span className='break-words'>
                    Please report this if you believe it's an error.
                </span>
              </span>
            </div>
            
            <div className='absolute bottom-0 left-0 right-0 flex justify-center'>
              <span className='text-brand-300 text-sm pb-2'> 
                Version 3.1. Powered by Google
                <a href="https://deepmind.google/technologies/gemini/#gemini-1.5" rel="noopener noreferrer" target="_blank" className='ml-1 bg-gradient-to-br from-[#4285f4] via-[#9b72cb] to-[#d96570] bg-clip-text [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]'> 
                  Gemini 1.5
                </a>  
              </span>
            </div>

            <div className="flex justify-center">
              <BackButton /> 
            </div>
          </div>
        </div>
    );
};

export default NotFound;