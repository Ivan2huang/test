import SvgIcon from '@material-ui/core/SvgIcon';
import React from 'react';
import * as PropTypes from 'prop-types';
import colors from '../themes/colors';
import { ICON_SIZE } from '../themes/theme';

const ActiveLifestyle = ({ width, height, ...rest }) => (
  <SvgIcon style={{ width, height }} {...rest}>
    <path
      d="M21.3134 4.11737C19.0657 1.86973 15.4199 1.86973 13.1722 4.11737C12.665 4.62458 12.2788 5.20513 12.0002 5.82357C11.7215 5.20513 11.3353 4.62458 10.8268 4.11737C8.5792 1.86973 4.93336 1.86973 2.68573 4.11737C0.438091 6.365 0.438091 10.0096 2.68573 12.2573L12.0002 21.5692L21.3134 12.256C23.5622 10.0096 23.5622 6.365 21.3134 4.11737ZM11.2253 15.0292L7.56599 11.3699L8.86275 10.0732L11.2265 12.4369L16.2938 7.36965L17.5905 8.66641L11.2253 15.0292Z"
      fill={colors.activatedIcon || colors.primary}
    />
  </SvgIcon>
);

ActiveLifestyle.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};

ActiveLifestyle.defaultProps = {
  width: ICON_SIZE,
  height: ICON_SIZE,
};

export default ActiveLifestyle;
