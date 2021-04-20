import React from 'react';
import PropTypes from 'prop-types';

import { Snackbar, SnackbarContent, withStyles } from '@material-ui/core';

import { CloseIcon } from '../icons';
import Typography from './Typography';

const AUTO_HIDE_DURATION = 6000;

const Styles = theme => ({
  snackbarContentRoot: {
    padding: `${theme.spacingX(4)} ${theme.spacingX(6)}`,
  },
  snackbarContentMessage: {
    flex: 1,
    padding: 0,
  },
});

const Toast = ({ open, message, handleClose, classes }) => {
  const styledMessage = (
    <Typography type="style-4" color="white">
      {message}
    </Typography>
  );

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      open={open}
      autoHideDuration={AUTO_HIDE_DURATION}
      onClose={handleClose}
    >
      <SnackbarContent
        message={styledMessage}
        classes={{
          root: classes.snackbarContentRoot,
          message: classes.snackbarContentMessage,
        }}
        action={[
          <CloseIcon
            key="toast-close-icon"
            data-testid="icon-close"
            color="white"
            onClick={handleClose}
          />,
        ]}
      />
    </Snackbar>
  );
};

Toast.propTypes = {
  classes: PropTypes.exact({
    snackbarContentRoot: PropTypes.string.isRequired,
    snackbarContentMessage: PropTypes.string.isRequired,
  }).isRequired,
  open: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default withStyles(Styles)(Toast);
