import { Box, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearNewSprintState,
  createNewSprint,
  getTasksAddedCount,
} from '../../redux/NewSprint/NewSprintActions';
import { useNavigate } from 'react-router-dom';
import { NewSprint } from '../../redux/NewSprint/NewSprintReducer';
import { getSprintsRequest } from '../../redux/Sprints/SprintsActions';
import { useEffect } from 'react';

function BottomMenu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sprint = useSelector(
    (state: { newSprint: NewSprint }) => state.newSprint.sprint,
  );

  const disableAddButton  = sprint.numberTasksAdded;
  useEffect(() => {
     dispatch(getSprintsRequest());
     dispatch(getTasksAddedCount());
  }, [dispatch, sprint.tasks]);



  const handleAddClick = async () => {
    dispatch(createNewSprint(sprint));
    dispatch(clearNewSprintState());
    await dispatch(getSprintsRequest());
    setTimeout(() => {
      navigate('/');
    }, 500);

  };

  const handleCancelClick = () => {
    dispatch(clearNewSprintState());
    navigate('/');
  };

  return (
    <Box
      sx={{
        pl: 15,
        pt: 1,
        pb: 1,
        position: 'fixed',
        bottom: 0,
        width: '100%',
        backgroundColor: '#ffffff',
        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.25)',
      }}
    >
      <Box
        style={{
          width: '100%',
          height: '50px',
          backgroundColor: '#fff',
          display: 'flex',
          justifyContent: 'flex',
          alignItems: 'center',
        }}
      >
        <Button
          variant="contained"
          style={{
            backgroundColor: 'primary',
            color: '#fff',
            borderRadius: '5px',
            border: 'none',
            marginRight: '15px',
            fontSize: '18px',
          }}
          onClick={handleAddClick}
       disabled={!disableAddButton}
        >
          ADD
        </Button>
        <Button
          variant="outlined"
          style={{
            backgroundColor: '#fff',
            color: 'primary',
            borderColor: '#dadada',
            borderRadius: '5px',
            fontSize: '18px',
          }}
          onClick={handleCancelClick}
        >
          CANCEL
        </Button>
      </Box>
    </Box>
  );
}

export default BottomMenu;
