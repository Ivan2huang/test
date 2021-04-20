import React from 'react';
import { injectIntl } from 'react-intl';
import * as PropTypes from 'prop-types';

import { Box } from '@material-ui/core';

import Typography from '../../../uiComponents/Typography';
import Grid from '../../../uiComponents/Grid';
import GridItem from '../../../uiComponents/GridItem';
import { formatMessage } from '../../../helpers/helpers';

const QuestionnaireHeader = React.memo(({ intl }) => (
  <Box mt={{ xs: 10, md: 21 }} mb={{ xs: 12, md: 22 }}>
    <Grid>
      <GridItem columns={{ xs: 12, md: 6 }}>
        <Typography type="style-1">
          {formatMessage(
            intl,
            'lifestyle.questionnaire.header',
            'Lifestyle Questionnaire',
          )}
        </Typography>
        <Typography type="style-6">
          {formatMessage(
            intl,
            'lifestyle.questionnaire.description',
            'We combined questions from the latest scientific tools to help us access your lifestyle risks',
          )}
        </Typography>
      </GridItem>
    </Grid>
  </Box>
));

QuestionnaireHeader.propTypes = {
  intl: PropTypes.shape({}).isRequired,
};

export default injectIntl(QuestionnaireHeader);
