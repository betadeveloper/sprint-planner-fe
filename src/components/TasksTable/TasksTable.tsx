import React, { useState } from 'react';
import {
  TableCell,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  IconButton,
  MenuItem,
  FormControl,
  Select,
  Box,
  Button,
  Typography,
  Grid,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '@mui/material';
import { ArrowDropDown, DeleteForever, Add } from '@mui/icons-material';
import PopUp from './PopUp';
import { GoalType } from '../../enums/enums';
import { StyledTableCell } from '../../style/TableCellStyle';
import { useDispatch, useSelector } from 'react-redux';
import {
  addTask,
  removeTask,
  updateTaskDescription,
  updateTaskKeyValue,
  updateTaskNewPoints,
  updateTaskOldPoints,
  updateTaskRemainingPoints,
  updateTaskType,
} from '../../redux/NewSprint/NewSprintActions';
import { Sprint, TaskData } from '../../types/NewSprintTypes';
import TaskKey from '../TaskKey/TaskKey';

interface TasksProps {
  isEditMode: boolean;
}

export default function TasksTable(props: TasksProps): JSX.Element {
  const [expanded, setExpanded] = useState(false);
  const { tasks } = useSelector( (state: { newSprint: Sprint }) => state.newSprint.sprint );
  const { isEditMode } = props;

  const dispatch = useDispatch();

  const handleKeyChange = (
    id: number,
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    dispatch(updateTaskKeyValue(id, event.target.value));
  };

  const handleDescriptionChange = (
    id: number,
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    dispatch(updateTaskDescription(id, event.target.value));
  };

  const handleOldPointsChange = (
    id: number,
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    dispatch(updateTaskOldPoints(id, Number(event.target.value)));
  };

  const handleRemainingPointsChange = (
    id: number,
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    dispatch(updateTaskRemainingPoints(id, Number(event.target.value)));
  };

  const handleNewPointsChange = (
    id: number,
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    dispatch(updateTaskNewPoints(id, Number(event.target.value)));
  };

  const handleDeleteTask = (id: number) => {
    dispatch(removeTask(id));
  };

  const handleTypeChange = (id: number, event: GoalType) => {
    dispatch(updateTaskType(id, event));
  };

  const getRandomId = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1) + min) * Date.now();
  };

  const handleAddTask = () => {

    const newTaskObject: TaskData = {
      id: getRandomId(1, 1000),
      keyValue: '',
      keyColor: '#EC4226',
      description: '',
      type: '',
      oldPoints: 0,
      remainingPoints: 0,
      newPoints: 0,
    };
    dispatch(addTask(newTaskObject));
    setExpanded(false);
  };

  const calculateTotalOldPoints = (totals: TaskData[]) => {
    return totals.reduce(
      (acc: number, point: { oldPoints: number }) => acc + point.oldPoints,
      0,
    );
  };

  const calculateTotalRemainingAndNewPoints = (totals: TaskData[]) => {
    return totals.reduce(
      (acc: number, point: { remainingPoints: number; newPoints: number }) =>
        acc + point.remainingPoints + point.newPoints,
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

            <Grid item>
              <Button
                variant="outlined"
                color="primary"
                size="small"
                onClick={handleAddTask}
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
                ADD A TASK
              </Button>
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
              {tasks.length === 0 ? (
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
                    {tasks.map((point: TaskData, index: number) => (
                      <TableRow key={index}>
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
                              />
                            )}
                          </Box>
                        </TableCell>
                        <TableCell sx={{ minWidth: 400 }}>
                          {isEditMode ? (
                            <TextField
                              id="standard-basic"
                              variant="standard"
                              sx={{ width: 600 }}
                              value={point.description}
                              onChange={(event) =>
                                handleDescriptionChange(point.id, event)
                              }
                            />
                          ) : (
                            <Typography>{point.description}</Typography>
                          )}
                        </TableCell>
                        <StyledTableCell>
                          {isEditMode ? (
                            <FormControl variant="standard">
                              <Select
                                id={`point-type-select-${point.id}`}
                                value={point.type}
                                displayEmpty
                                onChange={(event) =>
                                  handleTypeChange(
                                    point.id,
                                    event.target.value as GoalType,
                                  )
                                }
                              >
                                <MenuItem value={GoalType.GOAL_TYPE}>
                                  Goal
                                </MenuItem>
                                <MenuItem value={GoalType.TECHNICAL_TYPE}>
                                  Technical
                                </MenuItem>
                              </Select>
                            </FormControl>
                          ) : (
                            <Typography>{point.type}</Typography>
                          )}
                        </StyledTableCell>
                        <StyledTableCell sx={{ textAlign: 'center' }}>
                          {isEditMode ? (
                            <TextField
                              id={`oldPoints${point.id}`}
                              variant="standard"
                              value={point.oldPoints}
                              onChange={(event) =>
                                handleOldPointsChange(point.id, event)
                              }
                            />
                          ) : (
                            <Typography textAlign="center">
                              {point.oldPoints}
                            </Typography>
                          )}
                        </StyledTableCell>
                        <StyledTableCell>
                          {isEditMode ? (
                            <TextField
                              id={`remainingPoints${point.id}`}
                              variant="standard"
                              value={point.remainingPoints}
                              onChange={(event) =>
                                handleRemainingPointsChange(point.id, event)
                              }
                            />
                          ) : (
                            <Typography textAlign="center">
                              {point.remainingPoints}
                            </Typography>
                          )}
                        </StyledTableCell>
                        <StyledTableCell>
                          {isEditMode ? (
                            <TextField
                              id={`newPoints${point.id}`}
                              variant="standard"
                              value={point.newPoints}
                              onChange={(event) =>
                                handleNewPointsChange(point.id, event)
                              }
                            />
                          ) : (
                            <Typography textAlign="center">
                              {point.newPoints}
                            </Typography>
                          )}
                        </StyledTableCell>
                        {isEditMode && (
                          <TableCell
                            sx={{ border: '1px solid #ddd', Width: 80 }}
                          >
                            <IconButton
                              onClick={() => handleDeleteTask(point.id)}
                            >
                              <DeleteForever />
                            </IconButton>
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
                    <TableRow sx={{ bgcolor: 'grey.50' }}>
                      <TableCell></TableCell>
                      {isEditMode && <TableCell></TableCell>}
                      <TableCell>Total</TableCell>
                      <TableCell
                        align="center"
                        sx={{ border: '1px solid #ddd' }}
                      >
                        {` ${calculateTotalOldPoints(tasks)}`}
                      </TableCell>
                      <TableCell align="right">
                        <Box style={{ marginRight: '-22px' }}>
                          {` ${calculateTotalRemainingAndNewPoints(tasks)}`}
                        </Box>
                      </TableCell>
                      <TableCell></TableCell>
                      <TableCell sx={{ border: '1px solid #ddd' }}></TableCell>
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
