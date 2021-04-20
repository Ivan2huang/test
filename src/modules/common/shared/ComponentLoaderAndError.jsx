import React from 'react';
import { Box, withStyles } from '@material-ui/core';
import * as PropTypes from 'prop-types';

import Loader from '../../loader/Loader';
import Error from './Error';

const Styles = theme => ({
  container: {
    minHeight: theme.spacingX(40),
  },
  loader: {
    backgroundColor: theme.white,
  },
});

const ComponentLoaderAndError = ({
  classes,
  children,
  loading,
  errorState,
}) => (
  <Box display="flex" className={classes.container}>
    <Loader loading={loading} className={classes.loader}>
      <Box display="flex" className={classes.container}>
        <Error errorState={errorState}>{children}</Error>
      </Box>
    </Loader>
  </Box>
);

ComponentLoaderAndError.propTypes = {
  classes: PropTypes.shape({
    container: PropTypes.string.isRequired,
    loader: PropTypes.string.isRequired,
  }).isRequired,
  children: PropTypes.node.isRequired,
  loading: PropTypes.bool.isRequired,
  errorState: PropTypes.bool.isRequired,
};

export default withStyles(Styles)(ComponentLoaderAndError);
