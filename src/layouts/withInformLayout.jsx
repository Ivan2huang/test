import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, useTheme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import HeaderBrand from '../uiComponents/HeaderBrand';
import Footer from './Footer';

const useStyles = makeStyles({
  container: props => ({
    backgroundColor: `${props.theme.background} `,
    [props.theme.breakpoints.up('md')]: {
      backgroundImage: `${
        props.options.backgroundImage
          ? `url(${props.options.backgroundImage})`
          : ''
      }`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right top',
    },
    height: 'auto',
    minHeight: '100vh',
  }),
  main: ({ theme }) => ({
    display: 'block',
    maxWidth: '1280px',
    width: '100%',
    boxSizing: 'border-box',
    padding: `0 ${theme.spacingX(8)} ${theme.spacingX(19)}`,
    marginLeft: 'auto',
    marginRight: 'auto',
    [theme.breakpoints.down('sm')]: {
      padding: `0 ${theme.spacingX(8)}`,
      marginTop: theme.spacingX(14),
      marginBottom: theme.spacingX(20),
    },
    [theme.breakpoints.up('md')]: {
      padding: `0 ${theme.spacingX(8)}`,
      marginTop: theme.spacingX(14),
      marginBottom: theme.spacingX(6),
    },
    [theme.breakpoints.up('lg')]: {
      padding: `0 ${theme.spacingX(31)}`,
      marginBottom: theme.spacingX(10),
      marginTop: theme.spacingX(20),
    },
  }),
  fullWidth: ({ theme }) => ({
    width: '100%',
    height: `calc(100% - ${theme.spacingX(19)})`,
    marginTop: theme.spacingX(20),
    [theme.breakpoints.up('md')]: {
      height: `calc(100% - ${theme.spacingX(24)})`,
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacingX(14),
    },
  }),
  headerContainer: ({ theme }) => ({
    position: 'fixed',
    padding: `${theme.spacingX(6)} 0`,
    [theme.breakpoints.down('sm')]: {
      position: 'static',
      padding: `${theme.spacingX(8)} ${theme.spacingX(8)} 0`,
    },
  }),
});

const defaultOptions = {};
let resizeDebounceTimer;
const resizeDelayTime = 250;

const withLayout = (WrappedComponent, options = defaultOptions) => ({
  ...rest
}) => {
  const classes = useStyles({ theme: useTheme(), options });
  const [viewportHeight, setViewportHeight] = useState('auto');
  const { fullWidth = false, showHeaderBrand = true } = options;

  useEffect(() => {
    const handleResize = () => {
      clearTimeout(resizeDebounceTimer);
      resizeDebounceTimer = setTimeout(() => {
        setViewportHeight(window.innerHeight);
      }, resizeDelayTime);
    };

    if (!fullWidth) {
      return;
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    // eslint-disable-next-line consistent-return
    return () => {
      clearTimeout(resizeDebounceTimer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      className={`${classes.container}`}
      style={{ height: viewportHeight }}
    >
      {showHeaderBrand && (
        <Box className={classes.headerContainer}>
          <HeaderBrand />
        </Box>
      )}
      <main className={fullWidth ? classes.fullWidth : classes.main}>
        <WrappedComponent {...rest} />
      </main>
      <Footer />
    </Box>
  );
};

withLayout.propTypes = {
  WrappedComponent: PropTypes.func.isRequired,
  options: PropTypes.exact({
    backgroundImage: PropTypes.string,
    fullWidth: PropTypes.bool,
    showHeaderBrand: PropTypes.bool,
  }),
};

export default withLayout;
