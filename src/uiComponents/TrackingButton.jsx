import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { logAction } from '../helpers/firebase';

const TrackingButton = ({ trackingData, children, onClick, ...props }) => {
  const tracking = () => {
    if (trackingData) {
      logAction(trackingData);
    }
    if (onClick) {
      onClick();
    }
  };
  return (
    <Button {...props} onClick={tracking}>
      {children}
    </Button>
  );
};

TrackingButton.defaultProps = {
  trackingData: null,
  children: null,
  onClick: null,
};
TrackingButton.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.shape(),
    PropTypes.string,
    PropTypes.element,
    PropTypes.node,
  ]),
  trackingData: PropTypes.shape({}),
};

export default TrackingButton;
