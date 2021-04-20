import React from 'react';
import PropTypes from 'prop-types';

import { Box, useTheme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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
      marginBottom: theme.spacingX(30),
    },
    [theme.breakpoints.up('md')]: {
      padding: `0 ${theme.spacingX(62)}`,
      marginBottom: theme.spacingX(34),
    },
  }),
  fullWidth: ({ theme }) => ({
    width: '100%',
    height: `calc(100% - ${theme.spacingX(19)})`,
    marginTop: theme.spacingX(20),
    marginBottom: theme.spacingX(24),
    [theme.breakpoints.up('md')]: {
      height: `calc(100% - ${theme.spacingX(24)})`,
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacingX(14),
      marginBottom: theme.spacingX(33),
    },
  }),
});

const defaultOptions = {
  backgroundImage: '',
  fullWidth: false,
};

const withLayout = (WrappedComponent, options = { defaultOptions }) => ({
  ...rest
}) => {
  const classes = useStyles({ theme: useTheme(), options });
  return (
    <Box
      display="flex"
      flexDirection="column"
      className={`${classes.container}`}
    >
      <main className={options.fullWidth ? classes.fullWidth : classes.main}>
        <WrappedComponent {...rest} />
      </main>
    </Box>
  );
};

withLayout.propTypes = {
  WrappedComponent: PropTypes.func.isRequired,
  options: PropTypes.exact({
    backgroundImage: PropTypes.string,
    fullWidth: PropTypes.bool,
  }),
};

export default withLayout;
