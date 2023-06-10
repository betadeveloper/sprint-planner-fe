import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Paper } from '@mui/material';

type TaskKeyProps = {
  taskKey: string;
  keyColor: string;
  keyBackgroundColor: string;
  style?: React.CSSProperties;
};

function TaskKey(props: TaskKeyProps) {
  const KeyStyle = styled(Paper)(() => ({
    color: 'white',
    backgroundColor: props.keyBackgroundColor,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    verticalAlign: 'middle',
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: 12,
    lineHeight: 16,
    width: 90,
    height: 35,
    margin: 'auto!important',
    userSelect: 'none',
    pointerEvents: 'none',
  }));
  return <KeyStyle>{props.taskKey}</KeyStyle>;
}

export default TaskKey;
