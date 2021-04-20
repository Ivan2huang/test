import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from './Dropdown';
import { logAction } from '../helpers/firebase';

const TrackingDropdown = ({ getTrackingData, onChange, ...props }) => {
  const tracking = ev => {
    const trackingData = getTrackingData(ev);
    if (trackingData) {
      logAction(trackingData);
    }
    onChange(ev);
  };
  return <Dropdown {...props} onChange={tracking} />;
};
TrackingDropdown.defaultProps = {
  onChange: null,
};
TrackingDropdown.propTypes = {
  onChange: PropTypes.func,
  getTrackingData: PropTypes.func.isRequired,
};

export default TrackingDropdown;
