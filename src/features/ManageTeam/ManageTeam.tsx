import React, { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  Grid,
  TableContainer,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  TextField,
  Autocomplete,
} from '@mui/material';
import Add from '@mui/icons-material/Add';
import TopTable from './TopTable';
import BottomTable from './BottomTable';
import { Member } from '../../types/NewSprintTypes';
import { get } from '../../api';
import {
  addTeamMember,
  getMembersRequest,
} from '../../redux/ManageTeam/ManageTeamActions';
import { useDispatch } from 'react-redux';

export default function ManageTeam() {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = useState<Member[]>([]);
  const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null);

  useEffect(() => {
    handleSearchMembers();
  }, []);

  const handleSearchMembers = async () => {
    try {
      const response = await get<Member[]>('/member');
      console.log(response);
      setOptions(response);
    } catch (error) {
      console.log('Error fetching members:', error);
    }
  };

  const handleAddMember = () => {
    const selectedMember = options.find(
      (member) => member.id === selectedMemberId,
    );
    if (selectedMember) {
      const id = selectedMember.id;
      const email = selectedMember.email;
      const role = selectedMember.role;
      const firstName = selectedMember.firstName;
      const lastName = selectedMember.lastName;

      dispatch(addTeamMember(id, email, role, firstName, lastName));
      console.log('Adding member:', selectedMember);
    }
    handleClose();
  };

  const handleClickOpen = () => {
    dispatch(getMembersRequest());
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ maxWidth: '85%', margin: 'auto' }}>
      <Typography
        variant="h1"
        color="textPrimary"
        fontWeight="600"
        gutterBottom
        fontSize={32}
        mt={15}
      >
        Manage team
      </Typography>
      <Grid container>
        <Grid item xs={12}>
          <TopTable />
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper} sx={{ marginBottom: '100px' }}>
            <Box>
              <Grid
                container
                alignItems="center"
                justifyContent="space-between"
                padding="20px 60px"
                borderBottom="1px solid #E1E1E1"
              >
                <Grid item>
                  <Typography variant="h4" fontWeight="600">
                    Team members
                  </Typography>
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={handleClickOpen}
                    sx={{
                      letterSpacing: 2,
                      padding: '5px 10px',
                      fontWeight: 600,
                      borderColor: '#dadada',
                      '&:hover': {
                        backgroundColor: 'blue',
                        color: 'white',
                      },
                    }}
                  >
                    <Add sx={{ mr: 1 }} />
                    ADD NEW MEMBER
                  </Button>
                  <Dialog open={open} onClose={handleClose}>
                    <DialogTitle sx={{ textAlign: 'center', fontSize: '1em' }}>
                      Choose new member
                    </DialogTitle>
                    <DialogContent
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 2,
                      }}
                    >
                      <FormControl
                        variant="filled"
                        sx={{ m: 1, flex: 1, minWidth: 400 }}
                      >
                        <Autocomplete
                          id="controllable-states-demo"
                          options={options}
                          getOptionLabel={(member) => {
                            const fullName =
                              `${member.firstName} ${member.lastName}`.trim();
                            return fullName.length > 0
                              ? fullName
                              : member.email;
                          }}
                          onChange={(event, newValue) =>
                            setSelectedMemberId(newValue ? newValue.id : null)
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Search input"
                              InputProps={{
                                ...params.InputProps,
                                type: 'search',
                              }}
                            />
                          )}
                        />
                      </FormControl>
                    </DialogContent>
                    <DialogActions sx={{ justifyContent: 'flex-end' }}>
                      <Button onClick={handleAddMember}>ADD</Button>
                      <Button variant="text" onClick={handleClose}>
                        CANCEL
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Grid>
              </Grid>
              <BottomTable />
            </Box>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
}
