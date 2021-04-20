import React from 'react';
import { injectIntl } from 'react-intl';
import * as PropTypes from 'prop-types';

import { Box, Hidden } from '@material-ui/core';

import GridItem from '../../uiComponents/GridItem';
import Typography from '../../uiComponents/Typography';
import { formatMessage } from '../../helpers/helpers';
import LifestyleButtons from './LifestyleButtons';
import Grid from '../../uiComponents/Grid';

const LifestyleOverviewHeader = ({ intl }) => {
  return (
    <Grid>
      <GridItem columns={{ xs: 12, md: 7 }}>
        <Box pt={{ xs: 10, md: 18 }}>
          <Typography type="style-1">
            {formatMessage(
              intl,
              'lifestyle.lifestyleOverview.header',
              'My lifestyle overview',
            )}
          </Typography>
          <Box mt={2} mb={4} implementation="css" smDown component={Hidden}>
            <Typography type="style-3">
              {formatMessage(
                intl,
                'lifestyle.lifestyleOverview.description',
                'Remember, your health is primarily a result of your lifestyle.',
              )}
            </Typography>
          </Box>
          <Box mt={{ xs: 10, md: 4 }}>
            <LifestyleButtons questionnaireUpdateButton />
          </Box>
        </Box>
      </GridItem>
    </Grid>
  );
};

LifestyleOverviewHeader.propTypes = {
  intl: PropTypes.shape({}).isRequired,
};

export default injectIntl(LifestyleOverviewHeader);
