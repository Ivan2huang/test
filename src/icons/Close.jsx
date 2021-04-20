import React from 'react';
import * as PropTypes from 'prop-types';

import SvgIcon from '@material-ui/core/SvgIcon';
import { ICON_SIZE } from '../themes/theme';

const Close = ({ width, height, color, ...rest }) => (
  <SvgIcon style={{ width, height }} {...rest}>
    <path
      d="M18 1.02802L16.972 0L9 7.97198L1.02802 0L0 1.02802L7.97198 9L0 16.972L1.02802 18L9 10.028L16.972 18L18 16.972L10.028 9L18 1.02802Z"
      fill={color}
    />
  </SvgIcon>
);

Close.propTypes = {
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};

Close.defaultProps = {
  color: '#333',
  width: ICON_SIZE,
  height: ICON_SIZE,
};

export default Close;
