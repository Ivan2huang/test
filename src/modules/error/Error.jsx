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
import CONFIG from '../../constants/config';
import paths from '../../helpers/paths';

const getBackground = theme => {
  const background = {
    cendol: theme.backgroundGradient,
    default: theme.background,
  };
  return background[CONFIG.themeCode] || background.default;
};

const Styles = theme => ({
  main: {
    background: getBackground(theme),
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
    background: getBackground(theme),
  },
});

const contentAlignment = {
  cendol: 'center',
  basil: 'center',
  default: 'left',
};

const hideHomeBtnValues = ['cendol'];
const defaultHideHomeBtn = hideHomeBtnValues.includes(CONFIG.themeCode);

const Error = ({
  intl,
  classes,
  errorTitle,
  errorDesc,
  hideBackBtn,
  hideHomeBtn,
}) => {
  const navigateToHome = () => {
    navigateTo(paths.common.default);
  };
  const navigateToPreviousPage = Router.back;
  const align = contentAlignment[CONFIG.themeCode] || contentAlignment.default;
  console.log('Error.jsx render');

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
                alt="error background"
                className={classes.image}
              />
            </GridItem>
            <GridItem
              offset={{ sm: 3, md: 1 }}
              columns={{ xs: 12, sm: 6, md: 4 }}
            >
              <Box
                mb={4}
                mt={{ xs: 16, sm: 16, md: 0 }}
                display="flex"
                textAlign={align}
                justifyContent={align}
              >
                <Typography type="style-1">
                  {errorTitle ||
                    formatMessage(intl, 'error.title', 'Something went wrong')}
                </Typography>
              </Box>
              <Box
                mb={8}
                display="flex"
                textAlign={align}
                justifyContent={align}
              >
                <Typography type="style-6">
                  {errorDesc ||
                    formatMessage(
                      intl,
                      'error.message',
                      'Please try again later.',
                    )}
                </Typography>
              </Box>
              <ButtonGroup>
                {!hideBackBtn && (
                  <Button
                    data-testid="btn-back-to-previous-page"
                    variant="contained"
                    color="primary"
                    onClick={navigateToPreviousPage}
                  >
                    {formatMessage(intl, 'error.button.goback', 'Go back')}
                  </Button>
                )}
                {!hideHomeBtn && (
                  <Button
                    data-testid="btn-back-to-home-page"
                    variant="outlined"
                    color="secondary"
                    onClick={navigateToHome}
                  >
                    {formatMessage(intl, 'error.button.home', 'Go to homepage')}
                  </Button>
                )}
              </ButtonGroup>
            </GridItem>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

Error.defaultProps = {
  hideBackBtn: false,
  hideHomeBtn: defaultHideHomeBtn,
  errorTitle: null,
  errorDesc: null,
};

Error.propTypes = {
  intl: PropTypes.shape({}).isRequired,
  errorTitle: PropTypes.string,
  errorDesc: PropTypes.string,
  hideBackBtn: PropTypes.bool,
  hideHomeBtn: PropTypes.bool,
  classes: PropTypes.exact({
    main: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    grid: PropTypes.string.isRequired,
  }).isRequired,
};

export default compose(injectIntl, withStyles(Styles))(Error);
