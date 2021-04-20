import SvgIcon from '@material-ui/core/SvgIcon';
import React from 'react';
import * as PropTypes from 'prop-types';
import colors from '../themes/colors';
import { ICON_SIZE } from '../themes/theme';

const FilterInactive = ({ width, height, ...rest }) => (
  <SvgIcon style={{ width, height }} {...rest}>
    <path
      d="M6.97333 17.2002C5.40933 17.2002 4.10667 18.2815 3.74667 19.7335H0V21.3335H3.74667C4.10667 22.7855 5.40933 23.8669 6.97333 23.8669C8.53733 23.8669 9.84 22.7855 10.1987 21.3335H24V19.7335H10.1987C9.84 18.2815 8.53733 17.2002 6.97333 17.2002ZM6.97333 22.2669C6.01733 22.2669 5.24 21.4895 5.24 20.5335C5.24 19.5775 6.01733 18.8002 6.97333 18.8002C7.92933 18.8002 8.70667 19.5775 8.70667 20.5335C8.70667 21.4895 7.92933 22.2669 6.97333 22.2669ZM17.0267 9.20019C15.4627 9.20019 14.16 10.2815 13.8013 11.7335H0V13.3335H13.8013C14.1613 14.7855 15.464 15.8669 17.0267 15.8669C18.5907 15.8669 19.8933 14.7855 20.2533 13.3335H24V11.7335H20.2533C19.8933 10.2815 18.5907 9.20019 17.0267 9.20019ZM17.0267 14.2669C16.0707 14.2669 15.2933 13.4895 15.2933 12.5335C15.2933 11.5775 16.0707 10.8002 17.0267 10.8002C17.9827 10.8002 18.76 11.5775 18.76 12.5335C18.76 13.4895 17.9827 14.2669 17.0267 14.2669ZM10.1987 3.73353C9.84 2.28153 8.53733 1.2002 6.97333 1.2002C5.40933 1.2002 4.10667 2.28153 3.74667 3.73353H0V5.33353H3.74667C4.10667 6.78553 5.40933 7.86686 6.97333 7.86686C8.53733 7.86686 9.84 6.78553 10.1987 5.33353H24V3.73353H10.1987ZM6.97333 6.26686C6.01733 6.26686 5.24 5.48953 5.24 4.53353C5.24 3.57753 6.01733 2.8002 6.97333 2.8002C7.92933 2.8002 8.70667 3.57753 8.70667 4.53353C8.70667 5.48953 7.92933 6.26686 6.97333 6.26686Z"
      fill={colors.icon || colors.mediumEmphasis}
    />
  </SvgIcon>
);

FilterInactive.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};

FilterInactive.defaultProps = {
  width: ICON_SIZE,
  height: ICON_SIZE,
};

export default FilterInactive;
