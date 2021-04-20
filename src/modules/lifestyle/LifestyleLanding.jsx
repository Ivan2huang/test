import React from 'react';
import * as PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import { Box } from '@material-ui/core';

import Images from '../../constants/images';
import Grid from '../../uiComponents/Grid';
import GridItem from '../../uiComponents/GridItem';
import Typography from '../../uiComponents/Typography';
import withLayout from '../../layouts/withLayoutProvider';
import LifestyleButtons from './LifestyleButtons';
import { formatMessage } from '../../helpers/helpers';

const LifestyleLanding = ({ intl }) => {
  return (
    <Box pt={{ xs: 10, md: 40 }}>
      <Grid>
        <GridItem columns={{ md: 4 }}>
          <img src={Images.LIFESTYLE_LANDING} alt="lifestyle landing" />
        </GridItem>
        <GridItem columns={{ xs: 12, md: 6 }} offset={{ md: 2 }}>
          <Typography type="style-1">
            {formatMessage(
              intl,
              'lifestyle.landingPage.header',
              'Become a better version of yourself !',
            )}
          </Typography>
          <Box mt={6}>
            <Typography type="style-6">
              {formatMessage(
                intl,
                'lifestyle.landingPage.description-first',
                'Discover actionable insights on your health status. Enjoy\n' +
                  'personalised recommendations to improve your daily wellbeing.',
              )}
            </Typography>
            <Box mt={4}>
              <Typography type="style-6">
                {formatMessage(
                  intl,
                  'lifestyle.landingPage.description-second',
                  'Don’t worry, no data is shared with your employer.',
                )}
              </Typography>
            </Box>
          </Box>
          <Box mt={{ xs: 4, md: 10 }}>
            <LifestyleButtons />
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

LifestyleLanding.propTypes = {
  intl: PropTypes.shape({}).isRequired,
};

export default withLayout(injectIntl(LifestyleLanding));
