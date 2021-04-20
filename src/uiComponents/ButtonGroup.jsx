import React from 'react';
import PropTypes from 'prop-types';

import { Box } from '@material-ui/core';
import { makeStyles, withTheme } from '@material-ui/core/styles';

export const getStyles = props => {
  const { theme, inverse } = props;
  const marginFor = inverse ? '&:first-child' : '&;last-child';
  return {
    display: 'flex',
    flexDirection: 'column',
    '& > *': {
      marginBottom: theme.spacingX(4),
    },
    [theme.breakpoints.up('md')]: {
      flexDirection: inverse ? 'row-reverse' : 'row',
      flexFlow: 'row wrap',
      '& > *': {
        marginRight: theme.spacingX(2),
        [marginFor]: {
          marginRight: 0,
        },
      },
    },
  };
};

const useStyles = makeStyles({
  root: getStyles,
});

const ButtonGroup = props => {
  const classes = useStyles(props);
  const { children } = props;
  return <Box classes={classes}>{children}</Box>;
};

ButtonGroup.propTypes = {
  children: PropTypes.node.isRequired,
};

export default withTheme(ButtonGroup);
