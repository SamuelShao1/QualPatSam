import React from 'react';
import { Tooltip, Button } from "@material-tailwind/react";

function TooltipAnimate({ placement, children, tooltipContent, animationProps = { mount: { scale: 1, y: 0 }, unmount: { scale: 0, y: 0 } } }) {
  return (
    <Tooltip 
      animate={animationProps}
      content={
        <div className='p-2 bg-white rounded-lg shadow-lg relative'>
          <p className='text-s text-brand-300'>{tooltipContent}</p>
        </div>
      }
      placement="bottom"
    >
      {children}
    </Tooltip>
  );
}

export default TooltipAnimate;