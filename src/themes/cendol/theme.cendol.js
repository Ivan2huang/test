import { createMuiTheme } from '@material-ui/core/styles';

import breakpoints from '../breakpoints';
import colors from './colors.cendol';
import typography from './typography.cendol';
import IMAGES from '../../constants/images';

const THEME_UNIT_SPACING = 4;

const spacing = factor => THEME_UNIT_SPACING * factor;
const spacingX = factor => `${spacing(factor)}px`;
const borderRadiusX = factor => spacingX(factor);

const theme = createMuiTheme({
  ...colors,
  breakpoints,
  typography: { ...typography },
  spacing,
  spacingX,
  borderRadiusX,
  palette: {
    type: 'light',
    primary: {
      main: colors.primary,
      light: colors.primary,
      dark: colors.primary,
    },
    secondary: {
      main: colors.highEmphasis,
      light: colors.highEmphasis,
      dark: colors.highEmphasis,
    },
  },
  logo: IMAGES.LOGO,
});

theme.overrides = {
  MuiButton: {
    root: {
      ...typography['style-6'],
      fontSize: '14px',
      borderRadius: borderRadiusX(0),
      textTransform: 'initial',
      height: theme.spacingX(12),
      paddingRight: theme.spacingX(5),
      paddingLeft: theme.spacingX(5),
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
      [theme.breakpoints.up('md')]: {
        height: 'auto',
        minHeight: theme.spacingX(10),
      },
    },
    outlined: {
      paddingRight: theme.spacingX(5),
      paddingLeft: theme.spacingX(5),
    },
    contained: {
      boxShadow: 'none',
    },
    containedPrimary: {
      background: colors.buttonGradient,
      color: colors.white,
    },
  },
  MuiTabs: {
    indicator: {
      height: 0,
    },
  },
  MuiTab: {
    root: {
      padding: 0,
      textTransform: 'capitalize',
      color: colors.highEmphasis,
      borderBottom: `${spacingX(1)} solid transparent`,
      ...typography.body,

      '&': {
        minWidth: 'auto',
      },

      '&:hover, &:focus': {
        borderBottom: `${spacingX(1)} solid ${colors.error}`,
      },

      '&$selected': {
        fontWeight: typography.fontWeightBold,
        borderBottom: `${spacingX(1)} solid ${colors.primary}`,
      },
    },
  },
  MuiCard: {
    root: {
      padding: 0,
      '&:last-child': {
        paddingBottom: 0,
      },
      borderRadius: theme.borderRadiusX(1),
      background: theme.background,
      boxShadow: 'none',
      [theme.breakpoints.up('sm')]: {
        background: theme.white,
        boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  MuiCardContent: {
    root: {
      padding: 0,
      '&:last-child': {
        paddingBottom: 0,
      },
    },
  },
  MuiFormControl: {
    root: {
      marginTop: spacingX(3),
      marginBottom: spacingX(5),
    },
  },
  MuiFormHelperText: {
    contained: {
      margin: `${spacingX(2)} ${spacingX(1)} 0`,
    },
    root: {
      '&$error': {
        color: colors.error,
      },
    },
  },
  MuiFormLabel: {
    root: {
      color: colors.label,
      '&$focused': {
        color: colors.outline,
      },
      '&$error': {
        color: colors.label,
      },
    },
  },
  MuiInputLabel: {
    outlined: {
      transform: `translate(${spacingX(1)}, ${spacingX(5)}) scale(1)`,
      '&$shrink': {
        transform: `translate(${spacingX(1)}, ${spacingX(-1.5)}) scale(0.75)`,
      },
    },
  },
  MuiOutlinedInput: {
    input: {
      padding: `${spacingX(4.5)} ${spacingX(1)} ${spacingX(2)}`,
    },
    notchedOutline: {
      border: 'none',
      borderBottom: `solid ${1}px`,
      borderBottomColor: colors.disabled,
      borderRadius: borderRadiusX(0),
    },
    root: {
      '&:hover:not($focused):not($error):not($disabled) $notchedOutline': {
        borderColor: colors.highEmphasis,
      },
      '&$focused $notchedOutline': {
        borderColor: colors.outline,
      },
      '&&$error $notchedOutline': {
        borderColor: colors.error,
      },
    },
    adornedEnd: {
      paddingRight: 0,
    },
  },
  MuiInputAdornment: {
    positionEnd: {
      '& > button': {
        padding: spacingX(4),
      },
    },
  },
  MuiSelect: {
    select: {
      '&:focus': {
        backgroundColor: 'transparent',
      },
    },
    icon: {
      right: spacingX(4),
    },
  },
  MuiMenuItem: {
    root: {
      ...typography.body,
      wordBreak: 'break-word',
      whiteSpace: 'pre-wrap',
    },
  },
  MuiListItem: {
    button: {
      '&:hover:not($selected), &:focus:not($selected)': {
        backgroundColor: colors.background,
      },
      '&$selected': {
        backgroundColor: colors.grey1,
      },
    },
  },
  MuiCheckbox: {
    colorPrimary: {
      color: colors.lowEmphasis,
      '&$checked': {
        color: colors.success,
      },
    },
  },
  MuiRadio: {
    root: {
      '&$checked': {
        color: colors.primary,
      },
    },
    colorPrimary: {
      color: colors.lowEmphasis,
      '&$checked': {
        color: colors.success,
      },
    },
    colorSecondary: {
      color: colors.lowEmphasis,
      '&$checked': {
        color: colors.primary,
      },
    },
  },
  MuiGrid: {
    root: {
      '&&': {
        marginTop: 0,
        marginBottom: 0,
      },
    },
    item: {
      '&&&': {
        paddingTop: 0,
        paddingBottom: 0,
      },
    },
  },
  MuiDivider: {
    root: {
      backgroundColor: theme.grey1,
    },
  },
};

export default theme;
