import React, { useEffect } from 'react';
import * as PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Box, useTheme } from '@material-ui/core';

import ItemContainer from '../../common/shared/ItemContainer';
import getResultCards from './helpers/helper';
import { formatMessage } from '../../../helpers/helpers';
import ResultCard from './ResultCard';
import Typography from '../../../uiComponents/Typography';
import ComponentLoaderAndError from '../../common/shared/ComponentLoaderAndError';

const LifestyleResults = ({
  intl,
  getLifestyleResults,
  lifestyleResults,
  lifestyleTips,
  loading,
  errorState,
  lifestyleTipsErrorState,
}) => {
  useEffect(() => {
    getLifestyleResults();
  }, []);

  const theme = useTheme();
  const resultCards = getResultCards(intl, theme, lifestyleResults.details);

  return (
    resultCards.length > 0 && (
      <>
        <Box mb={6} mt={{ xs: 8, md: 14 }}>
          <Typography type="style-2">
            {formatMessage(
              intl,
              'lifestyle.lifestyleResults.header',
              'My results',
            )}
          </Typography>
        </Box>
        <ComponentLoaderAndError loading={loading} errorState={errorState}>
          <ItemContainer itemLength={resultCards.length} numberOfColumns={4}>
            {resultCards.map(cardInfo => (
              <ResultCard
                key={`cardInfo.title-${Math.random()}`}
                tips={lifestyleTips[cardInfo.id]}
                tipCategory={cardInfo.id}
                lifestyleTipsErrorState={lifestyleTipsErrorState}
                {...cardInfo}
              />
            ))}
          </ItemContainer>
        </ComponentLoaderAndError>
      </>
    )
  );
};

LifestyleResults.propTypes = {
  lifestyleTips: PropTypes.shape({}).isRequired,
  intl: PropTypes.shape({}).isRequired,
  getLifestyleResults: PropTypes.func.isRequired,
  lifestyleResults: PropTypes.shape({}).isRequired,
  loading: PropTypes.bool.isRequired,
  errorState: PropTypes.bool.isRequired,
  lifestyleTipsErrorState: PropTypes.bool.isRequired,
};

export default injectIntl(LifestyleResults);
