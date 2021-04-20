import SvgIcon from '@material-ui/core/SvgIcon';
import React from 'react';
import colors from '../themes/colors';

const Dollar = props => (
  <SvgIcon {...props} viewBox="0 0 24 18">
    <path
      d="M0 0.333496V17.6668H24V0.333496H0ZM1.66533 1.99883H11.2V3.95483C9.60933 4.2415 8.58667 5.3015 8.58667 6.78283C8.58667 8.77483 10.376 9.3295 11.332 9.62683L12.1813 9.8975L12.1867 9.90016C13.4627 10.2962 13.812 10.5802 13.812 11.2175C13.812 12.4362 12.36 12.5308 11.9147 12.5308C10.204 12.5308 10.192 11.6628 10.188 11.3762L8.58667 11.4002C8.608 12.8775 9.59067 13.8628 11.1987 14.0828V16.0015H1.66533V1.99883ZM22.3347 16.0015H12.8V14.0455C14.3907 13.7588 15.412 12.6988 15.412 11.2175C15.412 9.2255 13.6227 8.67083 12.6613 8.37083L11.812 8.10016C10.536 7.70416 10.1867 7.42016 10.1867 6.78283C10.1867 5.56416 11.6387 5.4695 12.084 5.4695C13.7947 5.4695 13.8067 6.3375 13.8107 6.62416L15.4107 6.60016C15.392 5.12283 14.4093 4.13883 12.8 3.9175V1.99883H22.3347V16.0015Z"
      fill={colors.icon || colors.black}
    />
  </SvgIcon>
);

export default Dollar;