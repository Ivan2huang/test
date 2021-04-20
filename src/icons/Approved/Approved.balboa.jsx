import SvgIcon from '@material-ui/core/SvgIcon';
import React from 'react';
import * as PropTypes from 'prop-types';
import { ICON_SIZE } from '../../themes/theme';

const Approved = ({ width, height, ...rest }) => (
  <SvgIcon style={{ width, height }} {...rest} viewBox="0 0 18 18">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9 0C4.05 0 0 4.05 0 9C0 13.95 4.05 18 9 18C13.95 18 18 13.95 18 9C18 4.05 13.95 0 9 0ZM7.19971 13.4996L2.69971 8.99965L3.95971 7.73965L7.19971 10.9796L14.0397 4.13965L15.2997 5.39965L7.19971 13.4996Z"
      fill="#00847F"
    />
  </SvgIcon>
);

Approved.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};

Approved.defaultProps = {
  width: ICON_SIZE,
  height: ICON_SIZE,
};

export default Approved;
