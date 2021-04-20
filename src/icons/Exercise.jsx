import React from 'react';
import * as PropTypes from 'prop-types';

import SvgIcon from '@material-ui/core/SvgIcon';
import { ICON_SIZE } from '../themes/theme';

const Exercise = ({ width, height, color, ...rest }) => (
  <SvgIcon style={{ width, height }} {...rest} viewBox="0 0 18 18">
    <path
      d="M4 0C4 2.31429 5.33714 4.42286 7.42857 5.41714V18H9.14286V12H10.8571V18H12.5714V5.40857C14.6629 4.42286 16 2.31429 16 0H14.2857C14.2857 1.13664 13.8342 2.22673 13.0305 3.03046C12.6325 3.42842 12.16 3.74411 11.6401 3.95948C11.1201 4.17486 10.5628 4.28571 10 4.28571C8.86336 4.28571 7.77327 3.83419 6.96954 3.03046C6.16582 2.22673 5.71429 1.13664 5.71429 0H4ZM10 0C9.04857 0 8.28571 0.762857 8.28571 1.71429C8.28571 2.66571 9.04857 3.42857 10 3.42857C10.9514 3.42857 11.7143 2.66571 11.7143 1.71429C11.7143 0.762857 10.9514 0 10 0Z"
      fill={color}
    />
  </SvgIcon>
);

Exercise.propTypes = {
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};

Exercise.defaultProps = {
  color: '#E9A115',
  width: ICON_SIZE,
  height: ICON_SIZE,
};

export default Exercise;
