import React from 'react';
import * as PropTypes from 'prop-types';

import { Card, CardContent, Box, withStyles } from '@material-ui/core';

import MakeClaimForm from './MakeClaimForm';
import MakeClaimHeader from './MakeClaimHeader';
import Images from '../../../constants/images';
import Grid from '../../../uiComponents/Grid';
import GridItem from '../../../uiComponents/GridItem';

const Styles = () => ({
  image: {
    width: '100%',
  },
});

const MakeClaim = ({
  classes,
  patients,
  consultationTypes,
  diagnosisTypes,
  initialValues,
  selectedClaimId,
  anotherInsurerEnabled,
  insuranceClaim,
  maxReceiptAmount,
  referralRequired,
  loader,
  selectedPatientId,
  walletBalance,
  getMemberProfile,
  getClaimTypes,
  getWalletBalance,
  getTermAndCondition,
  selectedDiagnosisKey,
  isChineseHerbalist,
  maxAdditionalDocumentAllowed,
  isTerminatedPatient,
  terminatedDate,
  consultationCategoryName,
}) => (
  <Box
    mt={{
      xs: 3,
      sm: 14,
    }}
  >
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
              <MakeClaimHeader />
              <MakeClaimForm
                patients={patients}
                consultationTypes={consultationTypes}
                diagnosisTypes={diagnosisTypes}
                initialValues={initialValues}
                selectedClaimId={selectedClaimId}
                selectedDiagnosisKey={selectedDiagnosisKey}
                insuranceClaim={insuranceClaim}
                anotherInsurerEnabled={anotherInsurerEnabled}
                maxReceiptAmount={maxReceiptAmount}
                referralRequired={referralRequired}
                loader={loader}
                selectedPatientId={selectedPatientId}
                walletBalance={walletBalance}
                getMemberProfile={getMemberProfile}
                getClaimTypes={getClaimTypes}
                getWalletBalance={getWalletBalance}
                getTermAndCondition={getTermAndCondition}
                isChineseHerbalist={isChineseHerbalist}
                maxAdditionalDocumentAllowed={maxAdditionalDocumentAllowed}
                isTerminatedPatient={isTerminatedPatient}
                terminatedDate={terminatedDate}
                consultationCategoryName={consultationCategoryName}
              />
            </GridItem>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  </Box>
);

MakeClaim.propTypes = {
  classes: PropTypes.exact({
    image: PropTypes.string.isRequired,
  }).isRequired,
  patients: PropTypes.arrayOf(
    PropTypes.exact({
      fullName: PropTypes.string,
      memberId: PropTypes.string,
      status: PropTypes.string,
      terminationDate: PropTypes.string,
    }).isRequired,
  ).isRequired,
  consultationTypes: PropTypes.shape({}).isRequired,
  diagnosisTypes: PropTypes.arrayOf(
    PropTypes.exact({
      key: PropTypes.number.isRequired,
      value: PropTypes.string.isRequired,
      code: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  initialValues: PropTypes.exact({
    patient: PropTypes.exact({
      patientId: PropTypes.string,
      contactNumber: PropTypes.string,
    }),
    claim: PropTypes.exact({
      consultationDate: PropTypes.instanceOf(Date),
      anotherInsurer: PropTypes.bool,
    }),
    receipts: PropTypes.exact({
      files: PropTypes.arrayOf(PropTypes.shape({})),
    }),
    referral: PropTypes.exact({
      files: PropTypes.arrayOf(PropTypes.shape({})),
    }),
    settlementAdvices: PropTypes.exact({
      files: PropTypes.arrayOf(PropTypes.shape({})),
    }),
    prescriptions: PropTypes.exact({
      files: PropTypes.arrayOf(PropTypes.shape({})),
    }),
  }).isRequired,
  selectedClaimId: PropTypes.number,
  anotherInsurerEnabled: PropTypes.bool,
  insuranceClaim: PropTypes.bool,
  maxReceiptAmount: PropTypes.number,
  referralRequired: PropTypes.bool.isRequired,
  loader: PropTypes.exact({
    diagnosis: PropTypes.exact({
      loading: PropTypes.bool.isRequired,
      message: PropTypes.string.isRequired,
    }).isRequired,
    walletBalance: PropTypes.exact({
      loading: PropTypes.bool.isRequired,
      message: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  selectedPatientId: PropTypes.string,
  walletBalance: PropTypes.shape({
    memberToWalletBalanceMap: PropTypes.instanceOf(Object),
    error: PropTypes.bool,
  }).isRequired,
  getMemberProfile: PropTypes.func.isRequired,
  getClaimTypes: PropTypes.func.isRequired,
  getWalletBalance: PropTypes.func.isRequired,
  getTermAndCondition: PropTypes.func.isRequired,
  selectedDiagnosisKey: PropTypes.number,
  isChineseHerbalist: PropTypes.bool.isRequired,
  maxAdditionalDocumentAllowed: PropTypes.number.isRequired,
  isTerminatedPatient: PropTypes.bool.isRequired,
  terminatedDate: PropTypes.string,
  consultationCategoryName: PropTypes.shape({}).isRequired,
};

MakeClaim.defaultProps = {
  selectedClaimId: undefined,
  anotherInsurerEnabled: false,
  insuranceClaim: undefined,
  maxReceiptAmount: undefined,
  selectedPatientId: undefined,
  selectedDiagnosisKey: undefined,
  terminatedDate: undefined,
};

export default withStyles(Styles)(MakeClaim);
