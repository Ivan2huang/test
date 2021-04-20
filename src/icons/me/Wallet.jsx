import SvgIcon from '@material-ui/core/SvgIcon';
import React from 'react';
import * as PropTypes from 'prop-types';
import colors from '../../themes/colors';
import { ICON_SIZE } from '../../themes/theme';

const Wallet = ({ width, height, ...rest }) => (
  <SvgIcon style={{ width, height }} viewBox="0 0 18 14" {...rest}>
    <path
      d="M0 0.499756V13.4998H18V0.499756H0ZM1.249 1.74876H8.4V3.21576C7.207 3.43076 6.44 4.22576 6.44 5.33676C6.44 6.83076 7.782 7.24676 8.499 7.46976L9.136 7.67276L9.14 7.67476C10.097 7.97176 10.359 8.18476 10.359 8.66276C10.359 9.57676 9.27 9.64775 8.936 9.64775C7.653 9.64775 7.644 8.99675 7.641 8.78175L6.44 8.79976C6.456 9.90776 7.193 10.6468 8.399 10.8118V12.2508H1.249V1.74876ZM16.751 12.2508H9.6V10.7838C10.793 10.5688 11.559 9.77376 11.559 8.66276C11.559 7.16876 10.217 6.75276 9.496 6.52776L8.859 6.32476C7.902 6.02776 7.64 5.81476 7.64 5.33676C7.64 4.42276 8.729 4.35176 9.063 4.35176C10.346 4.35176 10.355 5.00276 10.358 5.21776L11.558 5.19976C11.544 4.09176 10.807 3.35376 9.6 3.18776V1.74876H16.751V12.2508Z"
      fill={colors.icon}
    />
  </SvgIcon>
);

Wallet.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};

Wallet.defaultProps = {
  width: ICON_SIZE,
  height: ICON_SIZE,
};

export default Wallet;
