import React, { useEffect } from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';
import TaskKey from '../TaskKey/TaskKey';
import { format } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import {
  setBusinessDays,
  setDaysOfWeek,
  updateMembers,
} from '../../redux/NewSprint/NewSprintActions';
import { RootState } from '../../redux/store';
import { getSprint } from '../../redux/Sprint/SprintActions';
import { Sprint, TaskData } from '../../types/NewSprintTypes';
import { updateWorkingDay } from '../../redux/WorkingDay/WorkingDayActions';

export default function PlanTable() {
  
  let nonEducationVacationTasksCount = 0;
  const dispatch = useDispatch();
  const sprint = useSelector((state: RootState) => state.newSprint.sprint);
  useEffect(() => {
    dispatch(getSprint("active"));
  }, [dispatch]);

  const sprintDisplay = useSelector((state: { sprint: Sprint }) => state.sprint.sprint);
  let updatedSprintDisplay = sprintDisplay;
  
  if (updatedSprintDisplay && updatedSprintDisplay.members) {
    updatedSprintDisplay = {
      ...updatedSprintDisplay,
      members: updatedSprintDisplay.members.map((member: { workingDays: any[] }) => {
        if (member.workingDays) {
          const sortedWorkingDays = [...member.workingDays].sort((a, b) => {
            if (a.id && b.id) {
              return Number(a.id) - Number(b.id);
            }
            return 0;
          });
          return { ...member, workingDays: sortedWorkingDays };
        }
        return member;
      }),
    };
  }
  const memberDisplay = useSelector((state: { sprint: Sprint }) => {
    const sprint = state.sprint.sprint;

    if (sprint && sprint.members) {
      const updatedMembers = sprint.members.map((member: { workingDays: any[] }) => {
        if (member.workingDays) {
          const sortedWorkingDays = [...member.workingDays].sort((a, b) => {
            if (a.id && b.id) {
              return Number(a.id) - Number(b.id);
            }
            return 0;
          });
          return { ...member, workingDays: sortedWorkingDays };
        }
        return member;
      });

      return updatedMembers;
    }

    return null;
  });

  const taskDisplay = useSelector((state: { sprint: Sprint }) => {
    const sprint = state.sprint.sprint;

    if (sprint && sprint.members) {
      const tasks: {
        memberId: string;
        dayId: React.Key | null | undefined;
        task: {
          id: any;
          dayId: any;
          keyValue: string;
          keyColor: string;
        };
      }[] = [];

      sprint.members.forEach((member: {
        workingDays: any[];
        memberId: any;
      }) => {
        member.workingDays.forEach((day: {
          id: React.Key | null | undefined;
          task: {
            keyValue: string;
            keyColor: string;
            dayId: number;
            id: number;
          };
        }) => {
          tasks.push({
            memberId: member.memberId,
            dayId: day.id,
            task: day.task || {
              keyValue: 'No task assigned',
              keyColor: 'N/A',
            },
          });
        });
      });

      tasks.sort((a, b) => {
        if (a.dayId && b.dayId) {
          return Number(a.dayId) - Number(b.dayId);
        }
        return 0;
      });

      return tasks;
    }

    return null;
  });
  const handleWorkingDayChange = (id: number, taskKeyValue: string, memberId: number, keyColor: string) => {
  
    dispatch(updateWorkingDay(id, taskKeyValue));
    const updatedMembers = [...memberDisplay];
    let memberIndex = -1;
  
    for (let i = 0; i < updatedMembers.length; i++) {
      if (updatedMembers[i].id === memberId) {
        memberIndex = i;
        break;
      }
    }
  
    if (memberIndex !== -1) {
      const dayIndex = updatedMembers[memberIndex].workingDays.findIndex((day: { id: number; }) => day.id === id);
      if (dayIndex !== -1) {
        updatedMembers[memberIndex].workingDays[dayIndex].task.keyValue = taskKeyValue;
        updatedMembers[memberIndex].workingDays[dayIndex].task.keyColor = keyColor;
      }
    }
  };

  useEffect(() => {
    if (updatedSprintDisplay?.endDate && updatedSprintDisplay?.startDate) {
      const startDate = new Date(updatedSprintDisplay?.startDate);
      const endDate = new Date(updatedSprintDisplay?.endDate);
      const days: string[] = [];
      const daysOfWeek: string[] = [];

      for (
        let date = startDate;
        date <= endDate;
        date.setDate(date.getDate() + 1)
      ) {
        if (date.getDay() !== 0 && date.getDay() !== 6) {
          const day = date.toISOString().split('T')[0];
          days.push(day);
          daysOfWeek.push(format(date, 'EEE'));
        }
      }
      dispatch(setBusinessDays(days));
      dispatch(setDaysOfWeek(daysOfWeek));
      dispatch(updateMembers());
    }
  }, [updatedSprintDisplay?.startDate, updatedSprintDisplay?.endDate, dispatch]);
  return (
    <>
      <Table
        sx={{
          border: '1px solid #e0e0e0',
          bgcolor: '#fff',
          marginBottom: 0,
        }}
      >
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: '#F9FAFA',
              height: '48px',
              color: '#878787',
            }}
          >
            {Array.from({ length: sprint.businessDays.length + 1 }, (_, i) => (
              <TableCell key={i} sx={{ textAlign: 'center', color: '#7C7D7C' }}>
                {i === 0 ? '' : sprint.businessDays[i - 1]}
              </TableCell>
            ))}
            <TableCell align="center">Total work days</TableCell>
          </TableRow>
          <TableRow sx={{ backgroundColor: '#F9FAFA', height: '48px' }}>
            {Array.from({ length: sprint.businessDays.length + 1 }, (_, i) => (
              <TableCell key={`header-${i}`} sx={{ textAlign: 'center' }}>
                {i === 0 ? '' : `${i}. ` + sprint.daysOfWeek[i - 1]}
              </TableCell>
            ))}
