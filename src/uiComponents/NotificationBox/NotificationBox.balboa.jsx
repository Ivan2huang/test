import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Box from './Box';

const styles = {
  container: {
    borderWidth: 1,
  },
};

const NotificationBox = ({ classes, children, className, ...props }) => {
  return (
    <Box {...props} className={`${classes.container} ${className}`}>
      {children}
    </Box>
  );
};

NotificationBox.defaultProps = {
  className: '',
};

NotificationBox.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default withStyles(styles)(NotificationBox);
