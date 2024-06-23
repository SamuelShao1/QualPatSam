import React, { useState, Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import TooltipAnimate from '../../../components/menu/TooltipAnimate';

const InfoDisplay = ({ menuItems, defaultIcon: DefaultIcon, toolTipMessage, onMenuItemClick }) => {
  return (
    <div className="relative">
      <Menu as="div" className="flex flex-col items-center">
        <div className="flex justify-center items-center w-full">
          <Menu.Button>
            <TooltipAnimate tooltipContent={<div className='flex items-center relative'>{toolTipMessage}</div>}>
              <DefaultIcon className=' w-4 h-4'/>
            </TooltipAnimate>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute rounded-3xl -left-2 mt-5 w-56 origin-top-right divide-y divide-gray-100 bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            <div className="px-1 py-1 relative">
              {menuItems.map(({ icon: Icon, label, action }, index) => (
                <Menu.Item key={index}>
                  {({ active }) => (
                    <span
                      className='group flex w-full items-center rounded-full px-2 py-2 text-sm'
                    >
                      {Icon && <Icon className='w-[1rem]' />}
                      <p className='pl-2'>{label}</p>
                    </span>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default InfoDisplay;