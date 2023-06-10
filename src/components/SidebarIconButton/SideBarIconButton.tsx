import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';

export const SidebarIconButton = styled(Button)((open) => ({
  minWidth: 0,
  mr: open ? 3 : 'auto',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  height: '120px',
  top: 20,
}));
