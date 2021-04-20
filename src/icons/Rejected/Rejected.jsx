import SvgIcon from '@material-ui/core/SvgIcon';
import React from 'react';
import * as PropTypes from 'prop-types';
import colors from '../../themes/colors';
import { ICON_SIZE } from '../../themes/theme';

const Rejected = ({ width, height, ...rest }) => (
  <SvgIcon style={{ width, height }} {...rest} viewBox="0 0 18 18">
    <path
      d="M15.1787 8.06756L12 11.2462L8.82133 8.06756L8.06756 8.82133L11.2462 12L8.06756 15.1787L8.82222 15.9324L12 12.7538L15.1787 15.9324L15.9333 15.1787L12.7538 12L15.9324 8.82133L15.1787 8.06756ZM12 4C7.58133 4 4 7.58222 4 12C4 16.4178 7.58133 20 12 20C16.4187 20 20 16.4178 20 12C20 7.58222 16.4187 4 12 4ZM12 18.9333C8.17689 18.9333 5.06667 15.8231 5.06667 12C5.06667 8.17689 8.17689 5.06667 12 5.06667C15.8231 5.06667 18.9333 8.17689 18.9333 12C18.9333 15.8231 15.8231 18.9333 12 18.9333Z"
      fill={colors.activatedIcon || colors.primary}
    />
  </SvgIcon>
);

Rejected.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};

Rejected.defaultProps = {
  width: ICON_SIZE,
  height: ICON_SIZE,
};

export default Rejected;
