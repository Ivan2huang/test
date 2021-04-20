import React from 'react';
import PropTypes from 'prop-types';
import { Fab } from '@material-ui/core';
import { logAction } from '../helpers/firebase';

const TrackingFab = ({ trackingData, children, ...props }) => {
  const tracking = () => {
    if (trackingData) {
      logAction(trackingData);
    }
  };
  return (
    <Fab {...props} onClick={tracking}>
      {children}
    </Fab>
  );
};

TrackingFab.defaultProps = {
  trackingData: null,
  children: null,
};
TrackingFab.propTypes = {
  children: PropTypes.oneOfType([PropTypes.shape(), PropTypes.string]),
  trackingData: PropTypes.shape({}),
};

export default TrackingFab;
