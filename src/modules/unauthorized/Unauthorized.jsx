import React from 'react';
import * as PropTypes from 'prop-types';
import Router from 'next/router';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';
import { Box, Button, withStyles } from '@material-ui/core';

import Grid from '../../uiComponents/Grid';
import GridItem from '../../uiComponents/GridItem';
import ButtonGroup from '../../uiComponents/ButtonGroup';
import Typography from '../../uiComponents/Typography';
import Images from '../../constants/images';
import { formatMessage, navigateTo } from '../../helpers/helpers';
import paths from '../../helpers/paths';

const Styles = theme => ({
  main: {
    background: theme.background,
  },
  content: {
    minHeight: '100vh',
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
  image: {
    width: '100%',
  },
  grid: {
    flex: 1,
    maxWidth: '1280px',
    width: '100%',
    boxSizing: 'border-box',
    margin: '0 auto',
    padding: `0 ${theme.spacingX(8)}`,
    [theme.breakpoints.up('sm')]: {
      padding: `0 ${theme.spacingX(16)}`,
    },
    [theme.breakpoints.up('md')]: {
      padding: `0 ${theme.spacingX(31)}`,
    },
    background: theme.background,
  },
});

const Unauthorized = ({ intl, classes }) => {
  const navigateToHome = () => {
    navigateTo(paths.common.default);
  };
  const navigateToPreviousPage = Router.back;

  return (
    <Box className={classes.main}>
      <Box className={classes.grid}>
        <Box
          display="flex"
          flexDirection="row"
          className={classes.content}
          alignItems="center"
        >
          <Grid alignItems="center" justify="center">
            <GridItem
              offset={{ sm: 3, md: 1 }}
              columns={{ xs: 8, sm: 6, md: 5 }}
            >
              <img
                src={Images.ERROR_BACKGROUND}
                alt="unauthorized background"
                className={classes.image}
              />
            </GridItem>
            <GridItem
              offset={{ sm: 3, md: 1 }}
              columns={{ xs: 12, sm: 6, md: 4 }}
            >
              <Box mb={4} mt={{ xs: 16, sm: 16, md: 0 }}>
                <Typography type="style-1">
                  {formatMessage(
                    intl,
                    'unauthorized.title',
                    'Something went wrong',
                  )}
                </Typography>
              </Box>
              <ButtonGroup>
                <Button
                  data-testid="btn-back-to-previous-page"
                  variant="contained"
                  color="primary"
                  onClick={navigateToPreviousPage}
                >
                  {formatMessage(intl, 'unauthorized.button.goback', 'Go back')}
                </Button>
                <Button
                  data-testid="btn-back-to-home-page"
                  variant="outlined"
                  color="secondary"
                  onClick={navigateToHome}
                >
                  {formatMessage(
                    intl,
                    'unauthorized.button.home',
                    'Go to homepage',
                  )}
                </Button>
              </ButtonGroup>
            </GridItem>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

Unauthorized.propTypes = {
  intl: PropTypes.shape({}).isRequired,
  classes: PropTypes.exact({
    main: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    grid: PropTypes.string.isRequired,
  }).isRequired,
};

export default compose(
  injectIntl,
  withStyles(Styles),
)(Unauthorized);
