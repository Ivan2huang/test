import React from 'react';
import PropTypes from 'prop-types';

import SvgIcon from '@material-ui/core/SvgIcon';

const MasterCard = ({ fillColor, ...rest }) => (
  <SvgIcon {...rest} viewBox="0 0 20 16">
    <path
      d="M2 0C0.895 0 0 0.895 0 2V14C0 15.105 0.895 16 2 16H18C19.105 16 20 15.105 20 14V2C20 0.895 19.105 0 18 0H2ZM8 4C8.733 4 9.41195 4.21069 10.002 4.55469C10.593 4.21169 11.269 4 12 4C14.206 4 16 5.794 16 8C16 10.206 14.206 12 12 12C11.269 12 10.593 11.7893 10.002 11.4453C9.41195 11.7893 8.733 12 8 12C5.791 12 4 10.209 4 8C4 5.791 5.791 4 8 4ZM12 6C11.821 6 11.6513 6.03022 11.4863 6.07422C11.8043 6.64822 12 7.298 12 8C12 8.702 11.8043 9.35178 11.4863 9.92578C11.6513 9.96978 11.821 10 12 10C13.103 10 14 9.103 14 8C14 6.897 13.103 6 12 6Z"
      fill={fillColor}
    />
  </SvgIcon>
);

MasterCard.defaultProps = {
  fillColor: '#666666',
};

MasterCard.propTypes = {
  fillColor: PropTypes.string,
};

export default MasterCard;
