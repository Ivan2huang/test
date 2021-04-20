import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { CircularProgress, Box, withStyles } from '@material-ui/core';

import Typography from '../../uiComponents/Typography';
import ScreenReader from '../../uiComponents/ScreenReader';

const styles = theme => ({
  root: {
    position: 'absolute',
    zIndex: 99999,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    backgroundColor: theme.background,
  },
  container: {
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  progress: {
    color: theme.loader,
  },
});

const Loader = ({
  classes,
  children,
  loading,
  defaultLoading,
  message,
  className,
}) => {
  const [isLoading, setIsLoading] = useState(defaultLoading);
  useEffect(() => {
    setIsLoading(loading);
  }, [loading]);
  return (
    <>
      {isLoading && (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          className={className}
          classes={{ root: classes.root }}
        >
          <CircularProgress className={classes.progress} thickness={2.4} />
          {message && (
            <Box mt={7}>
              <Typography type="style-6">
                <span dangerouslySetInnerHTML={{ __html: message }} />
              </Typography>
            </Box>
          )}
        </Box>
      )}
      <Box
        display={isLoading ? 'none' : 'block'}
        flex={1}
        classes={{ root: classes.container }}
      >
        {children}
      </Box>
      <ScreenReader>
        <Typography role="alert" aria-live="assertive" aria-atomic="true">
          {isLoading && 'The content is loading now'}
        </Typography>
      </ScreenReader>
    </>
  );
};

Loader.defaultProps = {
  message: '',
  className: '',
};

Loader.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.exact({
    root: PropTypes.string.isRequired,
    container: PropTypes.string.isRequired,
    progress: PropTypes.string.isRequired,
  }).isRequired,
  children: PropTypes.node.isRequired,
  loading: PropTypes.bool.isRequired,
  message: PropTypes.string,
  defaultLoading: PropTypes.bool,
};

Loader.defaultProps = {
  defaultLoading: false,
};

export default withStyles(styles)(Loader);
