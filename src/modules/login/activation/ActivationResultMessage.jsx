import React from 'react';

import * as PropTypes from 'prop-types';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';
import { Box, useTheme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Typography from '../../../uiComponents/Typography';

const useStyles = makeStyles({
  text: ({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  }),
});

const ActivationResultMessage = ({ title, message }) => {
  const classes = useStyles({ theme: useTheme() });

  return (
    <>
      <Box>
        <Typography type="style-1" classes={{ root: classes.text }}>
          {title}
        </Typography>
      </Box>
      <Box mt={4}>
        <Typography type="style-5" classes={{ root: classes.text }}>
          {message}
        </Typography>
      </Box>
    </>
  );
};

ActivationResultMessage.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default compose(injectIntl)(ActivationResultMessage);
