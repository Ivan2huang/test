import React from 'react';
import * as PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import { Box, withStyles } from '@material-ui/core';

import Typography from '../../../uiComponents/Typography';
import { formatMessage } from '../../../helpers/helpers';

const styles = theme => ({
  root: {
    flex: 1,
    backgroundColor: theme.white,
  },
  container: {
    overflowY: 'hidden',
    overflowX: 'hidden',
  },
  subHeading: {
    paddingTop: theme.spacingX(2),
  },
});

const Error = ({
  classes,
  className,
  children,
  errorState,
  intl,
  errorMessage,
}) => {
  return (
    <>
      {errorState && (
        <Box display="flex" flexDirection="column" width="100%">
          {errorMessage && (
            <Typography type="style-4">{errorMessage}</Typography>
          )}
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            className={className}
            classes={{ root: classes.root }}
          >
            <Typography type="style-3" color="error">
              {formatMessage(
                intl,
                'error.component.heading',
                'Something went wrong.',
              )}
            </Typography>
            <Typography type="style-6" className={classes.subHeading}>
              {formatMessage(
                intl,
                'error.component.subHeading',
                'Please refresh or try again later.',
              )}
            </Typography>
          </Box>
        </Box>
      )}
      <Box
        display={errorState ? 'none' : 'block'}
        flex={1}
        classes={{ root: classes.container }}
      >
        {children}
      </Box>
    </>
  );
};

Error.defaultProps = {
  className: '',
};

Error.propTypes = {
  intl: PropTypes.shape({}).isRequired,
  className: PropTypes.string,
  classes: PropTypes.exact({
    root: PropTypes.string.isRequired,
    container: PropTypes.string.isRequired,
    subHeading: PropTypes.string.isRequired,
  }).isRequired,
  children: PropTypes.node.isRequired,
  errorState: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
};

Error.defaultProps = {
  errorMessage: '',
};

export default injectIntl(withStyles(styles)(Error));
