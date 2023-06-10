import * as React from 'react';
import avatarImage from '../../images/avatar/avatar.png';
import RemoveButton from './RemoveButton';
import SaveButton from './SaveButton';
import {
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  MenuItem,
  Menu,
} from '@mui/material';
import { Role } from '../../enums/enums';
import { TableRowElementProps } from '../../types/TeamTypes';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllTeamMembers,
  getMembersSuccess,
  removeTeamMember,
  updateMemberRole,
  updateTeamMemberRole,
} from '../../redux/ManageTeam/ManageTeamActions';
import { useEffect } from 'react';
import { RootState } from '../../redux/store';

export default function BottomTable() {
  const dispatch = useDispatch();

  const members = useSelector(
    (state: RootState) => state.manageTeam.team.members,
  );

  useEffect(() => {
    dispatch(getAllTeamMembers());
  }, [dispatch]);

  const handleRoleChange = (id: number, role: Role) => {
    dispatch(updateMemberRole(id, role));
    dispatch(updateTeamMemberRole(id, role));
  };

  const TableRowElement: React.FC<TableRowElementProps> = ({
    row,
    index,
  }: TableRowElementProps) => {
    const [showSaveButton, setShowSaveButton] = React.useState(false);
    const [selectedRole, setSelectedRole] = React.useState(row.role);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (
      event: React.MouseEvent<HTMLElement>,
      index: number,
    ) => {
      const selectedRoleValue = Object.values(Role)[index];
      setSelectedRole(selectedRoleValue);
      setAnchorEl(null);
      setShowSaveButton(true);
      handleRoleChange(row.id, selectedRoleValue);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleSave = () => {
      setShowSaveButton(false);
    };

    const handleRemove = () => {
      dispatch(removeTeamMember(row.id));
      const updatedMembers = members.filter((member) => member.id !== row.id);
      dispatch(getMembersSuccess(updatedMembers));
    };

    return (
      <React.Fragment key={row.id}>
        <TableRow
          sx={{
            width: '30px',
            '&:hover': {
              backgroundColor: '#f0ebf7',
              opacity: [0.9, 0.1, 10],
            },
          }}
        >
          <TableCell component="th" scope="row">
            <Avatar
              sx={{ ml: 6, width: '50px', height: '50px' }}
              src={avatarImage}
              alt="avatar"
            />
          </TableCell>
          <TableCell align="left" sx={{ width: '400px', fontSize: '1em' }}>
            {row.firstName && row.lastName
              ? `${row.firstName} ${row.lastName}`
              : row.email}
          </TableCell>
          <TableCell
            align="left"
            // onMouseEnter={handleClickListItem}
            sx={{ width: '500px', fontSize: '1em' }}
          >
            {selectedRole}
            <Menu
              id={`lock-menu-${index}`}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': `lock-button-${index}`,
                role: 'listbox',
              }}
            >
              {Object.values(Role).map((role, index) => (
                <MenuItem
                  key={role}
                  selected={role === selectedRole}
                  onClick={(event) => handleMenuItemClick(event, index)}
                >
                  {role}
                </MenuItem>
              ))}
            </Menu>
          </TableCell>
          <TableCell align="right" sx={{ width: '80px' }}>
            <RemoveButton
              name={row.name}
              email={row.email}
              handleRemoveMember={handleRemove}
            />
          </TableCell>
          <TableCell align="left" sx={{ width: '100px' }}>
            {showSaveButton ? <SaveButton onClick={handleSave} /> : null}
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell width="50px" align="left" />
            <TableCell
              align="left"
              sx={{ fontWeight: '600', padding: '25px 15px', fontSize: '1em' }}
            >
              Name
            </TableCell>
            <TableCell
              align="left"
              sx={{ fontWeight: '600', padding: '25px 15px', fontSize: '1em' }}
            >
              Role
            </TableCell>
            <TableCell align="left" />
          </TableRow>
        </TableHead>
        <TableBody>
          {members.map((member, index) => (
            <TableRowElement key={member.id} row={member} index={index} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
