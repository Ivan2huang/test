import SvgIcon from '@material-ui/core/SvgIcon';
import React from 'react';
import PropTypes from 'prop-types';
import colors from '../themes/colors';
import { ICON_SIZE } from '../themes/theme';

const Edit = ({ width, height, ...rest }) => (
  <SvgIcon style={{ width, height }} {...rest} viewBox="0 0 18 18">
    <path
      d="M17.368 1.584L16.416 0.632C15.994 0.211 15.441 0 14.889 0C14.337 0 13.784 0.211 13.362 0.632L2.954 11.041L0 18L6.959 15.046L17.368 4.638C18.211 3.795 18.211 2.427 17.368 1.584ZM6.276 14.032L2.265 15.734L3.967 11.723L12.421 3.269L14.729 5.577L6.276 14.032ZM16.519 3.789L15.578 4.73L13.27 2.422L14.211 1.481C14.392 1.3 14.633 1.2 14.889 1.2C15.145 1.2 15.386 1.3 15.567 1.481L16.519 2.433C16.893 2.807 16.893 3.415 16.519 3.789Z"
      fill={colors.icon || colors.black}
    />
  </SvgIcon>
);

Edit.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};

Edit.defaultProps = {
  width: ICON_SIZE,
  height: ICON_SIZE,
};

export default Edit;
