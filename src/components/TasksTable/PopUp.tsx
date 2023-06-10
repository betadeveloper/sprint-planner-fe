import * as React from 'react';
import { Popover, Button, Box } from '@mui/material';
import { ChromePicker, ColorResult } from 'react-color';
import ColorizeIcon from '@mui/icons-material/Colorize';
import { updateTaskKeyColor } from '../../redux/NewSprint/NewSprintActions';
import { useDispatch, useSelector } from 'react-redux';
import { NewSprint } from '../../redux/NewSprint/NewSprintReducer';

interface ColorPickerPopoverProps {
  initialColor: string;
  taskId: number;
}

export default function ColorPickerPopover({
  initialColor,
  taskId,
}: ColorPickerPopoverProps) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );

  const dispatch = useDispatch();

  useSelector((state: { newSprint: NewSprint }) => state.newSprint.sprint);

  const [selectedColor, setSelectedColor] = React.useState(initialColor);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleColorChange = (color: ColorResult) => {
    setSelectedColor(color.hex);
    dispatch(updateTaskKeyColor(taskId, color.hex));
  };

  const handleColorSelect = () => {
    handleClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? 'color-picker-popover' : undefined;

  return (
    <Box
      style={{
        display: 'flex',
        alignItems: 'center',
        border: '0.1px solid lightgrey',
        borderRadius: '5px',
        marginLeft: '10px',
      }}
    >
      <Box style={{ display: 'flex', alignItems: 'center' }}>
        <Button
          aria-describedby={id}
          onClick={handleClick}
          style={{
            width: '25px',
            height: '25px',
            minWidth: '25px',
            backgroundColor: selectedColor,
          }}
          sx={{ ml: 1 }}
        ></Button>
        <ColorizeIcon />
      </Box>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box
          style={{
            fontSize: '16px',
            lineHeight: '24px',
            marginTop: '10px',
            marginLeft: '10px',
            color: 'grey',
          }}
        >
          Pick a Color
        </Box>
        <Box
          style={{
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            border: 'none',
            boxShadow: 'none',
            outline: 'none',
          }}
        >
          <ChromePicker
            color={selectedColor}
            onChangeComplete={handleColorChange}
            disableAlpha={true}
            styles={{
              default: {
                picker: {
                  border: 'none',
                  boxShadow: 'none',
                },
              },
            }}
          />
          <Box
            style={{
              display: 'flex',
              justifyContent: 'right',
              alignItems: 'right',
              width: '100%',
              marginTop: '16px',
            }}
          >
            <Box>
              <Button
                onClick={handleClose}
                color="primary"
                style={{ marginRight: '8px' }}
              >
                CANCEL
              </Button>
              <Button
                onClick={handleColorSelect}
                color="primary"
                variant="text"
              >
                OK
              </Button>
            </Box>
          </Box>
        </Box>
      </Popover>
    </Box>
  );
}
