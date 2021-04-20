import SvgIcon from '@material-ui/core/SvgIcon';
import React from 'react';
import * as PropTypes from 'prop-types';
import colors from '../themes/colors';
import { ICON_SIZE } from '../themes/theme';

const Search = ({ width, height, ...rest }) => (
  <SvgIcon style={{ width, height }} {...rest}>
    <path
      d="M2.92924 17.0707C4.88124 19.024 7.44124 20 9.99991 20C12.3092 20 14.6132 19.1973 16.4772 17.608L22.8346 23.964L23.9666 22.8333L17.6092 16.476C20.9599 12.5467 20.7866 6.64133 17.0732 2.928C15.1186 0.976 12.5586 0 9.99991 0C7.44124 0 4.88124 0.976 2.92924 2.92933C-0.976089 6.83467 -0.976089 13.1653 2.92924 17.0707ZM1.59991 10C1.59991 7.756 2.47458 5.64667 4.05991 4.06C5.64524 2.47333 7.75591 1.6 9.99991 1.6C12.2439 1.6 14.3532 2.47333 15.9399 4.06C19.2146 7.33467 19.2146 12.664 15.9399 15.94C14.3532 17.5267 12.2439 18.4 9.99991 18.4C7.75591 18.4 5.64658 17.5267 4.05991 15.94C2.47324 14.3533 1.59991 12.244 1.59991 10Z"
      fill={colors.icon || colors.mediumEmphasis}
    />
  </SvgIcon>
);

Search.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};

Search.defaultProps = {
  width: ICON_SIZE,
  height: ICON_SIZE,
};

export default Search;
