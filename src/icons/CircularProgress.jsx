import React from 'react';

import { CircularProgress, withStyles } from '@material-ui/core';

const Styles = theme => ({
  root: {
    color: theme.primary,
  },
});

const StyledCircularProgress = props => (
  <CircularProgress size={24} {...props} />
);

export default withStyles(Styles)(StyledCircularProgress);
