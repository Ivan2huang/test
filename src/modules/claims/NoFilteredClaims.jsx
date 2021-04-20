import React from 'react';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

import Typography from '../../uiComponents/Typography';
import { formatMessage } from '../../helpers/helpers';
import Images from '../../constants/images';

const Styles = theme => ({
  image: {
    width: '66%',
    [theme.breakpoints.up('md')]: {
      width: '33%',
    },
  },
});

const NoFilteredClaims = ({ intl, classes }) => {
  return (
    <Box textAlign="center">
      <img
        src={Images.ERROR_BACKGROUND}
        alt="error background"
        className={classes.image}
      />
      <Box mt={8}>
        <Typography type="style-1">
          {formatMessage(intl, 'claim.title.noResult', 'No results available')}
        </Typography>
        <Box mt={2}>
          <Typography type="style-6">
            {formatMessage(
              intl,
              'claim.title.noResultDesc',
              'There are no claims matching your filter criteria. Try adjusting the filters.',
            )}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

NoFilteredClaims.propTypes = {
  intl: PropTypes.shape({}).isRequired,
  classes: PropTypes.exact({
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default compose(
  injectIntl,
  withStyles(Styles),
)(NoFilteredClaims);
