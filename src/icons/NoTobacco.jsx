import React from 'react';
import * as PropTypes from 'prop-types';

import SvgIcon from '@material-ui/core/SvgIcon';
import { ICON_SIZE } from '../themes/theme';

const NoTobacco = ({ width, height, color, ...rest }) => (
  <SvgIcon style={{ width, height }} {...rest} viewBox="0 0 20 20">
    <rect
      y="19.0476"
      width="26.9374"
      height="1.34687"
      transform="rotate(-45 0 19.0476)"
      fill={color}
    />
    <g clipPath="url(#clip0)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.19793 13.6599H0.897949V16.3536H4.49793L7.19793 13.6599ZM9.10712 13.6599L6.40712 16.3536H14.3979V13.6599H9.10712ZM13.0221 9.75397L14.2503 8.52863C15.6016 8.81876 16.6479 9.90402 16.6479 11.2894V12.762H15.2979V11.5947C15.2979 10.4184 14.4699 9.75397 13.5249 9.75397H13.0221ZM12.4179 8.452L11.2492 9.61803C10.0231 9.23646 9.13295 8.09482 9.13295 6.74597C9.13295 5.08483 10.4829 3.73796 12.1479 3.73796V5.08483C11.2299 5.08483 10.4829 5.7403 10.4829 6.65617C10.4829 7.57205 11.2299 8.452 12.1479 8.452H12.4179ZM15.38 7.40155C16.6657 7.96251 17.5479 9.25855 17.5479 10.7596V12.762H18.8979V10.7507C18.8979 8.88637 17.8903 7.25769 16.383 6.40085L15.38 7.40155ZM16.958 3.9225L13.9479 6.92553V5.75826C14.8659 5.75826 15.6129 5.01299 15.6129 4.09712C15.6129 3.18125 14.8659 2.43598 13.9479 2.43598V1.08911C15.5542 1.08911 16.8673 2.34261 16.958 3.9225ZM18.8979 13.6599H17.5479V16.3536H18.8979V13.6599ZM16.6479 13.6599H15.2979V16.3536H16.6479V13.6599Z"
        fill={color}
      />
    </g>
    <defs>
      <clipPath id="clip0">
        <rect width="18" height="18" fill="white" transform="translate(1 2)" />
      </clipPath>
    </defs>
  </SvgIcon>
);

NoTobacco.propTypes = {
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};

NoTobacco.defaultProps = {
  color: '#00847F',
  width: ICON_SIZE,
  height: ICON_SIZE,
};

export default NoTobacco;
