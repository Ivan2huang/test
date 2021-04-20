import colors from './colors.ginger';
import breakpoints from '../breakpoints';

const fontWeights = {
  light: 300,
  normal: 400,
  semiBold: 600,
  bold: 700,
};

const typography = {
  fontFamily: 'Arial',
  fontWeightLight: fontWeights.light,
  fontWeightRegular: fontWeights.normal,
  fontWeightMedium: fontWeights.semiBold,
  fontWeightBold: fontWeights.bold,
  fontWeights,
  'style-1': {
    fontStyle: 'normal',
    fontWeight: fontWeights.light,
    fontSize: '32px',
    lineHeight: '37px',
    letterSpacing: '-1.5px',
    color: colors.highEmphasis,

    [breakpoints.up('md')]: {
      fontWeight: fontWeights.light,
      fontSize: '30px',
      lineHeight: '36px',
    },
  },
  'style-2': {
    fontStyle: 'normal',
    fontWeight: fontWeights.semiBold,
    fontSize: '20px',
    lineHeight: '24px',
    letterSpacing: '0.25px',
    color: colors.mediumEmphasis,

    [breakpoints.up('md')]: {
      fontWeight: fontWeights.light,
      fontSize: '30px',
      lineHeight: '36px',
      color: colors.highEmphasis,
    },
  },
  'style-3': {
    fontStyle: 'normal',
    fontWeight: fontWeights.bold,
    fontSize: '16px',
    lineHeight: '22px',
    letterSpacing: '0.3px',
    color: colors.highEmphasis,

    [breakpoints.up('md')]: {
      fontWeight: fontWeights.light,
      fontSize: '21px',
      lineHeight: '25px',
    },
  },
  'style-4': {
    fontStyle: 'normal',
    fontWeight: fontWeights.semiBold,
    fontSize: '16px',
    lineHeight: '22px',
    letterSpacing: '0.3px',
    color: colors.mediumEmphasis,

    [breakpoints.up('md')]: {
      fontSize: '14px',
      lineHeight: '20px',
      letterSpacing: 'unset',
      color: colors.highEmphasis,
    },
  },
  'style-5': {
    fontStyle: 'normal',
    fontWeight: fontWeights.normal,
    fontSize: '16px',
    lineHeight: '22px',
    letterSpacing: '0.3px',
    color: colors.highEmphasis,

    [breakpoints.up('md')]: {
      fontSize: '14px',
      lineHeight: '20px',
      letterSpacing: 'unset',
    },
  },
  'style-6': {
    fontStyle: 'normal',
    fontWeight: fontWeights.normal,
    fontSize: '16px',
    lineHeight: '22px',
    letterSpacing: '0.3px',
    color: colors.mediumEmphasis,

    [breakpoints.up('md')]: {
      fontSize: '14px',
      lineHeight: '20px',
      letterSpacing: 'unset',
    },
  },
  'style-7': {
    fontStyle: 'normal',
    fontWeight: fontWeights.semiBold,
    fontSize: '14px',
    lineHeight: '16px',
    letterSpacing: '0.3px',
    color: colors.highEmphasis,

    [breakpoints.up('md')]: {
      fontWeight: fontWeights.bold,
      fontSize: '14px',
      lineHeight: '20px',
      letterSpacing: 'unset',
    },
  },
  'style-8': {
    fontStyle: 'normal',
    fontWeight: fontWeights.normal,
    fontSize: '12px',
    lineHeight: '16px',
    letterSpacing: '0.4px',
    color: colors.mediumEmphasis,

    [breakpoints.up('md')]: {
      fontSize: '11px',
      lineHeight: '15px',
      letterSpacing: 'unset',
    },
  },
  'style-9': {
    fontStyle: 'normal',
    fontWeight: fontWeights.normal,
    fontSize: '20px',
    lineHeight: '22px',
    letterSpacing: '0.3px',
    color: colors.black,

    [breakpoints.up('md')]: {
      fontSize: '21px',
      lineHeight: '25px',
    },
  },
  'style-10': {
    fontStyle: 'normal',
    fontWeight: fontWeights.normal,
    fontSize: '14px',
    lineHeight: '20px',
    letterSpacing: '0.25px',
    color: colors.mediumEmphasis,

    [breakpoints.up('md')]: {
      fontSize: '12px',
      lineHeight: '20px',
    },
  },
  'style-11': {
    fontStyle: 'normal',
    fontWeight: fontWeights.normal,
    fontSize: '14px',
    lineHeight: '20px',
    letterSpacing: '0.25px',
    color: colors.highEmphasis,

    [breakpoints.up('md')]: {
      fontSize: '12px',
      lineHeight: '20px',
    },
  },
};

export default typography;
