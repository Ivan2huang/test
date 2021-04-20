import React, { useEffect } from 'react';
import { Box, Card, Hidden, withStyles } from '@material-ui/core';
import { injectIntl } from 'react-intl';
import * as PropTypes from 'prop-types';
import Typography from '../../../uiComponents/Typography';

import { formatMessage } from '../../../helpers/helpers';
import GridItem from '../../../uiComponents/GridItem';
import Grid from '../../../uiComponents/Grid';
import LifestyleScoreChart from './LifestyleScoreChart';
import ComponentLoaderAndError from '../../common/shared/ComponentLoaderAndError';

const Styles = theme => ({
  scoreCard: {
    height: '100%',
    boxSizing: 'border-box',
    padding: `${theme.spacingX(6)}`,
    background: theme.white,
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.05)',
    '&:last-child': {
      paddingBottom: theme.spacingX(6),
    },
    [theme.breakpoints.up('md')]: {
      padding: `${theme.spacingX(12)}`,
      '&:last-child': {
        paddingBottom: theme.spacingX(12),
      },
    },
  },
  scoreContainer: {
    textAlign: 'center',
    left: '50%',
    bottom: 'calc(50% - 16px)',
    transform: 'translate(-50%,50%)',
  },
});

const LifestyleScore = ({
  intl,
  classes,
  loading,
  errorState,
  healthScore,
  getLifestyleHealthScore,
}) => {
  const maxLifeStyleScore = 100;

  useEffect(() => {
    getLifestyleHealthScore();
  }, []);

  return (
    <Box component={Card} classes={{ root: classes.scoreCard }}>
      <Hidden implementation="css" smDown>
        <Typography type="style-7">
          {formatMessage(
            intl,
            'lifestyle.lifestyleScore.header',
            'My lifestyle score',
          )}
        </Typography>
      </Hidden>
      <Box mt={4}>
        <ComponentLoaderAndError loading={loading} errorState={errorState}>
          <Grid>
            <GridItem columns={{ md: 6 }}>
              <Box pt={{ xs: 2, md: 4 }}>
                <Typography type="style-6">
                  {formatMessage(
                    intl,
                    'lifestyle.lifestyleScore.description',
                    'Higher scores are associated with better lifestyle choices and lower risks of chronic disease.',
                  )}
                </Typography>
              </Box>
            </GridItem>
            <GridItem columns={{ xs: 12, md: 6 }}>
              <Box position="relative">
                <LifestyleScoreChart healthScore={healthScore} />
                <Box
                  position="absolute"
                  classes={{ root: classes.scoreContainer }}
                >
                  <Typography type="style-1" fontWeight="semiBold">
                    {formatMessage(
                      intl,
                      'lifestyle.lifestyleScore.healthScore',
                      `${healthScore}`,
                      {
                        healthScore,
                      },
                    )}
                  </Typography>
                  <Typography type="style-8">
                    {formatMessage(
                      intl,
                      'lifestyle.lifestyleScore.maximumScore',
                      `OUT OF ${maxLifeStyleScore}`,
                      {
                        maxScore: maxLifeStyleScore,
                      },
                    )}
                  </Typography>
                </Box>
              </Box>
            </GridItem>
            <GridItem columns={{ xs: 12 }}>
              <Box mb={{ xs: 2, md: 4 }} mt={2} textAlign="center">
                <Typography type="style-7">
                  {formatMessage(
                    intl,
                    'lifestyle.lifestyleScore.header',
                    'My lifestyle score',
                  )}
                </Typography>
              </Box>
              <Box textAlign="center">
                <Typography type="style-6">
                  {formatMessage(
                    intl,
                    'lifestyle.lifestyleScore.description',
                    'Higher scores are associated with better lifestyle choices and lower risks of chronic disease.',
                  )}
                </Typography>
              </Box>
            </GridItem>
          </Grid>
        </ComponentLoaderAndError>
      </Box>
    </Box>
  );
};

LifestyleScore.propTypes = {
  intl: PropTypes.shape({}).isRequired,
  classes: PropTypes.shape({
    scoreCard: PropTypes.string.isRequired,
    scoreContainer: PropTypes.string.isRequired,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  errorState: PropTypes.bool.isRequired,
  healthScore: PropTypes.number,
  getLifestyleHealthScore: PropTypes.func.isRequired,
};

LifestyleScore.defaultProps = {
  healthScore: null,
};

export default injectIntl(withStyles(Styles)(LifestyleScore));
