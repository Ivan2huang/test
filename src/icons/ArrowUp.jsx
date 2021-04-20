import React from 'react';
import * as PropTypes from 'prop-types';

import SvgIcon from '@material-ui/core/SvgIcon';
import { ICON_SIZE } from '../themes/theme';

const ArrowUp = ({ width, height, ...rest }) => (
  <SvgIcon style={{ width, height }} {...rest}>
    <path
      d="M19.332 8.80153L10.9987 0.46582L2.66536 8.80153L2.66536 10.8206L10.2844 3.20153L10.2844 21.7146L11.713 21.7146L11.713 3.20153L19.332 10.8206L19.332 8.80153Z"
      fill="white"
    />
  </SvgIcon>
);

ArrowUp.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};

ArrowUp.defaultProps = {
  width: ICON_SIZE,
  height: ICON_SIZE,
};

export default ArrowUp;
