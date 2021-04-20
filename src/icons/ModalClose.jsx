import SvgIcon from '@material-ui/core/SvgIcon';
import React from 'react';
import * as PropTypes from 'prop-types';
import colors from '../themes/colors';
import { ICON_SIZE } from '../themes/theme';

const Close = ({ width, height, ...rest }) => (
  <SvgIcon style={{ width, height }} {...rest}>
    <path
      d="M21.8987 3.23223L20.768 2.10156L12 10.8696L3.23199 2.10156L2.10132 3.23223L10.8693 12.0002L2.10132 20.7682L3.23199 21.8989L12 13.1309L20.768 21.8989L21.8987 20.7682L13.1307 12.0002L21.8987 3.23223Z"
      fill={colors.icon || colors.black}
    />
  </SvgIcon>
);

Close.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};

Close.defaultProps = {
  width: ICON_SIZE,
  height: ICON_SIZE,
};

export default Close;
