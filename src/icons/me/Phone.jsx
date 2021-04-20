import SvgIcon from '@material-ui/core/SvgIcon';
import React from 'react';
import * as PropTypes from 'prop-types';
import colors from '../../themes/colors';
import { ICON_SIZE } from '../../themes/theme';

const Phone = ({ width, height, ...rest }) => (
  <SvgIcon style={{ width, height }} {...rest}>
    <path
      d="M18.1826 23.9989C17.6266 23.9989 17.0666 23.8762 16.5426 23.6256C11.312 21.1189 7.4013 16.8976 7.2373 16.7189C7.10663 16.6029 2.88397 12.6909 0.3773 7.46024C-0.3147 6.01758 -0.0266999 4.29758 1.09063 3.18024L3.74797 0.521578C4.41997 -0.150422 5.59063 -0.150422 6.2613 0.521578L9.89463 4.15491C10.5866 4.84824 10.5866 5.97491 9.89463 6.66691L7.91863 8.64291C7.8573 8.70424 7.84663 8.80291 7.89463 8.86558C8.6413 9.83358 9.4613 10.7656 10.3306 11.6362L12.364 13.6696C13.2293 14.5336 14.1613 15.3549 15.1346 16.1042C15.1973 16.1536 15.296 16.1416 15.3573 16.0816L17.3346 14.1069C18.004 13.4376 19.176 13.4362 19.8466 14.1082L23.4813 17.7429C23.8173 18.0789 24.0013 18.5242 24.0013 19.0002C24.0013 19.4736 23.816 19.9189 23.48 20.2536L20.8226 22.9109C20.1106 23.6242 19.1546 23.9989 18.1826 23.9989ZM5.00397 1.60691C4.95597 1.60691 4.90797 1.62291 4.87863 1.65091L2.2213 4.30958C1.58263 4.94825 1.4213 5.93758 1.81997 6.76958C4.19463 11.7256 8.3253 15.5496 8.36663 15.5869C8.45197 15.6762 12.288 19.8122 17.2333 22.1816C18.064 22.5802 19.0533 22.4176 19.6906 21.7802L22.4013 18.9962C22.4013 18.9642 22.392 18.9136 22.3493 18.8709L18.7146 15.2362C18.6293 15.1509 18.5506 15.1509 18.4666 15.2362L16.4906 17.2122C15.8613 17.8416 14.86 17.9096 14.1586 17.3696C13.1306 16.5776 12.1466 15.7122 11.2333 14.7976L9.19997 12.7669C8.2813 11.8496 7.4173 10.8642 6.62797 9.84291C6.0893 9.14291 6.1573 8.14024 6.78663 7.51224L8.76263 5.53624C8.83197 5.46825 8.83197 5.35491 8.76263 5.28558L5.12797 1.65091C5.09863 1.62291 5.05197 1.60691 5.00397 1.60691Z"
      fill={colors.icon || colors.black}
    />
  </SvgIcon>
);

Phone.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};

Phone.defaultProps = {
  width: ICON_SIZE,
  height: ICON_SIZE,
};

export default Phone;
