import React from 'react';
import PropTypes from 'prop-types';

import { CircularProgress, Button, Box, withStyles } from '@material-ui/core';
import { injectIntl } from 'react-intl';

import Typography from '../../../uiComponents/Typography';

import { formatMessage } from '../../../helpers/helpers';

const styles = theme => ({
  root: {
    display: 'flex',
    flex: 1,
    backgroundColor: theme.white,
    overflowY: 'hidden',
    overflowX: 'hidden',
  },
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    margin: `${theme.spacingX(11)} 0`,
  },
  loader: {
    color: theme.loader,
  },
});

const Error = ({
  children,
  classes,
  intl,
  isAnalyzing,
  isError,
  onTryAgain,
}) => {
  const renderAnalyzing = () => (
    <>
      <Box mb={10}>
        <CircularProgress className={classes.loader} size={30} />
      </Box>
      <Box>
        <Typography type="style-6">
          {formatMessage(
            intl,
            'lifestyle.faceAging.analyzing.inProgress',
            'Analyzing in progress. This may take a little while.',
          )}
          <br />
          {formatMessage(
            intl,
            'lifestyle.faceAging.analyzing.notNavigate',
            'Please do not navigate away.',
          )}
        </Typography>
      </Box>
    </>
  );

  const renderError = () => (
    <>
      <Box mb={4}>
        <Typography type="style-3">
          {formatMessage(
            intl,
            'lifestyle.faceAging.error.somethingWhenWrong',
            'Something went wrong',
          )}
        </Typography>
      </Box>

      <Box mb={8}>
        <Typography type="style-6">
          {formatMessage(
            intl,
            'lifestyle.faceAging.error.unableProcess',
            'We are unable to process the photo you uploaded.',
          )}
          <br />
          {formatMessage(
            intl,
            'lifestyle.faceAging.error.retryUpload',
            'Please retry uploading a selfie and we will analyse and predict the future you.',
          )}
        </Typography>
      </Box>

      <Button
        variant="contained"
        color="primary"
        data-testid="btn-tryAgain"
        onClick={() => onTryAgain()}
      >
        {formatMessage(
          intl,
          'lifestyle.faceAging.error.button.tryAgain',
          'Try Again',
        )}
      </Button>
    </>
  );

  if (isAnalyzing && isError) {
    return <></>;
  }

  return (
    <Box className={classes.root}>
      {(isAnalyzing || isError) && (
        <Box className={classes.container}>
          {isAnalyzing && renderAnalyzing()}
          {isError && renderError()}
        </Box>
      )}
      <Box display={isAnalyzing || isError ? 'none' : 'block'} flex={1}>
        {children}
      </Box>
    </Box>
  );
};

Error.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.shape({}).isRequired,
  intl: PropTypes.shape({}).isRequired,
  isAnalyzing: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  onTryAgain: PropTypes.func.isRequired,
};

export default injectIntl(withStyles(styles)(Error));
