import React from 'react';
import PropTypes from 'prop-types';
import { Tab } from '@material-ui/core';
import { logAction } from '../helpers/firebase';

const TrackingTab = ({ trackingData, ...props }) => {
  const tracking = () => {
    if (trackingData) {
      logAction(trackingData);
    }
  };
  return <Tab {...props} onClick={tracking} />;
};

TrackingTab.defaultProps = {
  trackingData: null,
};
TrackingTab.propTypes = {
  trackingData: PropTypes.shape({}),
};

export default TrackingTab;
