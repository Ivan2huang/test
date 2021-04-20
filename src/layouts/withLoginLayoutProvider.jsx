import React from 'react';
import PropTypes from 'prop-types';

import { Box, useTheme, Hidden } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import CONFIG from '../constants/config';
import Grid from '../uiComponents/Grid';
import GridItem from '../uiComponents/GridItem';
import HeaderBrand from '../uiComponents/HeaderBrand';
import { LoaderContainer } from '../modules/loader';
import Footer from './Footer';

const useStyles = makeStyles({
  container: ({ theme, options: { backgroundImage } }) => {
    const containerBackgrounds = {
      balboa: theme.background,
      basil: theme.background,
      cendol: theme.backgroundGradient,
    };

    const backgroundColor = () =>
      containerBackgrounds[CONFIG.themeCode] || theme.background;

    return {
      background: backgroundColor(),
      [theme.breakpoints.up('md')]: {
        backgroundSize: 'auto 100%',
        background: `url(${backgroundImage}) left center no-repeat, ${backgroundColor()}`,
      },
      height: '100vh',
    };
  },
  main: ({ theme }) => {
    const padding = {
      ginger: `${theme.spacingX(22)} ${theme.spacingX(40)}`,
    };
    return {
      flex: 1,
      maxWidth: '1280px',
      margin: '0 auto',
      width: '100%',
      display: 'block',
      boxSizing: 'border-box',
      padding: theme.spacingX(8),
      [theme.breakpoints.up('sm')]: {
        padding: theme.spacingX(32),
      },
      [theme.breakpoints.up('md')]: {
        padding: padding[CONFIG.themeCode] || theme.spacingX(40),
      },
    };
  },
  headerContainer: ({ theme }) => ({
    position: 'fixed',
    padding: `${theme.spacingX(6)} 0`,
    [theme.breakpoints.down('sm')]: {
      position: 'static',
      padding: `${theme.spacingX(8)} ${theme.spacingX(8)} 0`,
    },
  }),
  footerContainer: ({ theme, options: { displayFooter = {} } }) => {
    const display = {
      balboa: 'block',
      basil: 'block',
      ginger: 'block',
      default: 'none',
      core: 'block',
    };

    const mergeDisplay = { ...display, ...displayFooter };

    return {
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: '100%',
      boxSizing: 'border-box',
      [`${theme.breakpoints.down('md')}`]: {
        position: 'static',
      },
      [`${theme.breakpoints.down('sm')} and (orientation: portrait)`]: {
        position: 'absolute',
      },
      display: mergeDisplay[CONFIG.themeCode] || mergeDisplay.default,
    };
  },
  illustrationWrapper: {
    textAlign: 'center',
  },
  illustration: ({ theme, options: { illustrationDesktopOnly } }) => ({
    maxWidth: '100%',
    [`${theme.breakpoints.down('sm')}`]: {
      marginTop: theme.spacingX(4),
      marginBottom: theme.spacingX(4),
      maxWidth: 250,
      display: illustrationDesktopOnly ? 'none' : 'inline-block',
    },
  }),
});

const withLoginLayout = (WrappedComponent, options) => () => {
  const classes = useStyles({ theme: useTheme(), options });
  const {
    isDarkLogo,
    contentOffset,
    contentColumns,
    showHeaderBrand,
    hideHeaderBrandOnDesktop = false,
    displayFooterMobile,
    illustration,
    illustrationAlignment = 'center',
    illustrationMobile,
  } = options;

  const renderDesktopView = () => {
    return (
      <Grid>
        <GridItem
          offset={contentOffset || { sm: 2, md: 7 }}
          columns={contentColumns || { xs: 12, sm: 8, md: 4 }}
        >
          <WrappedComponent />
        </GridItem>
      </Grid>
    );
  };

  const renderIllustrationView = imgSrc => {
    return (
      <Grid alignItems={illustrationAlignment}>
        <GridItem
          className={classes.illustrationWrapper}
          offset={{ md: 1 }}
          columns={{ xs: 12, sm: 6, md: 5 }}
        >
          <img className={classes.illustration} src={imgSrc} alt="error" />
        </GridItem>
        <GridItem columns={{ xs: 12, sm: 6, md: 5 }}>
          <WrappedComponent />
        </GridItem>
      </Grid>
    );
  };

  const renderContent = () => {
    if (illustration) {
      return renderIllustrationView(illustration);
    }
    if (illustrationMobile) {
      return (
        <>
          <Hidden smDown>{renderDesktopView()}</Hidden>
          <Hidden mdUp>{renderIllustrationView(illustrationMobile)}</Hidden>
        </>
      );
    }

    return renderDesktopView();
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      classes={{ root: classes.container }}
    >
      <LoaderContainer defaultLoading>
        <>
          {showHeaderBrand && (
            <Hidden mdUp={hideHeaderBrandOnDesktop}>
              <Box className={classes.headerContainer}>
                <HeaderBrand isDarkLogo={isDarkLogo} />
              </Box>
            </Hidden>
          )}
          <main className={classes.main}>{renderContent()}</main>
          <Box classes={{ root: classes.footerContainer }}>
            <Footer displayMobile={displayFooterMobile} />
          </Box>
        </>
      </LoaderContainer>
    </Box>
  );
};

withLoginLayout.propTypes = {
  WrappedComponent: PropTypes.func.isRequired,
  options: PropTypes.exact({
    backgroundImage: PropTypes.string,
  }).isRequired,
};

export default withLoginLayout;
