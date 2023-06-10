import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

type TypographyProps = {
  textAlignKey: any;
  fontSizeKey: number;
  fontFamilyKey: string;
  fontStyleKey: string;
  color: string;
};

export const TypographyItem = styled(Typography)((props: TypographyProps) => ({
  color: props.color,
  textAlign: props.textAlignKey,
  fontFamily: props.fontFamilyKey,
  fontStyle: props.fontStyleKey,
  fontWeight: 600,
  fontSize: props.fontSizeKey,
}));
