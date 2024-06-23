import React from 'react';
import ExpandingMenu from '../../components/menu/ExpandingMenu';
import {
  Pencil,
  Copy,
  Archive,
  Replace, 
  Trash2,
  EllipsisVertical,
} from 'lucide-react';

const menuOptionItems = [
  { icon: Pencil, label: 'Rename' },
  { icon: Copy, label: 'Duplicate' },
  { icon: Archive, label: 'Archive' },
  { icon: Replace, label: 'Move' },
  { icon: Trash2, label: (<p className='text-red-500'>Delete</p>), action: 'delete' },
];

const UploadOptionsMenu = ({ fileId, fileURL, onDelete }) => {
  const handleMenuClick = (action) => {
    if (action === 'delete') {
      onDelete(fileId, fileURL);
    }
  };

  return (
    <ExpandingMenu 
      className=""
      menuItems={menuOptionItems} 
      defaultIcon={EllipsisVertical}
      toolTipMessage={<div className='text-xs'>Options</div>}
      onMenuItemClick={handleMenuClick}
    />
  );
};

export default UploadOptionsMenu;
