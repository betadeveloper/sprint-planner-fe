import React, { useEffect } from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
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
import { getInitialSprint } from '../../redux/InitialSprint/InitialSprintActions';
import { InitialSprint } from '../../types/NewSprintTypes';

export default function PlanTable() {
  let nonEducationVacationTasksCount = 0;
  const dispatch = useDispatch();
  const sprint = useSelector((state: RootState) => state.newSprint.sprint);
  useEffect(() => {
    dispatch(getInitialSprint('active'));
  }, [dispatch]);

  const sprintDisplay = useSelector(
    (state: { initialSprint: InitialSprint }) =>
      state.initialSprint.initialSprint,
  );
  const memberDisplay = useSelector(
    (state: { initialSprint: InitialSprint }) => {
      const initialSprint = state.initialSprint.initialSprint;

      if (initialSprint && initialSprint.members) {
        return initialSprint.members;
      }

      return null;
    },
  );

  const taskDisplay = useSelector((state: { initialSprint: InitialSprint }) => {
    const initialSprint = state.initialSprint.initialSprint;

    if (initialSprint && initialSprint.members) {
      const tasks: {
        memberId: string;
        dayId: React.Key | null | undefined;
        task: { keyValue: string; keyColor: string };
      }[] = [];

      initialSprint.members.forEach(
        (member: { workingDays: any[]; memberId: any }) => {
          member.workingDays.forEach(
            (day: {
              id: React.Key | null | undefined;
              task: { keyValue: string; keyColor: string };
            }) => {
              tasks.push({
                memberId: member.memberId,
                dayId: day.id,
                task: day.task || {
                  keyValue: 'No task assigned',
                  keyColor: 'N/A',
                },
              });
            },
          );
        },
      );

      return tasks;
    }

    return null;
  });
  useEffect(() => {
    if (sprintDisplay?.endDate && sprintDisplay?.startDate) {
      const startDate = new Date(sprintDisplay?.startDate);
      const endDate = new Date(sprintDisplay?.endDate);
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
  }, [sprintDisplay?.startDate, sprintDisplay?.endDate, dispatch]);
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
              {memberDisplay
                ?.map(
                  (member: {
                    memberId: React.Key | null | undefined;
                    firstName: any;
                    lastName: any;
                    workingDays: any[];
                  }) => {
                    const tasksForMember = taskDisplay?.filter(
                      (task) => task.memberId === member.memberId,
                    );
                    let counter = 0;

                    member.workingDays.forEach((day) => {
                      const tasksForMemberAndDay = tasksForMember?.filter(
                        (task) => task.dayId === day.id,
                      );

                      tasksForMemberAndDay?.forEach((task) => {
                        if (
                          task.task.keyValue !== 'Education' &&
                          task.task.keyValue !== 'Vacation'
                        ) {
                          counter++;
                        }
                      });
                    });

                    return counter;
                  },
                )
                .reduce((a: any, b: any) => a + b, 0)}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {memberDisplay?.map(
            (member: {
              memberId: React.Key | null | undefined;
              firstName: any;
              lastName: any;
              workingDays: any[];
            }) => {
              const tasksForMember = taskDisplay?.filter(
                (task) => task.memberId === member.memberId,
              );
              nonEducationVacationTasksCount = 0;
              return (
                <TableRow key={member.memberId} sx={{ height: '48px' }}>
                  <TableCell
                    sx={{
                      borderRight: '1px solid #e0e0e0',
                      minWidth: '200px',
                    }}
                  >
                    {member.firstName} {member.lastName}
                  </TableCell>
                  {member.workingDays.map((day) => {
                    const tasksForMemberAndDay = tasksForMember?.filter(
                      (task) => task.dayId === day.id,
                    );
                    tasksForMemberAndDay?.forEach((task) => {
                      if (
                        task.task.keyValue !== 'Education' &&
                        task.task.keyValue !== 'Vacation'
                      ) {
                        nonEducationVacationTasksCount++;
                      }
                    });
                    return (
                      <React.Fragment key={day.id}>
                        <TableCell align="center">
                          {tasksForMemberAndDay?.map((task) => (
                            <TaskKey
                              taskKey={
                                task.task.keyValue === 'Education'
                                  ? 'Education'
                                  : task.task.keyValue === 'Vacation'
                                  ? 'Vacation'
                                  : task.task.keyValue
                              }
                              keyColor={
                                task.task.keyValue === 'Education'
                                  ? 'grey'
                                  : task.task.keyValue === 'Vacation'
                                  ? 'grey'
                                  : task.task.keyColor
                              }
                              keyBackgroundColor={
                                task.task.keyValue === 'Education'
                                  ? 'grey'
                                  : task.task.keyValue === 'Vacation'
                                  ? 'grey'
                                  : task.task.keyColor
                              }
                              style={{
                                color:
                                  task.task.keyValue === 'Education'
                                    ? 'grey'
                                    : task.task.keyValue === 'Vacation'
                                    ? 'grey'
                                    : task.task.keyColor,
                              }}
                            />
                          ))}
                        </TableCell>
                      </React.Fragment>
                    );
                  })}
                  <TableCell align="center">
                    {nonEducationVacationTasksCount}
                  </TableCell>
                </TableRow>
              );
            },
          )}
        </TableBody>
      </Table>
    </>
  );
}
