import {
  FolderArchive, 
  Users,
  UserRoundPlus,
  Globe,
  Maximize2,
  Upload,
} from 'lucide-react';

import { Link as LinkIcon } from 'lucide-react';
import ExpandingMenu from '../../../../components/menu/ExpandingMenu';
const menuShareItems = [
  { icon: UserRoundPlus, label: 'Invite' },
  { icon: LinkIcon, label: 'Share Link' },
  { icon: Users, label: 'Sharing Access' },
  { icon: FolderArchive, label: 'Compress and Download' },
  { icon: Globe, label: 'Publish' },
];

const ShareMenu = ( 
  <div className=''>
        <ExpandingMenu 
          className=''
          menuItems={menuShareItems} 
          defaultIcon={Upload}
          toolTipMessage={<><Maximize2 className="w-[.7rem]"/><p className='pl-1'>Sharing and Export </p></>}
        />
    </div>
)

export default ShareMenu;