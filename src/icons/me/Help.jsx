import SvgIcon from '@material-ui/core/SvgIcon';
import React from 'react';
import * as PropTypes from 'prop-types';
import colors from '../../themes/colors';
import { ICON_SIZE } from '../../themes/theme';

const Help = ({ width, height, ...rest }) => (
  <SvgIcon style={{ width, height }} {...rest}>
    <path
      d="M12 0C5.372 0 0 5.37333 0 12C0 18.6267 5.372 24 12 24C18.628 24 24 18.6267 24 12C24 5.37333 18.628 0 12 0ZM12 22.4C6.26533 22.4 1.6 17.7347 1.6 12C1.6 6.26533 6.26533 1.6 12 1.6C17.7347 1.6 22.4 6.26533 22.4 12C22.4 17.7347 17.7347 22.4 12 22.4ZM11.9987 16.6667C11.2627 16.6667 10.6653 17.264 10.6653 18C10.6653 18.736 11.2627 19.3333 11.9987 19.3333C12.7347 19.3333 13.332 18.736 13.332 18C13.332 17.264 12.736 16.6667 11.9987 16.6667ZM12.8053 4.71867C11.6667 4.484 10.5 4.75867 9.60933 5.484C8.72 6.208 8.20933 7.28 8.20933 8.42533H9.80933C9.80933 7.764 10.104 7.144 10.6187 6.72533C11.1413 6.30133 11.8013 6.14267 12.48 6.28533C13.328 6.46267 14.0187 7.188 14.16 8.04933C14.2787 8.76667 14.056 9.468 13.5493 9.97333L12.0173 11.5053C11.6667 11.8587 11.2 12.432 11.2 13.348V14.6667H12.8V13.348C12.8 13.1133 12.856 12.932 13.1493 12.6373L14.68 11.1067C15.556 10.232 15.9413 9.024 15.7387 7.78933C15.488 6.26667 14.3093 5.03333 12.8053 4.71867Z"
      fill={colors.icon || colors.mediumEmphasis}
    />
  </SvgIcon>
);

Help.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};

Help.defaultProps = {
  width: ICON_SIZE,
  height: ICON_SIZE,
};

export default Help;
