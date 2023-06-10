import React, { useState } from 'react';
import { Box, Button } from '@mui/material';

interface SaveButtonProps {
  onClick: () => void;
}

export default function SaveButton(props: SaveButtonProps) {
  const [saveClicked, setSaveClicked] = useState(false);
  const handleSaveClick = () => {
    setSaveClicked(true);
    props.onClick();
  };

  return (
    <Box>
      <Button
        variant={saveClicked ? 'contained' : 'outlined'}
        color="primary"
        size="small"
        onClick={handleSaveClick}
        sx={{
          '&:hover': {
            backgroundColor: 'blue',
            color: 'white',
          },
        }}
      >
        SAVE
      </Button>
    </Box>
  );
}
