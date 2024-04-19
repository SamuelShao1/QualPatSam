import React, { useContext, useState } from "react";
import { Menu, Plus, History, CircleHelp, Settings, Info } from 'lucide-react';
import MenuItem from "./MenuItem";

const Nav = () => {

    const [isExpanded, setIsExpanded] = useState(false);

    const toggleSidebarExpand = () => {
        setIsExpanded(prev => !prev);
    };

    return (
        <div className={`hidden h-screen max-w-60 flex-col justify-between bg-brand-100 px-4 py-6 duration-500 sm:inline-flex ${isExpanded ? 'w-60' : 'w-[4.75rem]'}`}>
            <div>
                <button
                    onClick={toggleSidebarExpand}
                    className='grid place-items-center rounded-full p-3'
                >
                    <Menu size={14} />
                </button>

                <div className={`mt-10 inline-flex h-11 cursor-pointer items-center gap-1 rounded-full bg-brand-200 p-[0.875rem] text-sm text-brand-300 duration-300 ${
                        isExpanded ? 'w-[7.25rem]' : 'w-11'
                    }`}
                >
                    <Plus className='min-w-4' size={16} />
                    <p className='line-clamp-1'>New Project</p>
                    
                </div>

                

                {isExpanded && (
                    <div className='animate-fade-in flex flex-col'>
                        <p className='my-4 ml-1'>Projects</p>
                        <p className='my-2 ml-1 text-s text-gray-400 opacity-50 italic'>Start something new</p>
                    </div>
                )}
            </div>

            

            <div className='flex flex-col'>
				{[
					{ label: 'History', icon: History },
					{ label: 'Help', icon: CircleHelp },
					{ label: 'Settings', icon: Settings },
                    { label: 'Info', icon: Info },
				].map(({ label, icon }, idx) => (
					<MenuItem
						key={idx}
						Icon={icon}
						label={label}
						isExpanded={isExpanded}
					/>
				))}
			</div>

            
        </div>
    );
};

export default Nav;
