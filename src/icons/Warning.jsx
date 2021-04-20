import SvgIcon from '@material-ui/core/SvgIcon';
import React from 'react';
import PropTypes from 'prop-types';
import colors from '../themes/colors';
import { ICON_SIZE } from '../themes/theme';

const Warning = ({ width, height, fillColor, fillTextColor, ...rest }) => (
  <SvgIcon style={{ width, height }} {...rest} viewBox="0 0 18 18">
    <path
      d="M9 18C13.9706 18 18 13.9706 18 9C18 4.02944 13.9706 0 9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18Z"
      fill={fillColor || '#FFBB33'}
    />
    <path
      d="M9.00098 6.25C9.69133 6.25 10.251 5.69036 10.251 5C10.251 4.30964 9.69133 3.75 9.00098 3.75C8.31062 3.75 7.75098 4.30964 7.75098 5C7.75098 5.69036 8.31062 6.25 9.00098 6.25Z"
      fill={fillTextColor || colors.icon}
    />
    <path
      d="M9.89997 8.25H8.09998V14.25H9.89997V8.25Z"
      fill={fillTextColor || colors.icon}
    />
  </SvgIcon>
);

Warning.propTypes = {
  fillColor: PropTypes.string,
  fillTextColor: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};

Warning.defaultProps = {
  fillColor: '',
  fillTextColor: '',
  width: ICON_SIZE,
  height: ICON_SIZE,
};

export default Warning;
