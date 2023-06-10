import * as React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  MenuItem,
  Menu,
  Avatar,
  Link,
} from '@mui/material/';

import {
  AccountCircle,
  Share,
  Notifications,
  MoreVert,
  CalendarToday,
} from '@mui/icons-material/';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import {
  getAllTeamData,
  updateTeamMemberName,
} from '../../redux/ManageTeam/ManageTeamActions';
import { useState } from 'react';

export default function NavigationBar() {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const token = localStorage.getItem('token');

  let email = '';

  if (token) {
    const encodedPayload = token.split('.')[1];
    const decodedPayload = atob(encodedPayload);
    const payload = JSON.parse(decodedPayload);
    email = payload.email;
  }
  const localUser = useSelector(
    (state: RootState) => state.manageTeam.team.members,
  );
  const currentUser = localUser.find((user) => user.email === email);
  const firstName = currentUser?.firstName;
  const lastName = currentUser?.lastName;

  const [newFirstName, setNewFirstName] = useState<string | undefined>(
    firstName,
  );
  const [newLastName, setNewLastName] = useState<string | undefined>(lastName);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(null);
    const clickedMenuItem = event.target as HTMLElement;
    if (clickedMenuItem.innerText === 'My account') {
      setDialogOpen(true);
      dispatch(getAllTeamData());
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleSaveChanges = () => {
    setDialogOpen(false);
    const firstNameValue = newFirstName || '';
    const lastNameValue = newLastName || '';
    dispatch(updateTeamMemberName(email, firstNameValue, lastNameValue));
    window.location.reload();
  };

  const handleLogOut = () => {
    setAnchorEl(null);
    localStorage.removeItem('token');
    window.location.reload();
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        id={menuId}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        <MenuItem onClick={handleLogOut}>Log out</MenuItem>
      </Menu>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>My Account</DialogTitle>
        <DialogContent>
          <TextField
            label="First Name"
            value={newFirstName || ''}
            fullWidth
            margin="normal"
            onChange={(event) => setNewFirstName(event.target.value)}
          />
          <TextField
            label="Last Name"
            value={newLastName || ''}
            fullWidth
            margin="normal"
            onChange={(event) => setNewLastName(event.target.value)}
          />
          <TextField
            label="Email"
            value={email}
            disabled
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions sx={{ padding: 3 }}>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button
            onClick={handleSaveChanges}
            variant="contained"
            color="primary"
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Link href="/">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <Avatar sx={{ bgcolor: '#D8DAFF' }}>
                <CalendarToday sx={{ color: '#262e96' }} />
              </Avatar>
            </IconButton>
          </Link>
          <Typography
            variant="h1"
            noWrap
            component="div"
            sx={{
              display: { xs: 'none', sm: 'block' },
              fontWeight: 600,
              fontSize: 24,
            }}
          >
            Sprint Planner
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Notifications />
            </IconButton>
            <IconButton size="large" aria-label="share" color="inherit">
              <Share />
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-haspopup="true"
              color="inherit"
            >
              <MoreVert />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
}
