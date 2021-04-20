import React from 'react';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { Box, withStyles, useTheme } from '@material-ui/core';
import { navigateTo } from '../helpers/helpers';
import paths from '../helpers/paths';
import CONFIG from '../constants/config';

const styles = theme => ({
  imgContainer: () => {
    const padding = {
      ginger: '0',
    };

    const margin = {
      ginger: '0',
    };

    return {
      cursor: 'pointer',
      background: 'transparent',
      border: 'none',
      [theme.breakpoints.down('md')]: {
        padding: padding[CONFIG.themeCode] || 'unset',
        margin: margin[CONFIG.themeCode] || 'auto',
      },
    };
  },
  img: () => {
    let imageStyled = {
      outline: 'unset',
      height: theme.spacingX(6),
      [theme.breakpoints.down('sm')]: {
        height: theme.spacingX(6),
        paddingLeft: theme.spacingX(0),
      },
      [theme.breakpoints.up('sm')]: {
        height: theme.spacingX(8),
        paddingLeft: theme.spacingX(10),
      },
    };

    if (CONFIG.themeCode === 'ginger') {
      imageStyled = {
        ...imageStyled,
        [theme.breakpoints.down('md')]: {
          width: '132px',
          height: '38px',
          marginLeft: '-10px',
        },
      };
    }

    return imageStyled;
  },
});

const HeaderBrand = ({ intl, classes, isDarkLogo }) => {
  const theme = useTheme();
  const logo = (isDarkLogo && theme.darkLogo) || theme.logo;
  return (
    <Box
      component="button"
      classes={{ root: classes.imgContainer }}
      onClick={() => navigateTo(paths.common.default)}
      data-testid="link-logo"
      tabIndex={0}
    >
      <img
        src={logo[intl.locale] || theme.logo}
        alt=""
        className={classes.img}
      />
    </Box>
  );
};

HeaderBrand.propTypes = {
  intl: PropTypes.shape({}).isRequired,
  classes: PropTypes.exact({
    imgContainer: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
  }).isRequired,
  isDarkLogo: PropTypes.bool,
};

HeaderBrand.defaultProps = {
  isDarkLogo: false,
};

export default compose(
  injectIntl,
  withStyles(styles),
)(HeaderBrand);
