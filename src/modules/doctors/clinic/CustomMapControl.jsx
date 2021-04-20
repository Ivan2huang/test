import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { MAP } from 'react-google-maps/lib/constants';
import PropTypes from 'prop-types';

import Box from '@material-ui/core/Box';

const CustomMapControl = ({ position, children }, context) => {
  const map = context[MAP];

  const controlDiv = document.createElement('div');

  useEffect(() => {
    const controls = map.controls[position];
    controls.push(controlDiv);
  });
  return createPortal(<Box>{children}</Box>, controlDiv);
};

CustomMapControl.contextTypes = {
  [MAP]: PropTypes.shape({}),
};

CustomMapControl.propTypes = {
  position: PropTypes.number.isRequired,
  children: PropTypes.element.isRequired,
  context: PropTypes.shape({}),
};

export default CustomMapControl;
