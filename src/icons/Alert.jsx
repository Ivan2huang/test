import React from 'react';
import * as PropTypes from 'prop-types';

import { SvgIcon } from '@material-ui/core';
import { ICON_SIZE } from '../themes/theme';

const Alert = ({ width, height, ...rest }) => (
  <SvgIcon style={{ width, height }} {...rest} viewBox="0 0 18 18">
    <path
      d="M8.30911 1.68243L0.109113 15.8004C-0.199887 16.3324 0.184113 17.0004 0.800113 17.0004H17.2001C17.8161 17.0004 18.2001 16.3324 17.8911 15.8004L9.69111 1.68243C9.38311 1.15143 8.61711 1.15143 8.30911 1.68243Z"
      fill="#A8000B"
    />
    <path d="M9.89997 5H8.09998V11H9.89997V5Z" fill="white" />
    <path
      d="M9 14.826C9.69036 14.826 10.25 14.2663 10.25 13.576C10.25 12.8856 9.69036 12.326 9 12.326C8.30964 12.326 7.75 12.8856 7.75 13.576C7.75 14.2663 8.30964 14.826 9 14.826Z"
      fill="white"
    />
  </SvgIcon>
);

Alert.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};

Alert.defaultProps = {
  width: ICON_SIZE,
  height: ICON_SIZE,
};

export default Alert;
