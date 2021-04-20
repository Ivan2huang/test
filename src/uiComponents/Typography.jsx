import React from 'react';
import * as PropTypes from 'prop-types';

import { withTheme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { isEmpty } from '../helpers/helpers';

const createTextStyle = (theme, color, fontWeight, textDecoration) => {
  return {
    textDecoration,
    ...(color && { color: theme[color] }),
    ...(fontWeight && { fontWeight: theme.typography.fontWeights[fontWeight] }),
  };
};

export const getStyles = props => {
  const { type, theme, color, fontWeight, textDecoration } = props;
  const textStyles = createTextStyle(theme, color, fontWeight, textDecoration);
  if (typeof type === 'string') {
    if (isEmpty(textStyles)) {
      return { ...theme.typography[type] };
    }
    return {
      ...theme.typography[type],
      ...textStyles,
      '&': {
        [theme.breakpoints.up('md')]: {
          ...textStyles,
        },
      },
    };
  }
  return {
    ...theme.typography[type.xs],
    ...textStyles,
    [theme.breakpoints.up('sm')]: {
      ...theme.typography[type.sm],
      ...textStyles,
    },
    [theme.breakpoints.up('md')]: {
      ...theme.typography[type.md],
      ...textStyles,
    },
  };
};

const StyledTypography = ({
  children,
  className,
  noWrap,
  component,
  theme,
  type,
  fontWeight,
  color,
  ...rest
}) => {
  const useStyles = makeStyles({
    root: getStyles,
  });

  const classes = useStyles({ theme, type, fontWeight, color, ...rest });
  return (
    <Typography
      classes={classes}
      className={className}
      component={component}
      noWrap={noWrap}
      {...rest}
    >
      {children}
    </Typography>
  );
};

StyledTypography.defaultProps = {
  children: '',
  noWrap: false,
};

StyledTypography.propTypes = {
  children: PropTypes.node,
  color: PropTypes.string,
  type: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  className: PropTypes.string,
  noWrap: PropTypes.bool,
  theme: PropTypes.shape({}).isRequired,
  fontWeight: PropTypes.string,
  component: PropTypes.string,
};

StyledTypography.defaultProps = {
  color: undefined,
  type: 'body',
  className: '',
  component: 'div',
  fontWeight: undefined,
};

export default withTheme(StyledTypography);
