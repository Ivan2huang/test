import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import * as PropTypes from 'prop-types';

import { Box, Card, Hidden, Slider, withStyles } from '@material-ui/core';

import Error from './Error';
import Grid from '../../../uiComponents/Grid';
import GridItem from '../../../uiComponents/GridItem';
import Typography from '../../../uiComponents/Typography';
import URL from '../../../helpers/url';
import { formatMessage, navigateTo } from '../../../helpers/helpers';
import { logAction } from '../../../helpers/firebase';
import { CATEGORIES } from '../../../constants/analytics';
import FEATURES from '../../../constants/features';
import paths from '../../../helpers/paths';
import withRemoteFeatureChecker from '../../common/shared/withRemoteFeatureChecker';

const HEALTHY = 'healthy';

const Styles = theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.white,
    minHeight: theme.spacingX(40),
    overflowY: 'auto',
    overflowX: 'hidden',
    [`@media all and (-ms-high-contrast: none), (-ms-high-contrast: active)`]: {
      display: 'block',
    },
  },
  contentGrid: {
    [theme.breakpoints.down('sm')]: {
      order: 2,
    },
  },
  slider: {
    width: '100%',
    boxSizing: 'border-box',
    color: theme.black,
  },
  mark: {
    display: 'none',
  },
  loader: {
    backgroundColor: theme.white,
  },
});

const FaceAging = ({
  getUserFaceAgingCategories,
  userFaceAgingData,
  loading,
  classes,
  errorState,
  intl,
  isFeatureEnabled,
}) => {
  if (!isFeatureEnabled(FEATURES.FEATURE_TOGGLE_C2_6000_AgeMyFace))
    return <></>;
  const [age, setAge] = useState();
  const [ageMarks, setAgeMarks] = useState([]);
  const displayComponent =
    userFaceAgingData.faceAgingIsDone || loading || errorState;
  const isAnalyzing =
    loading && !errorState && !userFaceAgingData.faceAgingIsDone;
  const isError = !!errorState;

  useEffect(() => {
    getUserFaceAgingCategories();
  }, []);

  useEffect(() => {
    const marks = [];
    userFaceAgingData.categories.forEach(category => {
      if (category.category === HEALTHY) {
        marks.push({ value: parseInt(category.age, 10) });
      }
    });
    if (marks.length > 0) {
      setAge(marks[0].value);
      setAgeMarks(marks);
    }
  }, [userFaceAgingData]);

  const onChangeAge = (e, value) => {
    if (age !== value) {
      logAction({
        category: CATEGORIES.MY_LIFESTYLE_OVERVIEW,
        action: `Slider age ${value}`,
      });
      setAge(value);
    }
  };

  if (!displayComponent) return <></>;

  const displayAge = age === 67 ? 65 : age || 0;

  return (
    <>
      <Box my={{ xs: 11, md: 20 }} component={Card}>
        <Box
          p={{ md: 11 }}
          display="flex"
          flexDirection="column"
          className={classes.container}
        >
          {(isAnalyzing || isError) && (
            <Box>
              <Typography type="style-1">
                {formatMessage(
                  intl,
                  'lifestyle.faceAging.futureMe.header',
                  'Future Me',
                )}
              </Typography>
            </Box>
          )}
          <Error
            isAnalyzing={isAnalyzing}
            isError={isError}
            onTryAgain={() =>
              navigateTo(paths.common.questionnaire, {
                pos: 'faceAging',
              })
            }
          >
            {ageMarks.length > 0 && (
              <Grid>
                <GridItem
                  columns={{ xs: 12, md: 5 }}
                  className={classes.contentGrid}
                >
                  <Box mb={8} component={Hidden} implementation="css" smDown>
                    <Typography type="style-1">
                      {formatMessage(
                        intl,
                        'lifestyle.faceAging.futureMe.header',
                        'Future Me',
                      )}
                    </Typography>
                  </Box>
                  <Box mb={3} component={Hidden} implementation="css" smDown>
                    <Typography type="style-4">
                      {formatMessage(
                        intl,
                        'lifestyle.faceAging.header',
                        `Me at age ${displayAge}`,
                        { age: `${displayAge}` },
                      )}
                    </Typography>
                  </Box>

                  <Box>
                    <Box py={{ xs: 5, md: 1 }} px={3}>
                      <Slider
                        classes={{
                          root: classes.slider,
                          mark: classes.mark,
                        }}
                        defaultValue={30}
                        data-testid="age-slider"
                        aria-labelledby="discrete-slider"
                        step={null}
                        marks={ageMarks}
                        min={ageMarks[0].value}
                        max={ageMarks[ageMarks.length - 1].value}
                        onChange={onChangeAge}
                      />
                    </Box>
                    <Typography type="style-6">
                      {formatMessage(
                        intl,
                        'lifestyle.faceAging.description',
                        'Move the slider to view your future appearance when you live a healthier lifestyle.',
                      )}
                    </Typography>
                  </Box>
                </GridItem>
                <GridItem columns={{ xs: 12, md: 6 }} offset={{ md: 1 }}>
                  <Box mb={3} component={Hidden} implementation="css" mdUp>
                    <Typography type="style-4">
                      {formatMessage(
                        intl,
                        'lifestyle.faceAging.header',
                        `Me at age ${displayAge}`,
                        { age: displayAge },
                      )}
                    </Typography>
                  </Box>
                  <Grid>
                    <GridItem columns={{ xs: 6, md: 6 }}>
                      <Box
                        component="img"
                        src={URL.faceAgingImage(age, 'healthy')}
                        alt=""
                        width="100%"
                      />
                      <Box mt={{ md: 5 }}>
                        <Typography type="style-4">
                          {formatMessage(
                            intl,
                            'lifestyle.faceAging.healthyLifeStyle',
                            'Healthy lifestyle',
                          )}
                        </Typography>
                      </Box>
                    </GridItem>
                    <GridItem columns={{ xs: 6, md: 6 }}>
                      <Box
                        component="img"
                        src={URL.faceAgingImage(age, 'unhealthy')}
                        alt=""
                        width="100%"
                      />
                      <Box mt={{ md: 5 }}>
                        <Typography type="style-4">
                          {formatMessage(
                            intl,
                            'lifestyle.faceAging.currentLifeStyle',
                            'Current lifestyle',
                          )}
                        </Typography>
                      </Box>
                    </GridItem>
                  </Grid>
                </GridItem>
              </Grid>
            )}
          </Error>
        </Box>
      </Box>
    </>
  );
};

FaceAging.propTypes = {
  classes: PropTypes.exact({
    container: PropTypes.string.isRequired,
    contentGrid: PropTypes.string.isRequired,
    loader: PropTypes.string.isRequired,
    slider: PropTypes.string.isRequired,
    mark: PropTypes.string.isRequired,
  }).isRequired,
  getUserFaceAgingCategories: PropTypes.func.isRequired,
  userFaceAgingData: PropTypes.shape({
    faceAgingIsDone: PropTypes.bool.isRequired,
    categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  errorState: PropTypes.bool.isRequired,
  intl: PropTypes.shape({}).isRequired,
  isFeatureEnabled: PropTypes.func.isRequired,
};

export default injectIntl(
  withStyles(Styles)(withRemoteFeatureChecker(FaceAging)),
);
