import SvgIcon from '@material-ui/core/SvgIcon';
import React from 'react';
import * as PropTypes from 'prop-types';
import colors from '../themes/colors';
import { ICON_SIZE } from '../themes/theme';

const FilterActive = ({ width, height, ...rest }) => (
  <SvgIcon style={{ width, height }} {...rest}>
    <path
      d="M6.97333 16.667C5.60667 16.667 4.436 17.491 3.92133 18.667H0V21.3337H3.92133C4.436 22.5097 5.60667 23.3337 6.97333 23.3337C8.34 23.3337 9.51067 22.5097 10.0253 21.3337H24V18.667H10.0253C9.51067 17.491 8.34 16.667 6.97333 16.667ZM10.0253 2.66699C9.51067 1.49099 8.34 0.666992 6.97333 0.666992C5.60667 0.666992 4.436 1.49099 3.92133 2.66699H0V5.33366H3.92133C4.436 6.50966 5.60667 7.33366 6.97333 7.33366C8.34 7.33366 9.51067 6.50966 10.0253 5.33366H24V2.66699H10.0253ZM17.0267 8.66699C15.66 8.66699 14.4893 9.49099 13.9747 10.667H0V13.3337H13.9747C14.4893 14.5097 15.66 15.3337 17.0267 15.3337C18.3933 15.3337 19.564 14.5097 20.0787 13.3337H24V10.667H20.0787C19.564 9.49099 18.3933 8.66699 17.0267 8.66699Z"
      fill={colors.activatedIcon || colors.primary}
    />
  </SvgIcon>
);

FilterActive.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};

FilterActive.defaultProps = {
  width: ICON_SIZE,
  height: ICON_SIZE,
};

export default FilterActive;
