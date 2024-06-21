import React from 'react';
import {
  Pencil,
  Copy,
  Archive,
  Replace, 
  Trash2,
  CircleEllipsis,
  Maximize2,
} from 'lucide-react';
import ExpandingMenu from '../../../../components/menu/ExpandingMenu';

const menuOptionItems = [
  { icon: Pencil, label: 'Rename' },
  { icon: Copy, label: 'Duplicate' },
  { icon: Archive, label: 'Archive' },
  { icon: Replace, label: 'Move' },
  { icon: Trash2, label: (<p className='text-red-500'>Delete</p>) },
];

const OptionsMenu = (
  <div className=''>
    <ExpandingMenu 
      className=""
      menuItems={menuOptionItems} 
      defaultIcon={CircleEllipsis}
      toolTipMessage={<><Maximize2 className="w-[.7rem]"/><p className='pl-1'>Options </p></>}
    />
  </div>
)


export default OptionsMenu;
