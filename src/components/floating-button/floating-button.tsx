import { FC } from 'react';
import { SpeedDial, SpeedDialIcon, SpeedDialAction } from '@mui/material';

export interface Action {
    name: string;
    icon: React.ReactNode;
    onClick: () => void;
}

interface FloatingButtonMenuProps {
  actions: Action[];
}

const FloatingButtonMenu: FC<FloatingButtonMenuProps> = ({actions}) =>{

  return (
    <SpeedDial
      ariaLabel="Floating Action Menu"
      sx={{ position: 'fixed', bottom: 16, right: 16 }}
      icon={<SpeedDialIcon />}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={action.onClick}
        />
      ))}
    </SpeedDial>
  );
}

export default FloatingButtonMenu;
