import React, { useEffect } from 'react';
import { Box } from '@material-ui/core';
import * as PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import Tip from './Tip';
import ItemContainer from '../../common/shared/ItemContainer';
import Typography from '../../../uiComponents/Typography';
import ComponentLoaderAndError from '../../common/shared/ComponentLoaderAndError';
import { formatMessage } from '../../../helpers/helpers';
import { CATEGORIES } from '../../../constants/analytics';

const GeneralTips = ({ getLifestyleTips, tips, loading, errorState, intl }) => {
  useEffect(() => {
    getLifestyleTips();
  }, []);

  const isTipsValid = tips && tips.length > 0;

  return (
    isTipsValid && (
      <Box
        mt={{
          xs: 7,
          md: 20,
        }}
      >
        <Box
          mb={{
            xs: 4,
            md: 7,
          }}
        >
          <Typography type="style-2">
            {formatMessage(
              intl,
              'lifestyle.generalTips.header',
              'More lifestyle tips',
            )}
          </Typography>
        </Box>
        <ComponentLoaderAndError loading={loading} errorState={errorState}>
          <ItemContainer itemLength={tips.length} numberOfColumns={4}>
            {tips.map(tip => (
              <Tip
                topic={tip.topic}
                text={tip.text}
                link={tip.link}
                source={tip.source}
                key={`tip.topic-${Math.random()}`}
                trackingData={{
                  category: CATEGORIES.MY_LIFESTYLE_OVERVIEW,
                  action: `Click on learn more ${tip.topic}`,
                }}
              />
            ))}
          </ItemContainer>
        </ComponentLoaderAndError>
      </Box>
    )
  );
};

GeneralTips.defaultProps = {
  tips: [],
};

GeneralTips.propTypes = {
  tips: PropTypes.arrayOf(
    PropTypes.shape({
      topic: PropTypes.string,
      source: PropTypes.string,
      link: PropTypes.string,
      text: PropTypes.string,
    }),
  ),
  getLifestyleTips: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  errorState: PropTypes.bool.isRequired,
  intl: PropTypes.shape({}).isRequired,
};

export default injectIntl(GeneralTips);
