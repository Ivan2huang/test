import React from 'react';
import PropTypes from 'prop-types';

import { Box, useTheme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '../../uiComponents/Grid';
import GridItem from '../../uiComponents/GridItem';
import { LoaderContainer } from '../loader';

const useStyles = makeStyles({
  container: ({ theme, options }) => ({
    [theme.breakpoints.up('md')]: {
      backgroundSize: 'auto 100%',
      background: `url(${options.backgroundImage}) left center no-repeat`,
    },
    height: '100vh',
  }),
  main: ({ theme }) => ({
    flex: 1,
    maxWidth: '1280px',
    margin: '0 auto',
    width: '100%',
    display: 'block',
    boxSizing: 'border-box',
    padding: theme.spacingX(8, 8, 0, 8),
    [theme.breakpoints.up('md')]: {
      padding: `${theme.spacingX(35)} ${theme.spacingX(31)}  0`,
    },
  }),
});

const withLegalLayout = (WrappedComponent, options) => () => {
  const classes = useStyles({ theme: useTheme(), options });
  return (
    <Box
      display="flex"
      flexDirection="column"
      classes={{ root: classes.container }}
    >
      <LoaderContainer defaultLoading>
        <main className={classes.main}>
          <Grid>
            <GridItem
              offset={{ sm: 2, md: 4 }}
              columns={{ xs: 12, sm: 8, md: 8 }}
            >
              <WrappedComponent />
            </GridItem>
          </Grid>
        </main>
      </LoaderContainer>
    </Box>
  );
};

withLegalLayout.propTypes = {
  WrappedComponent: PropTypes.func.isRequired,
  options: PropTypes.exact({
    backgroundImage: PropTypes.string,
  }).isRequired,
};

export default withLegalLayout;
