import React, { useEffect, useState } from 'react';
import {
  TableCell,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Box,
  Button,
  Typography,
  Grid,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';
import PopUp from '../../components/TasksTable/PopUp';
import { StyledTableCell } from '../../style/TableCellStyle';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateTaskKeyValue,
} from '../../redux/NewSprint/NewSprintActions';
import { Sprint, TaskData } from '../../types/NewSprintTypes';
import TaskKey from '../TaskKey/TaskKey';
import { getSprint } from '../../redux/Sprint/SprintActions';

interface TasksProps {
  isEditMode: boolean;
}

export default function TasksTable(props: TasksProps): JSX.Element {
  const [expanded, setExpanded] = useState(false);
  const { isEditMode } = props;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSprint(1));
  }, [dispatch]);

  const tasksDisplay = useSelector((state: {sprint : Sprint}) => state.sprint.sprint);
  const handleKeyChange = (
    id: number,
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    dispatch(updateTaskKeyValue(id, event.target.value));
  };
  
  const calculateTotalOldPoints = (totals: TaskData[]) => {
    const tasks = tasksDisplay?.tasks ?? [];
  
    return tasks.reduce(
      (acc: number, task: TaskData) => acc + task.oldPoints,
      0,
    );
  };
  
  const calculateTotalRemainingAndNewPoints = (totals: TaskData[]) => {
    const tasks = tasksDisplay?.tasks ?? [];
  
    return tasks.reduce(
      (acc: number, task: TaskData) =>
        acc + task.remainingPoints + task.newPoints,
      0,
    );
  };

  const handleAccordionToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <Box>
      <Accordion expanded={!expanded}>
        <AccordionSummary
          sx={{
            flexDirection: 'row-reverse',
            display: 'flex',
            height: 5,
            minHeight: 60,
            borderBottom: '1px solid #dadada',
            ...(!isEditMode ? { display: 'none' } : undefined),
          }}
        >
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Typography variant="h4" fontWeight={500}>
                  Tasks
                </Typography>
                <Button
                  color="primary"
                  size="small"
                  onClick={handleAccordionToggle}
                  sx={{
                    ml: 2,
                  }}
                >
                  <ArrowDropDown
                    sx={{ transform: expanded ? 'rotate(180deg)' : 'none' }}
                  />
                </Button>
              </Box>
            </Grid>
            </Grid>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            marginTop: -8,
          }}
        >
          <TableContainer
            component={Paper}
            sx={{
              overflow: 'hidden',
              boxShadow: 'none',
              border: 'none',
            }}
          >
            <Table size="medium" aria-label="a dense table">
              {!Number.isInteger(tasksDisplay?.tasks.length) ? (
                <TableCell
                  size="medium"
                  sx={{
                    textAlign: 'center',
                    height: '80px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: 'none',
                  }}
                >
                  No tasks created.
                </TableCell>
              ) : (
                <Table size="medium" aria-label="a dense table">
                  <TableHead sx={{ bgcolor: 'grey.50' }}>
                    <TableRow>
                      <TableCell color="#7C7D7C">Key</TableCell>
                      <TableCell color="#7C7D7C">Description</TableCell>
                      <TableCell color="#7C7D7C">Type</TableCell>
                      <TableCell align="center" color="#7C7D7C">
                        Old pts.
                      </TableCell>
                      <TableCell align="center" color="#7C7D7C">
                        Remaining pts.
                      </TableCell>
                      <TableCell align="center" color="#7C7D7C">
                        New pts.
                      </TableCell>
                      {isEditMode && <TableCell>Delete</TableCell>}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tasksDisplay?.tasks.map((point: TaskData, index: number) => (
                      <TableRow key={index}>
                        {point.keyValue !== 'Education' && (
                          <>
                        <TableCell
                          component="th"
                          scope="rowsTop"
                          sx={{ border: '1px solid #ddd', width: 170 }}
                        >
                          <Box
                            style={{ display: 'flex', alignItems: 'justify' }}
                          >
                            {isEditMode ? (
                              <>
                                <TextField
                                  id="keyValue"
                                  variant="standard"
                                  sx={{ minWidth: 70 }}
                                  value={point.keyValue}
                                  onChange={(event) =>
                                    handleKeyChange(point.id, event)
                                  }
                                />
                                <PopUp
                                  taskId={point.id}
                                  initialColor={point.keyColor}
                                />
                              </>
                            ) : (
                              <TaskKey
                              taskKey={point.keyValue}
                              keyColor={point.keyColor}
                             keyBackgroundColor={point.keyColor}
                             style={{ color: point.keyColor }}
                              />
                            )}
                          </Box>
                        </TableCell>
                        <TableCell sx={{ minWidth: 400 }}>
                        <Typography>{point.description}</Typography>
                        </TableCell>
                        <StyledTableCell >
                         <Typography>{point.type}</Typography>
                        </StyledTableCell>
                        <StyledTableCell sx={{ textAlign: 'center' }}>
                        <Typography textAlign="center">
                         {point.oldPoints}
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell sx={{ textAlign: 'center' }}>
                            <Typography textAlign="center">
                              {point.remainingPoints}
                            </Typography>
                        </StyledTableCell>
                        <StyledTableCell sx={{ textAlign: 'center' }}>
                            <Typography textAlign="center">
                              {point.newPoints}
                            </Typography>
                        </StyledTableCell>
                        </>
                        )}
                      </TableRow>
                    ))}
                    <TableRow sx={{ bgcolor: 'grey.50' }}>
                    <TableCell></TableCell>
                    {isEditMode && <TableCell></TableCell>}
                    <TableCell></TableCell> 
                    <TableCell sx={{textAlign: 'right', fontWeight: 'bold'}}>Total:</TableCell>
                    <TableCell
                      align="center"
                      sx={{ border: '1px solid #ddd' }}
                    >
                     {` ${calculateTotalOldPoints(tasksDisplay?.tasks)}`}
                     </TableCell>
                    <TableCell align="right">
                     <Box style={{ marginRight: '-22px' }}>
                      {` ${calculateTotalRemainingAndNewPoints(tasksDisplay?.tasks)}`}
                     </Box>
                   </TableCell>
                    <TableCell sx={{ border: '1px solid #ddd', borderLeft: 'none' }}></TableCell>
                  </TableRow>
                  </TableBody>
                </Table>
              )}
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
