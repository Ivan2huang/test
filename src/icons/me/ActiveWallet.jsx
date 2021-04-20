import SvgIcon from '@material-ui/core/SvgIcon';
import React from 'react';
import * as PropTypes from 'prop-types';
import colors from '../../themes/colors';
import { ICON_SIZE } from '../../themes/theme';

const ActiveWallet = ({ width, height, ...rest }) => (
  <SvgIcon style={{ width, height }} viewBox="0 0 18 14" {...rest}>
    <path
      d="M0 0.499756V13.4998H18V0.499756H0ZM8.904 6.18275L9.546 6.38676C10.251 6.60476 11.709 7.06176 11.709 8.66276C11.709 9.81376 10.944 10.6438 9.75 10.9038V11.9998H8.25V10.9348C7.044 10.7248 6.307 9.95076 6.291 8.80175L7.791 8.78076C7.794 8.97676 7.801 9.49875 8.937 9.49875C9.32 9.49875 10.21 9.41776 10.21 8.66375C10.21 8.29575 10.042 8.11176 9.096 7.81776L9.09 7.81576L8.454 7.61276C7.755 7.39576 6.291 6.94076 6.291 5.33676C6.291 4.18576 7.056 3.35576 8.25 3.09576V1.99976H9.75V3.06476C10.956 3.27476 11.693 4.04876 11.709 5.19776L10.209 5.21876C10.206 5.02276 10.199 4.50076 9.063 4.50076C8.68 4.50076 7.79 4.58176 7.79 5.33576C7.791 5.70476 7.959 5.88876 8.904 6.18275Z"
      fill={colors.primary}
    />
  </SvgIcon>
);

ActiveWallet.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};

ActiveWallet.defaultProps = {
  width: ICON_SIZE,
  height: ICON_SIZE,
};

export default ActiveWallet;
