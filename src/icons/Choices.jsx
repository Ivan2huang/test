import SvgIcon from '@material-ui/core/SvgIcon';
import React from 'react';
import * as PropTypes from 'prop-types';
import colors from '../themes/colors';
import { ICON_SIZE } from '../themes/theme';

const Choices = ({ width, height, ...rest }) => (
  <SvgIcon style={{ width, height }} {...rest}>
    <path
      d="M19.3333 18.1106H6.33011L7.31767 15.6661H18.8004L23 5.27724H3.80378L2.56811 2.22168H1V2.25346L6.07956 14.8191L4.74856 18.1106H4.05556C3.04356 18.1106 2.22222 18.9319 2.22222 19.9439C2.22222 20.9559 3.04356 21.7772 4.05556 21.7772C5.06756 21.7772 5.88889 20.9559 5.88889 19.9439C5.88889 19.818 5.87667 19.6958 5.85222 19.5772H17.5379C17.5134 19.6958 17.5012 19.818 17.5012 19.9439C17.5012 20.9559 18.3226 21.7772 19.3346 21.7772C20.3466 21.7772 21.1679 20.9559 21.1679 19.9439C21.1679 18.9319 20.3453 18.1106 19.3333 18.1106ZM20.6888 6.83557L17.7493 14.1078H7.47167L4.53222 6.83557H20.6888Z"
      fill={colors.icon || colors.black}
    />
  </SvgIcon>
);

Choices.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};

Choices.defaultProps = {
  width: ICON_SIZE,
  height: ICON_SIZE,
};

export default Choices;
