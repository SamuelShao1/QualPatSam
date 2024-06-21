import ExpandingMenu from '../../../../components/menu/ExpandingMenu';
import {
  Maximize2,
  Settings,
} from 'lucide-react';

const menuSettingItems = [
  { icon: null, label: 'Data Usage' },
  { icon: null, label: 'Version History' },
  { icon: null, label: 'Details' },
  { icon: null, label: 'History' },
];
const SettingsMenu = ( 
  <div className=''>
        <ExpandingMenu 
          menuItems={menuSettingItems} 
          defaultIcon={Settings}
          toolTipMessage={<><Maximize2 className="w-[.7rem]"/><p className='pl-1'>Project Settings </p></>}
        />
    </div>
)

export default SettingsMenu;