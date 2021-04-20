import SvgIcon from '@material-ui/core/SvgIcon';
import React from 'react';
import * as PropTypes from 'prop-types';
import { ICON_SIZE } from '../../themes/theme';

const Approved = ({ width, height, ...rest }) => (
  <SvgIcon style={{ width, height }} {...rest} viewBox="0 0 18 18">
    <path
      d="M12 4C7.58222 4 4 7.58133 4 12C4 16.4187 7.58222 20 12 20C16.4178 20 20 16.4187 20 12C20 7.58133 16.4178 4 12 4ZM12 18.9333C8.17689 18.9333 5.06667 15.8231 5.06667 12C5.06667 8.17689 8.17689 5.06667 12 5.06667C15.8231 5.06667 18.9333 8.17689 18.9333 12C18.9333 15.8231 15.8231 18.9333 12 18.9333Z"
      fill="#00847F"
    />
    <path
      d="M16.44 9.42044L15.6853 8.66667L10.648 13.7031L8.55467 11.6107L7.8 12.3653L10.648 15.2116L16.44 9.42044Z"
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
