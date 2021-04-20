import React from 'react';
import PropTypes from 'prop-types';

import { Box } from '@material-ui/core';
import { makeStyles, withTheme } from '@material-ui/core/styles';

export const getStyles = props => {
  const { theme } = props;
  return {
    display: 'inline-block',
    margin: '2px',
    padding: '0px',
    marginBottom: '10px',
    backgroundColor: 'transparent',
    color: theme.hyperlink,
    border: 'none',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
      marginBottom: '0px',
    },
    '&:hover': {
      backgroundColor: 'transparent',
    },
  };
};

const useStyles = makeStyles({
  backBtn: getStyles,
});

const NavigationBackButton = props => {
  const classes = useStyles(props);
  const { testId, onClick, children } = props;

  return (
    <Box>
      <button
        className={classes.backBtn}
        type="button"
        size="small"
        data-testid={testId}
        onClick={onClick}
      >
        {children}
      </button>
    </Box>
  );
};

NavigationBackButton.propTypes = {
  children: PropTypes.node.isRequired,
  testId: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

NavigationBackButton.defaultProps = {
  onClick: null,
};

export default withTheme(NavigationBackButton);
