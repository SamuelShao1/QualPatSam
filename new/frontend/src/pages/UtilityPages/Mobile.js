import React from "react";

const Mobile = () => {
    return (
        <div className='container x-auto  w-full flex items-center justify-center no-scroll overflow-x-hidden overflow-y-hidden'>
          <div className='no-scroll h-[calc(100vh-5.25rem)] px-[5%] pb-40'>  
            <div className='my-14 p-5 text-[10vw] md:text-6xl font-medium whitespace-nowrap'>
              <p className='text-brand-400'>
                <span className='bg-gradient-to-br from-[#1b8f53] via-[#4285f4] to-[#1b8f53] bg-clip-text [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]'>
                  Uh Oh. 
                </span>
                <p className='block items-center'>
                    <p className='mr-3 bg-gradient-to-br from-[#1b8f53] via-[#4285f4] to-[#1b8f53] bg-clip-text [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]'>
                        QualPat's 
                    </p>
                    Better on Desktop.
                </p>
              </p>
            </div>
            
            <div className='absolute bottom-0 left-0 right-0 flex justify-center'>
              <p className='text-brand-300 text-sm pb-2'> 
                Version 3.1. Powered by Google
                <a href="https://deepmind.google/technologies/gemini/#gemini-1.5" rel="noopener noreferrer" target="_blank" className='ml-1 bg-gradient-to-br from-[#4285f4] via-[#9b72cb] to-[#d96570] bg-clip-text [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]'> 
                  Gemini 1.5
                </a>  
              </p>
            </div>
          </div>
        </div>
    );
};

export default Mobile;