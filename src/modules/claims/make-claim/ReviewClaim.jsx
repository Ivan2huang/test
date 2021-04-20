import React, { useEffect, useState } from 'react';
import * as PropTypes from 'prop-types';
import Router from 'next/router';
import { injectIntl } from 'react-intl';
import { Card, CardContent, Box, Button, withStyles } from '@material-ui/core';

import ReviewClaimHeader from './ReviewClaimHeader';
import TermsAndConditions from './TermsAndConditions';
import AttachmentPreview from './AttachmentPreview';
import Details from '../claim-details/Details';
import Images from '../../../constants/images';
import Grid from '../../../uiComponents/Grid';
import GridItem from '../../../uiComponents/GridItem';
import Typography from '../../../uiComponents/Typography';
import FileItems from '../../../uiComponents/FileItems';

import { formatMessage, navigateTo } from '../../../helpers/helpers';
import paths from '../../../helpers/paths';
import { patientDetails, claimDetails } from './helper';

const Styles = theme => ({
  image: {
    width: '100%',
  },
  actions: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
});

const ReviewClaim = ({
  classes,
  intl,
  patient,
  claimData,
  tncModal,
  termAndCondition,
  previewModal,
  submitClaim,
  updateTNCAction,
  updateTNCModal,
  updatePreviewModal,
}) => {
  const [previewItem, setPreviewItem] = useState(null);

  useEffect(() => {
    if (!patient || !claimData) {
      navigateTo(paths.common.root);
    }
  }, []);

  if (!patient || !claimData) {
    return null;
  }

  const { patientName, contactNumber } = patient;
  const {
    receipts,
    referral,
    settlementAdvices,
    prescriptions,
    referralRequired,
    isChineseHerbalist,
    claim: { anotherInsurer },
  } = claimData;

  const receiptsWithUrl = receipts.files.map(file => ({
    name: file.name,
    file,
  }));
  const referralWithUrl = referral.files.map(file => ({
    name: file.name,
    file,
  }));
  const settlementAdvicesWithUrl = settlementAdvices.files.map(file => ({
    name: file.name,
    file,
  }));
  const prescriptionsWithUrl = prescriptions.files.map(file => ({
    name: file.name,
    file,
  }));

  const submitClaimHandle = () => {
    const loaderMessage = intl.formatHTMLMessage({
      id: 'claims.makeClaimForm.submitLoaderMessage',
      defaultMessage: 'Submitting your claim...<br/>Do not close or refresh',
    });
    submitClaim({ patient, ...claimData }, loaderMessage);
  };

  const showPreview = file => {
    setPreviewItem(file);
    updatePreviewModal(true);
  };

  const renderAttachments = (header, files) =>
    files.length > 0 && (
      <Box mt={8}>
        <Box>
          <Typography type="style-3">{header}</Typography>
        </Box>
        <Box mt={{ md: -3 }}>
          <FileItems files={files} onClick={showPreview} responsiveMode />
        </Box>
      </Box>
    );

  return (
    <Box mt={{ xs: 3, sm: 14 }}>
      <Card>
        <CardContent>
          <Box mt={10} mb={10}>
            <Grid>
              <GridItem offset={{ md: 1 }} columns={{ md: 3 }}>
                <img
                  src={Images.MAKE_CLAIM_BACKGROUND}
                  alt="make claim background"
                  className={classes.image}
                />
              </GridItem>
              <GridItem
                offset={{ sm: 1, md: 1 }}
                columns={{ xs: 12, sm: 10, md: 5 }}
              >
                <ReviewClaimHeader />

                <Details
                  header={formatMessage(
                    intl,
                    'claims.claimDetails.header.patientDetails',
                    'Patient details',
                  )}
                  details={patientDetails(patientName, contactNumber, intl)}
                />

                <Details
                  header={formatMessage(
                    intl,
                    'claims.claimDetails.header.claimDetails',
                    'Claim details',
                  )}
                  details={claimDetails(claimData, intl)}
                />

                {renderAttachments(
                  formatMessage(
                    intl,
                    'claims.claimDetails.header.receipts',
                    'Receipts / Referral letter',
                  ),
                  receiptsWithUrl,
                )}

                {referralRequired &&
                  renderAttachments(
                    formatMessage(
                      intl,
                      'claims.makeClaimForm.uploadReferralLetter.title',
                      'Referral Letter',
                    ),
                    referralWithUrl,
                  )}

                {anotherInsurer &&
                  renderAttachments(
                    formatMessage(
                      intl,
                      'claims.makeClaimForm.settlementAdvice.title',
                      'Settlement Advice',
                    ),
                    settlementAdvicesWithUrl,
                  )}

                {isChineseHerbalist &&
                  renderAttachments(
                    formatMessage(
                      intl,
                      'claims.makeClaimForm.prescriptions.title',
                      'Prescription / Supporting Documents',
                    ),
                    prescriptionsWithUrl,
                  )}

                <Box
                  className={classes.actions}
                  display="flex"
                  justifyContent="flex-start"
                  mt={8}
                  mb={10}
                >
                  <Button
                    type="submit"
                    data-testid="btn-submit-claim"
                    color="primary"
                    variant="contained"
                    onClick={submitClaimHandle}
                  >
                    {formatMessage(
                      intl,
                      'claims.claimReview.button.submit',
                      'Submit claim',
                    )}
                  </Button>
                  <Box ml={{ xs: 0, md: 4 }} mt={{ xs: 4, md: 0 }}>
                    <Button
                      data-testid="btn-go-back"
                      color="primary"
                      variant="contained"
                      onClick={Router.back}
                    >
                      {formatMessage(
                        intl,
                        'claims.claimReview.button.back',
                        'Back',
                      )}
                    </Button>
                  </Box>
                </Box>
              </GridItem>
            </Grid>
          </Box>
        </CardContent>
      </Card>

      <TermsAndConditions
        open={tncModal}
        content={termAndCondition}
        updateTNCModal={updateTNCModal}
        updateTNCAction={updateTNCAction}
      />

      <AttachmentPreview
        open={previewModal}
        attachment={previewItem}
        updatePreviewModal={updatePreviewModal}
      />
    </Box>
  );
};

ReviewClaim.propTypes = {
  classes: PropTypes.exact({
    image: PropTypes.string.isRequired,
    actions: PropTypes.string.isRequired,
  }).isRequired,
  intl: PropTypes.shape({}).isRequired,
  previewModal: PropTypes.bool.isRequired,
  tncModal: PropTypes.bool.isRequired,
  patient: PropTypes.shape({
    patientName: PropTypes.string.isRequired,
    contactNumber: PropTypes.string.isRequired,
  }),
  claimData: PropTypes.shape({}),
  termAndCondition: PropTypes.shape({}).isRequired,
  submitClaim: PropTypes.func.isRequired,
  updateTNCModal: PropTypes.func.isRequired,
  updateTNCAction: PropTypes.func.isRequired,
  updatePreviewModal: PropTypes.func.isRequired,
};

ReviewClaim.defaultProps = {
  patient: null,
  claimData: null,
};

export default injectIntl(withStyles(Styles)(ReviewClaim));
