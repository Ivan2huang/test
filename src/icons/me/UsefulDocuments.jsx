import SvgIcon from '@material-ui/core/SvgIcon';
import React from 'react';
import * as PropTypes from 'prop-types';
import colors from '../../themes/colors';
import { ICON_SIZE } from '../../themes/theme';

const UsefulDocuments = ({ width, height, ...rest }) => (
  <SvgIcon style={{ width, height }} {...rest}>
    <path
      d="M17.5997 0H1.33301V24H22.6663V5.06667L17.5997 0ZM20.4037 5.06667H17.5997V2.26267L20.4037 5.06667ZM21.0663 22.4H2.93301V1.6H15.9997V6.66667H21.0663V22.4Z"
      fill={colors.icon || colors.mediumEmphasis}
    />
  </SvgIcon>
);

UsefulDocuments.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};

UsefulDocuments.defaultProps = {
  width: ICON_SIZE,
  height: ICON_SIZE,
};

export default UsefulDocuments;
