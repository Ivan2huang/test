import SvgIcon from '@material-ui/core/SvgIcon';
import React from 'react';
import * as PropTypes from 'prop-types';
import colors from '../../themes/colors';
import { ICON_SIZE } from '../../themes/theme';

const ActiveSettings = ({ width, height, ...rest }) => (
  <SvgIcon style={{ width, height }} {...rest}>
    <path
      d="M24 13.8027V10.1973L21.8347 9.32267C21.6107 8.49867 21.28 7.69867 20.8453 6.94L21.7587 4.788L19.2107 2.24L17.0587 3.15333C16.3 2.71867 15.5013 2.388 14.6773 2.164L13.8027 0H10.1973L9.32267 2.16533C8.49867 2.388 7.69867 2.72 6.94133 3.15333L4.78933 2.24L2.24 4.78933L3.15333 6.94133C2.72 7.69867 2.388 8.49867 2.16533 9.32267L0 10.1973V13.8013L2.16533 14.676C2.388 15.5013 2.72 16.3 3.15467 17.0587L2.24 19.2107L4.78933 21.76L6.94133 20.8467C7.7 21.2813 8.49867 21.612 9.324 21.836L10.1973 24H13.8013L14.676 21.8347C15.5013 21.612 16.3 21.28 17.0587 20.8453L19.2107 21.7587L21.76 19.2093L20.8467 17.0573C21.2813 16.2987 21.612 15.5 21.836 14.6747L24 13.8027ZM15.7707 15.772C13.688 17.8547 10.3107 17.8547 8.228 15.772C6.14533 13.6893 6.14533 10.312 8.228 8.22933C10.3107 6.14667 13.688 6.14667 15.7707 8.22933C17.8533 10.312 17.8533 13.688 15.7707 15.772Z"
      fill={colors.activatedIcon || colors.primary}
    />
  </SvgIcon>
);

ActiveSettings.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};

ActiveSettings.defaultProps = {
  width: ICON_SIZE,
  height: ICON_SIZE,
};

export default ActiveSettings;
