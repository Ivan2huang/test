import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Box, Card, withStyles } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import Typography from '../../../../uiComponents/Typography';
import { formatMessage, navigateTo } from '../../../../helpers/helpers';
import paths from '../../../../helpers/paths';
import { DETAILS_ID } from '../../constant';

const styles = theme => ({
  backContainer: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    '& > button': {
      background: 'transparent',
      display: 'flex',
      border: 'none',
      alignItems: 'center',
    },
  },
  backIcon: {
    fontSize: theme.spacing(3),
  },
});

const Layout = ({ classes, intl, noBackground, children }) => {
  return (
    <>
      <Box className={classes.backContainer}>
        <button
          data-testid="btn-BackToDetails"
          type="button"
          onClick={() => navigateTo(paths.common[DETAILS_ID])}
        >
          <ArrowBackIosIcon className={classes.backIcon} />
          <Typography type="style-10">
            {formatMessage(intl, 'titles.me.details', 'My details')}
          </Typography>
        </button>
      </Box>
      {noBackground ? <Box>{children}</Box> : <Card>{children}</Card>}
    </>
  );
};

Layout.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  intl: PropTypes.shape({}).isRequired,
  children: PropTypes.node,
  noBackground: PropTypes.bool,
};

Layout.defaultProps = {
  children: '',
  noBackground: false,
};

export default withStyles(styles)(injectIntl(Layout));
