import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress, Box, withStyles } from '@material-ui/core';

import Typography from '../../uiComponents/Typography';

const styles = theme => ({
  root: {
    flex: 1,
    backgroundColor: theme.background,
    [theme.breakpoints.up('md')]: {
      backgroundColor: 'transparent',
    },
  },
  container: {
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  message: {
    textAlign: 'center',
  },
});

const Loading = ({ classes, message, className }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      className={className}
      classes={{ root: classes.root }}
    >
      <CircularProgress />
      {message && (
        <Box mt={7}>
          <Typography className={classes.message} type="style-6">
            {message}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

Loading.defaultProps = {
  message: '',
  className: '',
};

Loading.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.exact({
    root: PropTypes.string.isRequired,
    container: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  }).isRequired,
  message: PropTypes.string,
};

export default withStyles(styles)(Loading);
