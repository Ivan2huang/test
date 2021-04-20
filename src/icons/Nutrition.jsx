import React from 'react';
import * as PropTypes from 'prop-types';

import SvgIcon from '@material-ui/core/SvgIcon';
import { ICON_SIZE } from '../themes/theme';

const Heart = ({ width, height, color, ...rest }) => (
  <SvgIcon style={{ width, height }} {...rest} viewBox="0 0 18 18">
    <path
      d="M14.788 5.4H3.403L3.007 1.8H15.193L14.788 5.4ZM9.1 15.3C8.38392 15.3 7.69716 15.0155 7.19081 14.5092C6.68446 14.0028 6.4 13.3161 6.4 12.6C6.4 10.8 9.1 7.74 9.1 7.74C9.1 7.74 11.8 10.8 11.8 12.6C11.8 13.3161 11.5155 14.0028 11.0092 14.5092C10.5028 15.0155 9.81608 15.3 9.1 15.3ZM1 0L2.8 16.407C2.917 17.307 3.673 18 4.6 18H13.6C14.5 18 15.283 17.307 15.4 16.407L17.2 0H1Z"
      fill={color}
    />
  </SvgIcon>
);

Heart.propTypes = {
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};

Heart.defaultProps = {
  color: '#E9A115',
  width: ICON_SIZE,
  height: ICON_SIZE,
};

export default Heart;