<TableCell align="center">
  {memberDisplay?.map((member: {
    memberId: React.Key | null | undefined;
    firstName: any;
    lastName: any;
    workingDays: any[];
  }) => {
    const tasksForMember = taskDisplay?.filter(task => task.memberId === member.memberId);
    let counter = 0; 

    member.workingDays.forEach((day) => {
      const tasksForMemberAndDay = tasksForMember?.filter(task => task.dayId === day.id);
      
      tasksForMemberAndDay?.forEach((task) => {
        if (task.task.keyValue !== "Education" && task.task.keyValue !== "Vacation") {
          counter++; 
        }
      });
    });

    return counter;
  }).reduce((a: any, b: any) => a + b, 0)}
</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          
        {memberDisplay?.map((member: { memberId: React.Key | null | undefined; firstName: any; id: any; lastName: any; workingDays: any[] }) => {
        const tasksForMember = taskDisplay?.filter(task => task.memberId === member.memberId);
          nonEducationVacationTasksCount=0;
          return (
            <TableRow key={member.memberId} sx={{ height: '64px' }}>
              <TableCell
                sx={{
                  borderRight: '1px solid #e0e0e0',
                  minWidth: '184px',
                }}
              >
                {member.firstName} {member.lastName}
              </TableCell>
              {member.workingDays.map((day) => {
                const tasksForMemberAndDay = tasksForMember?.filter(task => task.dayId === day.id);
                tasksForMemberAndDay?.forEach((task) => {
                  if (task.task.keyValue !== "Education" && task.task.keyValue !== "Vacation") {
                    nonEducationVacationTasksCount++;
                  }
                });
                return (
                  <React.Fragment key={day.id}>
                    <TableCell
                      align="center"
                      padding="none"
                      key={`${member}-${day.day}`}
                      sx={{
                        '&:hover': {
                          backgroundColor: '#F0F1F3',
                        },
                        textAlign: 'center',
                        verticalAlign: 'middle',
                        position: 'relative',
                      }}
                    >
                      <FormControl
                        variant="standard"
                        fullWidth
                        sx={{
                          maSelectrgin: 'auto',
                          '& .MuiInput-input': {
                            paddingRight: '0!important',
                          },
                          paddingRight: '0',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          zIndex: 2,
                        }}
                      >
                        <Select
                          disableUnderline
                          inputProps={{ IconComponent: () => null }}
                          sx={{
                            margin: 'auto',
                            '& .MuiInput-input': {
                              paddingRight: '0!important',
                            },
                            paddingRight: '0',
                          }}
                          value={day.task.id ?? ''}
                          onChange={(event) => {
                            const selectedValue = event.target.value;
                            const taskKey = selectedValue;
                            const task = updatedSprintDisplay?.tasks.find((task: { keyValue: any; }) => task.keyValue === taskKey);
                            const keyColor = task ? task.keyColor : '';
                            handleWorkingDayChange(day.id, taskKey, member.id, keyColor);
                          }}
                          label="Task"
                        >
                      {updatedSprintDisplay?.tasks.map((task: TaskData) => (
                        <MenuItem value={task?.keyValue} key={day.id}>
                          <TaskKey
                            taskKey={task.keyValue}
                            keyColor="#FFFFFF"
                            keyBackgroundColor={task.keyColor}
                          />
                        </MenuItem>
                        ))}
                          <MenuItem value="Vacation" key={day.id}>
                              <TaskKey
                                taskKey={'Vacation'}
                                keyColor={'#FFFFFF'}
                                keyBackgroundColor={'#878787'}
                              />
                          </MenuItem>
                          <MenuItem value="Education" key={day.id}>
                              <TaskKey
                                taskKey={'Education'}
                                keyColor={'#FFFFFF'}
                                keyBackgroundColor={'#878787'}
                              />
                          </MenuItem>
                        </Select>
                      </FormControl>
                      
                      <div style={{ display: "flex" }}>
                      {tasksForMemberAndDay?.map((task) => (
                        <TaskKey
                          taskKey={task.task.keyValue === "Education" ? "Education": task.task.keyValue === "Vacation" ? "Vacation" : task.task.keyValue}
                          keyColor={task.task.keyValue === "Education" ? "grey" : task.task.keyValue === "Vacation" ? "grey" : task.task.keyColor}
                          keyBackgroundColor={task.task.keyValue === "Education" ? "grey" : task.task.keyValue === "Vacation" ? "grey" : task.task.keyColor}
                          style={{ color: task.task.keyValue === "Education" ? "grey" : task.task.keyValue === "Vacation" ? "grey" : task.task.keyColor }}
                        />
                      ))}
                      </div>
                    </TableCell>
                  </React.Fragment>
                );
              })}
              <TableCell align="center">
              {nonEducationVacationTasksCount}
              </TableCell>
            </TableRow>
          );
        })}
        </TableBody>
      </Table>
    </>
  );
}
