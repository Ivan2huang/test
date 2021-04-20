import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { Box, withStyles } from '@material-ui/core';
import NavBar from './NavBar';
import PageLoader from './pageLoader';
import { loaderDetail } from '../modules/loader/util';
import LOADER from '../constants/loader';
import HeaderBrand from '../uiComponents/HeaderBrand';

export const style = theme => ({
  boxRoot: {
    position: 'fixed',
    zIndex: '10000',
    width: '100%',
    minHeight: theme.spacingX(20),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: theme.headerBackground || theme.highEmphasis,
    boxShadow: `0 1px 0 ${theme.grey1}`,
    marginBottom: theme.spacingX(40),
    [theme.breakpoints.down('sm')]: {
      paddingRight: theme.spacingX(10),
      paddingLeft: theme.spacingX(8),
      minHeight: theme.spacingX(14),
    },
  },
  loaderContainer: {
    zIndex: '10001',
    position: 'fixed',
    left: '48%',
    top: '20px',
    [theme.breakpoints.down('sm')]: {
      top: '10px',
      left: '45%',
    },
  },
});

const mapStateToProps = ({ loader }) => ({
  ...loaderDetail(loader, LOADER.page),
});

const Header = ({ classes, loading }) => {
  return (
    <>
      <Box component="header">
        <Box classes={{ root: classes.loaderContainer }}>
          <PageLoader loading={loading} />
        </Box>
        <Box classes={{ root: classes.boxRoot }}>
          <HeaderBrand />
          <NavBar />
        </Box>
      </Box>
    </>
  );
};
Header.defaultProps = {
  loading: false,
};

Header.propTypes = {
  classes: PropTypes.exact({
    boxRoot: PropTypes.string.isRequired,
    loaderContainer: PropTypes.string.isRequired,
  }).isRequired,
  loading: PropTypes.bool,
};

export default compose(
  connect(mapStateToProps),
  withStyles(style),
)(Header);
