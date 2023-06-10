import * as React from 'react';
import {
  TableCell,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  styled,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useEffect } from 'react';
import { getAllTeamData } from '../../redux/ManageTeam/ManageTeamActions';

const StyledTableCell = styled(TableCell)(() => ({
  textAlign: 'left',
  fontWeight: '600',
  fontSize: '1em',
}));

export default function TopTable() {
  const dispatch = useDispatch();
  const teams = useSelector((state: RootState) => state.manageTeam.team);
  const rowsTop = teams
    ? [
        createData(
          teams.name,
          teams.members.length,
          teams.completedProjects,
          teams.completedTasks,
        ),
      ]
    : [];

  useEffect(() => {
    dispatch(getAllTeamData());
  }, [dispatch]);

  function createData(
    name: string,
    members: number,
    projects: number | null,
    tasks: number | null,
  ) {
    return { name, members, projects, tasks };
  }

  return (
    <TableContainer component={Paper} sx={{ overflowX: 'hidden' }}>
      <Table size="medium" aria-label="a dense table" sx={{ marginLeft: 6 }}>
        <TableHead>
          <TableRow>
            <StyledTableCell>Team Name</StyledTableCell>
            <StyledTableCell>Members</StyledTableCell>
            <StyledTableCell>Projects completed</StyledTableCell>
            <StyledTableCell>Tasks completed</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowsTop.map((row) => (
            <TableRow key={row.name}>
              <TableCell sx={{ fontSize: '1em' }}>{row.name}</TableCell>
              <TableCell sx={{ fontSize: '1em' }}>{row.members}</TableCell>
              <TableCell sx={{ fontSize: '1em' }}>{row.projects}</TableCell>
              <TableCell sx={{ fontSize: '1em' }}>{row.tasks}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
