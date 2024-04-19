import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, Switc, useLocation } from 'react-router-dom';
import '../App.js';
import '../index.css';
import '../style.css';
import { Menu } from '@headlessui/react'

import {
  Pencil,
  Copy,
  Archive,
  Replace,
  CircleEllipsis,
} from 'lucide-react';
import { Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef } from 'react'

const ExpandingMenu = ({ setTooltipVisible }) => {
    return (
      <div className="z-500">
        <Menu as="div" className="flex flex-col items-center">
          <div className="flex justify-center items-center w-full">
          <Menu.Button onMouseEnter={() => setTooltipVisible(false)}>
                <CircleEllipsis className='text-brand-300 w-4 h-4'/>
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
<Menu.Items 
                className="absolute rounded-3xl right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
                onOpenChange={(open) => setTooltipVisible(!open)}
            >              <div className="px-1 py-1 ">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? 'bg-blue-100  text-black ' : 'text-gray-900'
                      } group flex w-full items-center rounded-full px-2 py-2 text-sm `}
                    >
                      {active ? (
                        <Pencil className='w-[1rem]'/>
                      ) : (
                        <Pencil className='w-[1rem]'/>
                      )}
                      <p className='pl-2'>Rename</p>
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? 'bg-blue-100  text-black ' : 'text-gray-900'
                      } group flex w-full items-center rounded-full px-2 py-2 text-sm `}
                    >
                      {active ? (
                        <Replace className='w-[1rem]'/>
                      ) : (
                        <Replace className='w-[1rem]'/>
                      )}
                      <p className='pl-2'>Move</p>
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? 'bg-blue-100  text-black ' : 'text-gray-900'
                      } group flex w-full items-center rounded-full px-2 py-2 text-sm `}
                    >
                      {active ? (
                        <Copy className='w-[1rem]'/>
                      ) : (
                        <Copy className='w-[1rem]'/>
                      )}
                      <p className='pl-2'>Duplicate</p>
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? 'bg-blue-100  text-black ' : 'text-gray-900'
                      } group flex w-full items-center rounded-full px-2 py-2 text-sm `}
                    >
                      {active ? (
                        <Archive className='w-[1rem]'/>
                      ) : (
                        <Archive className='w-[1rem]'/>
                      )}
                      <p className='pl-2'>Archive</p>
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    )
  }


  export default ExpandingMenu;