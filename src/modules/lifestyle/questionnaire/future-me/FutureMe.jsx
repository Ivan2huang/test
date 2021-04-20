import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import * as PropTypes from 'prop-types';

import { compose } from 'redux';
import { withRouter } from 'next/router';
import { FormSection, Field } from 'redux-form';
import {
  Box,
  Button,
  Card,
  withStyles,
  RootRef,
  Divider,
} from '@material-ui/core';

import Grid from '../../../../uiComponents/Grid';
import GridItem from '../../../../uiComponents/GridItem';
import Typography from '../../../../uiComponents/Typography';
import Image from '../../../../uiComponents/Image';
import Images from '../../../../constants/images';
import { formatMessage } from '../../../../helpers/helpers';
import renderUploadImage from './renderUploadImage';
import { QUESTIONNAIRE_TYPES, UPLOAD_RULE_ID } from '../constants';
import FilePicker from '../../../../uiComponents/FilePicker';
import { logAction } from '../../../../helpers/firebase';
import { CATEGORIES } from '../../../../constants/analytics';
import FEATURES from '../../../../constants/features';
import withRemoteFeatureChecker from '../../../common/shared/withRemoteFeatureChecker';

const FILE_TYPES = ['png', 'jpeg', 'jpg', 'tiff', 'tif'];
const FILE_SIZE = 2048000;
const REF_KEY = 'faceAging';
const VERTICAL_GAP = 120;

const Styles = theme => ({
  imageContainer: {
    height: theme.spacingX(60),
  },
  image: {
    height: '100%',
    width: '100%',
    objectFit: 'cover',
  },
});

const FutureMe = ({
  router,
  intl,
  classes,
  futureMeImage,
  fieldChange,
  getFaceAgingImage,
  isFeatureEnabled,
}) => {
  if (!isFeatureEnabled(FEATURES.FEATURE_TOGGLE_C2_6000_AgeMyFace)) {
    return <></>;
  }

  const domRef = React.useRef();

  const scrollIntoUpload = () => {
    const { offsetTop } = domRef.current;
    window.scrollTo(0, offsetTop - VERTICAL_GAP);
  };

  useEffect(() => {
    const { pos } = router.query;
    if (pos && pos === REF_KEY) {
      scrollIntoUpload();
    }
    getFaceAgingImage();
  }, []);

  const [imageError, setImageError] = useState(false);

  const handleChange = (files, isValid) => {
    if (!isValid) {
      setImageError(true);
      return;
    }
    setImageError(false);
    fieldChange(`${QUESTIONNAIRE_TYPES.futureMe}.image`, files[0]);

    // Change file success:
    logAction({
      category: CATEGORIES.HEALTH_QUESTIONNAIRE,
      action: 'Upload picture successfully',
    });
  };

  const uploadImage = (files, invalid) => {
    handleChange(files, invalid);
  };

  const reUploadImage = (files, invalid) => {
    handleChange(files, invalid);
  };

  const deletePhoto = () => {
    fieldChange(`${QUESTIONNAIRE_TYPES.futureMe}.image`, null);
  };

  const ReuploadButton = () => (
    <Button
      variant="outlined"
      color="secondary"
      data-testid="reupload-photo-btn"
      component="label"
    >
      {formatMessage(
        intl,
        'lifestyle.questionnaire.futureMe.reuploadPhotoButton.label',
        'Reupload a photo',
      )}
    </Button>
  );

  return (
    <RootRef rootRef={domRef}>
      <div>
        <Divider />
        <FormSection name={QUESTIONNAIRE_TYPES.futureMe}>
          <Box mt={{ xs: 12, md: 16 }} mb={{ xs: 12, md: 14 }}>
            <Grid>
              <GridItem offset={{ md: 1 }} columns={{ md: 3 }}>
                <img src={Images.LIFESTYLE_QUESTIONNAIRE_FUTURE_ME} alt="" />
              </GridItem>
              <GridItem columns={{ xs: 12, md: 3 }}>
                <Typography type="style-1">
                  {formatMessage(
                    intl,
                    'lifestyle.questionnaire.futureMe.header',
                    'Future me',
                  )}
                </Typography>
                <Box pt={9}>
                  <Typography type="style-6">
                    {formatMessage(
                      intl,
                      'lifestyle.questionnaire.futureMe.description',
                      'Upload a selfie and we will analyse and predict the future you.',
                    )}
                  </Typography>
                </Box>
                <Box pt={2}>
                  <Typography type="style-8">
                    {formatMessage(
                      intl,
                      'lifestyle.questionnaire.futureMe.optional',
                      'Optional',
                    )}
                  </Typography>
                </Box>
                {futureMeImage && (
                  <>
                    <Box mt={4}>
                      <FilePicker
                        testId="btn-reupload-file"
                        component={ReuploadButton}
                        fileTypes={FILE_TYPES}
                        fileSize={FILE_SIZE}
                        onChange={reUploadImage}
                        inputProps={{
                          'aria-describedby': UPLOAD_RULE_ID,
                        }}
                      />
                    </Box>
                    <Box mt={4} mb={{ xs: 4 }}>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={deletePhoto}
                        data-testid="delete-photo-btn"
                      >
                        {formatMessage(
                          intl,
                          'lifestyle.questionnaire.futureMe.deletePhotoButton.label',
                          'Delete Photo',
                        )}
                      </Button>
                    </Box>
                  </>
                )}
              </GridItem>
              <GridItem offset={{ md: 1 }} columns={{ xs: 12, md: 3 }}>
                <Box mb={2} className={classes.imageContainer} component={Card}>
                  {futureMeImage ? (
                    <Image className={classes.image} src={futureMeImage} />
                  ) : (
                    <Field
                      name="image"
                      handleChange={uploadImage}
                      component={renderUploadImage}
                    />
                  )}
                </Box>
                <Typography
                  type="style-8"
                  color={imageError ? 'error' : undefined}
                  id={UPLOAD_RULE_ID}
                >
                  {formatMessage(
                    intl,
                    'lifestyle.questionnaire.futureMe.imageDescription',
                    'Only .jpeg, .PNG or Tiff files and size should not exceed more than 2mb.',
                  )}
                </Typography>
              </GridItem>
            </Grid>
          </Box>
        </FormSection>
      </div>
    </RootRef>
  );
};

FutureMe.defaultProps = {
  futureMeImage: undefined,
};

FutureMe.propTypes = {
  router: PropTypes.shape({}).isRequired,
  intl: PropTypes.shape({}).isRequired,
  classes: PropTypes.exact({
    image: PropTypes.string.isRequired,
    imageContainer: PropTypes.string.isRequired,
  }).isRequired,
  futureMeImage: PropTypes.shape({}),
  fieldChange: PropTypes.func.isRequired,
  getFaceAgingImage: PropTypes.func.isRequired,
  isFeatureEnabled: PropTypes.func.isRequired,
};

export default compose(
  injectIntl,
  withRouter,
  withStyles(Styles),
)(withRemoteFeatureChecker(FutureMe));
