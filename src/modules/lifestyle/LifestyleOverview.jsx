import React from 'react';
import { injectIntl } from 'react-intl';
import { Box } from '@material-ui/core';
import * as PropTypes from 'prop-types';
import Images from '../../constants/images';
import withLayout from '../../layouts/withLayoutProvider';
import Grid from '../../uiComponents/Grid';
import GridItem from '../../uiComponents/GridItem';
import LifestyleOverviewHeader from './LifestyleOverviewHeader';
import { LifestyleScore } from './lifestyle-score';
import { LifestyleResults } from './lifestyle-results';
import { GeneralTips } from './general-tips';
import { LifestyleHistory } from './lifestyle-history';
import { FaceAging } from './face-aging';
import { SuggestionRecommendations } from '../common/recommendations';
import config from '../../constants/config';
import { formatMessage } from '../../helpers/helpers';

const LifestyleOverview = ({ intl }) => {
  return (
    <Box>
      <LifestyleOverviewHeader />
      <Box mt={{ xs: 4, md: 11 }}>
        <Grid>
          <GridItem columns={{ xs: 12, md: 6 }}>
            <LifestyleScore />
          </GridItem>
          <GridItem columns={{ xs: 12, md: 6 }}>
            <LifestyleHistory />
          </GridItem>
        </Grid>
      </Box>
      <LifestyleResults />
      <GeneralTips />
      <FaceAging />
      {config.featureToggleLifestyleSuggestions && (
        <Box mt={{ xs: 10, md: 16 }}>
          <SuggestionRecommendations
            title={formatMessage(
              intl,
              'recommendation.header',
              'Suggestions based on my lifestyle',
            )}
          />
        </Box>
      )}
    </Box>
  );
};

LifestyleOverview.propTypes = {
  intl: PropTypes.shape({}).isRequired,
};
export default withLayout(injectIntl(LifestyleOverview), {
  backgroundImage: Images.LIFESTYLE_OVERVIEW_BACKGROUND,
});
