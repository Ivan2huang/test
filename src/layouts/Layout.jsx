import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from 'lodash/get';
import { Box, useTheme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Header from './Header';
import BottomNavBar from './BottomNavBar';
import Footer from './Footer';
import Wallet from './Wallet';

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
      backgroundPositionY: `${props.isWalletsDisabled ? 0 : 54}px`,
    },
    height: 'auto',
    [props.theme.breakpoints.down('sm')]: {
      minHeight: '100vh',
    },
  }),
  main: ({ theme, isWalletsDisabled }) => {
    const walletHeight = isWalletsDisabled ? 0 : 54;
    const unit = walletHeight / theme.unitSpacing;
    return {
      display: 'block',
      maxWidth: '1280px',
      width: '100%',
      boxSizing: 'border-box',
      padding: `0 ${theme.spacingX(8)} ${theme.spacingX(19)}`,
      marginLeft: 'auto',
      marginRight: 'auto',
      [theme.breakpoints.down('sm')]: {
        padding: `0 ${theme.spacingX(8)}`,
        marginTop: theme.spacingX(14 + unit),
        marginBottom: theme.spacingX(20),
      },
      [theme.breakpoints.up('md')]: {
        padding: `0 ${theme.spacingX(8)}`,
        marginTop: theme.spacingX(14 + unit),
        minHeight: `calc(100vh - ${theme.spacingX(38 + unit)})`,
      },
      [theme.breakpoints.up('lg')]: {
        padding: `0 ${theme.spacingX(31)}`,
        marginTop: theme.spacingX(20 + unit),
        minHeight: `calc(100vh - ${theme.spacingX(44 + unit)})`,
      },
    };
  },
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
});

let resizeDebounceTimer;
const resizeDelayTime = 250;

const Layout = ({ options, WrappedComponent, isWalletsDisabled, ...rest }) => {
  const classes = useStyles({ theme: useTheme(), isWalletsDisabled, options });
  const [viewportHeight, setViewportHeight] = useState('auto');

  useEffect(() => {
    const handleResize = () => {
      clearTimeout(resizeDebounceTimer);
      resizeDebounceTimer = setTimeout(() => {
        setViewportHeight(window.innerHeight);
      }, resizeDelayTime);
    };

    if (!options.fullWidth) {
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

  const className = options.fullWidth ? classes.fullWidth : classes.main;

  return (
    <Box
      display="flex"
      flexDirection="column"
      className={`${classes.container}`}
      style={{ height: viewportHeight }}
    >
      <Header />
      <Wallet />
      <main className={className}>
        <WrappedComponent {...rest} />
      </main>
      <Footer />
      <BottomNavBar />
    </Box>
  );
};

Layout.propTypes = {
  WrappedComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
    .isRequired,
  options: PropTypes.exact({
    backgroundImage: PropTypes.string,
    fullWidth: PropTypes.bool,
  }).isRequired,
  isWalletsDisabled: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ benefits }) => {
  const isWalletsDisabled = get(benefits, 'wallets.isWalletsDisabled', false);

  return {
    isWalletsDisabled,
  };
};

export default connect(mapStateToProps)(Layout);
