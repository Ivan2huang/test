import SvgIcon from '@material-ui/core/SvgIcon';
import React from 'react';
import * as PropTypes from 'prop-types';
import colors from '../../themes/colors';
import { ICON_SIZE } from '../../themes/theme';

const ActiveHelp = ({ width, height, ...rest }) => (
  <SvgIcon style={{ width, height }} {...rest}>
    <path
      d="M12 0C5.372 0 0 5.372 0 12C0 18.628 5.372 24 12 24C18.628 24 24 18.628 24 12C24 5.372 18.628 0 12 0ZM11.9987 19.3333C11.0787 19.3333 10.332 18.5867 10.332 17.6667C10.332 16.7467 11.0787 16 11.9987 16C12.9187 16 13.6653 16.7467 13.6653 17.6667C13.6653 18.5867 12.92 19.3333 11.9987 19.3333ZM14.9627 11.3893L13.432 12.9187C13.2 13.152 13.2 13.2387 13.2 13.348V14.6667H10.8V13.348C10.8 12.284 11.3333 11.6253 11.7333 11.2227L13.2667 9.692C13.6813 9.27867 13.8627 8.704 13.7653 8.11333C13.6507 7.412 13.088 6.82133 12.3987 6.67733C11.84 6.56133 11.3 6.688 10.872 7.03733C10.4507 7.37867 10.2093 7.88533 10.2093 8.42533H7.80933C7.80933 7.15867 8.37333 5.97333 9.35733 5.17467C10.3413 4.37333 11.632 4.06933 12.888 4.328C14.552 4.676 15.856 6.04 16.1333 7.724C16.3573 9.08667 15.9307 10.4227 14.9627 11.3893Z"
      fill={colors.activatedIcon || colors.primary}
    />
  </SvgIcon>
);

ActiveHelp.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};

ActiveHelp.defaultProps = {
  width: ICON_SIZE,
  height: ICON_SIZE,
};

export default ActiveHelp;
