import React from 'react';
import PropTypes from 'prop-types';

import { CircularProgress, Box } from '@material-ui/core';

import ScreenReader from '../uiComponents/ScreenReader';
import Typography from '../uiComponents/Typography';

const PageLoader = ({ loading }) => {
  return (
    <>
      {loading && (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <CircularProgress size={30} />
        </Box>
      )}
      <ScreenReader>
        <Typography role="alert" aria-live="assertive" aria-atomic="true">
          {loading && 'The content is loading now'}
        </Typography>
      </ScreenReader>
    </>
  );
};

PageLoader.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default PageLoader;
