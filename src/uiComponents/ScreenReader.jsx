import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';

const styles = () => ({
  srOnly: {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: 0,
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    border: 0,
  },
});

const ScreenReader = ({ classes, children }) => (
  <div className={classes.srOnly}>{children}</div>
);

ScreenReader.propTypes = {
  classes: PropTypes.shape({ srOnly: PropTypes.string.isRequired }).isRequired,
  children: PropTypes.node,
};

ScreenReader.defaultProps = {
  children: null,
};

export default withStyles(styles)(ScreenReader);
