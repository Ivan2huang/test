import React, { useEffect } from 'react';
import { Box, Card, withStyles } from '@material-ui/core';
import * as PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import Typography from '../../../uiComponents/Typography';
import BarChart from './BarChart';
import ComponentLoaderAndError from '../../common/shared/ComponentLoaderAndError';
import { formatMessage } from '../../../helpers/helpers';

const Styles = theme => ({
  muiCardRoot: {
    background: theme.white,
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.05)',
    marginTop: theme.spacingX(10),
    [theme.breakpoints.up('md')]: {
      marginTop: 0,
    },
  },
});

const LifestyleHistory = ({
  loading,
  classes,
  intl,
  errorState,
  healthScoresHistory,
  getLifestyleHealthScoresHistory,
}) => {
  useEffect(() => {
    getLifestyleHealthScoresHistory();
  }, []);

  return (
    <Card
      tabIndex="0"
      aria-labelledby="myLifeStyleTitle myHistoryScore"
      classes={{ root: classes.muiCardRoot }}
    >
      <Box p={{ xs: 6, md: 12 }}>
        <Box pb={4}>
          <Typography id="myLifeStyleTitle" type="style-7">
            {formatMessage(
              intl,
              'lifestyle.lifestyleHistory.header',
              'My lifestyle history',
            )}
          </Typography>
        </Box>
        <ComponentLoaderAndError loading={loading} errorState={errorState}>
          <BarChart data={healthScoresHistory} />
        </ComponentLoaderAndError>
      </Box>
    </Card>
  );
};

LifestyleHistory.propTypes = {
  classes: PropTypes.shape({
    muiCardRoot: PropTypes.string.isRequired,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  errorState: PropTypes.bool.isRequired,
  intl: PropTypes.shape({}).isRequired,
  healthScoresHistory: PropTypes.arrayOf(
    PropTypes.shape({
      score: PropTypes.number.isRequired,
      createdOn: PropTypes.string.isRequired,
    }),
  ).isRequired,
  getLifestyleHealthScoresHistory: PropTypes.func.isRequired,
};

export default injectIntl(withStyles(Styles)(LifestyleHistory));
