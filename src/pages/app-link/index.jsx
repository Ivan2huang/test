import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Box, withStyles } from '@material-ui/core';
import Loading from '../../uiComponents/Loading';
import CONFIG from '../../constants/config';

const styles = theme => ({
  root: {
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
  },
  loading: {
    flex: 1,
    backgroundColor: theme.white,
  },
});

const { appStoreLink, playStoreLink } = CONFIG;

const AppLink = ({ classes }) => {
  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (userAgent.match(/iPhone|iPad|iPod/i)) {
      window.location = appStoreLink;
    } else if (userAgent.match(/Android/i)) {
      window.location = playStoreLink;
    } else {
      window.location = '/';
    }
  }, []);

  return (
    <Box classes={{ root: classes.root }}>
      <Loading classes={{ root: classes.loading }} />
    </Box>
  );
};

AppLink.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.shape({}).isRequired,
    loading: PropTypes.shape({}).isRequired,
  }).isRequired,
};

export default withStyles(styles)(AppLink);
