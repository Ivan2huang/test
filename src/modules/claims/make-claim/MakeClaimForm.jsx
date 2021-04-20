import React, { useEffect } from 'react';
import * as PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { FormSection, reduxForm, SubmissionError } from 'redux-form';

import { Box } from '@material-ui/core';
import TrackingButton from '../../../uiComponents/TrackingButton';
import Typography from '../../../uiComponents/Typography';
import { formatMessage, isEmpty, navigateTo } from '../../../helpers/helpers';
import paths from '../../../helpers/paths';
import { validate } from './validation';
import PatientDetails from './PatientDetails';
import ClaimDetails from './ClaimDetails';
import UploadReceipts from './uploadReceipts';
import UploadReferral from './uploadReferral';
import UploadSettlementAdvice from './uploadSettlementAdvice';
import UploadPrescription from './uploadPrescription';
import { CATEGORIES } from '../../../constants/analytics';

const MakeClaimForm = ({
  intl,
  patients,
  planId,
  consultationTypes,
  diagnosisTypes,
  selectedClaimId,
  anotherInsurerEnabled,
  insuranceClaim,
  maxReceiptAmount,
  referralRequired,
  loader,
  selectedPatientId,
  walletBalance,
  change,
  untouch,
  getMemberProfile,
  getClaimTypes,
  getWalletBalance,
  getTermAndCondition,
  handleSubmit,
  selectedDiagnosisKey,
  isMaternity,
  isChineseHerbalist,
  maxAdditionalDocumentAllowed,
  isTerminatedPatient,
  terminatedDate,
  consultationCategoryName,
}) => {
  useEffect(() => {
    getMemberProfile();
    getTermAndCondition();
  }, []);

  useEffect(() => {
    getClaimTypes();
  }, [intl]);

  const isWellnessSelected =
    consultationTypes.wellness &&
    consultationTypes.wellness.find(type => type.key === selectedClaimId);
  const isWellnessClaim = !!(
    selectedClaimId &&
    (!insuranceClaim || isWellnessSelected)
  );
  const { memberToWalletBalanceMap } = walletBalance;
  const isSubmitDisabled =
    isWellnessClaim && memberToWalletBalanceMap[selectedPatientId] === 0;

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <FormSection name="patient">
        <PatientDetails patients={patients} fieldChange={change} />
      </FormSection>
      <FormSection name="claim">
        <ClaimDetails
          planId={planId}
          consultationTypes={consultationTypes}
          diagnosisTypes={diagnosisTypes}
          selectedClaimId={selectedClaimId}
          anotherInsurerEnabled={anotherInsurerEnabled}
          insuranceClaim={insuranceClaim}
          maxReceiptAmount={maxReceiptAmount}
          loader={loader}
          fieldChange={change}
          fieldUntouch={untouch}
          getWalletBalance={getWalletBalance}
          selectedMemberId={selectedPatientId}
          walletBalance={walletBalance}
          selectedDiagnosisKey={selectedDiagnosisKey}
          isWellnessClaim={isWellnessClaim}
          isMaternity={isMaternity}
          isTerminatedPatient={isTerminatedPatient}
          terminatedDate={terminatedDate}
          consultationCategoryName={consultationCategoryName}
        />
      </FormSection>
      <FormSection name="receipts">
        <UploadReceipts intl={intl} onChangeHandle={change} />
      </FormSection>

      {referralRequired && (
        <FormSection name="referral">
          <UploadReferral intl={intl} onChangeHandle={change} />
        </FormSection>
      )}

      {anotherInsurerEnabled && (
        <FormSection name="settlementAdvices">
          <UploadSettlementAdvice
            intl={intl}
            onChangeHandle={change}
            maxAdditionalDocument={maxAdditionalDocumentAllowed}
          />
        </FormSection>
      )}

      {isChineseHerbalist && (
        <FormSection name="prescriptions">
          <UploadPrescription
            intl={intl}
            onChangeHandle={change}
            maxAdditionalDocument={maxAdditionalDocumentAllowed}
          />
        </FormSection>
      )}

      {(anotherInsurerEnabled || isChineseHerbalist) && (
        <Box mt={4}>
          <Typography type="style-6">
            {formatMessage(
              intl,
              'claim.makeClaim.document.referralLetters',
              'Referral letters by the registered medical practitioner are also required.',
            )}
          </Typography>
        </Box>
      )}

      <Box mt={14}>
        <Typography type="style-6">
          {formatMessage(
            intl,
            'claim.makeClaim.document.info',
            'Make sure your documents are clear and legible.',
          )}
        </Typography>
      </Box>

      <Box display="flex" justifyContent="flex-start" mt={14}>
        <TrackingButton
          type="submit"
          data-testid="btn-submit-claim"
          color="primary"
          variant="contained"
          disabled={isSubmitDisabled}
          trackingData={{
            category: CATEGORIES.CLAIMS_PAGE,
            action: 'Submit claims',
          }}
        >
          {formatMessage(intl, 'claims.makeClaimForm.button.submit', 'Submit')}
        </TrackingButton>
      </Box>
    </form>
  );
};

MakeClaimForm.propTypes = {
  intl: PropTypes.shape({}).isRequired,
  planId: PropTypes.string,
  consultationTypes: PropTypes.shape({}).isRequired,
  selectedClaimId: PropTypes.number,
  anotherInsurerEnabled: PropTypes.bool.isRequired,
  maxReceiptAmount: PropTypes.number,
  insuranceClaim: PropTypes.bool,
  referralRequired: PropTypes.bool.isRequired,
  selectedPatientId: PropTypes.string,
  patients: PropTypes.arrayOf(
    PropTypes.exact({
      fullName: PropTypes.string,
      memberId: PropTypes.string,
    }).isRequired,
  ).isRequired,
  diagnosisTypes: PropTypes.arrayOf(
    PropTypes.exact({
      key: PropTypes.number.isRequired,
      value: PropTypes.string.isRequired,
      code: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
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
  walletBalance: PropTypes.shape({
    memberToWalletBalanceMap: PropTypes.instanceOf(Object),
    error: PropTypes.bool,
  }).isRequired,
  change: PropTypes.func.isRequired,
  untouch: PropTypes.func.isRequired,
  getMemberProfile: PropTypes.func.isRequired,
  getClaimTypes: PropTypes.func.isRequired,
  getWalletBalance: PropTypes.func.isRequired,
  getTermAndCondition: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  selectedDiagnosisKey: PropTypes.number,
  isMaternity: PropTypes.bool,
  isChineseHerbalist: PropTypes.bool.isRequired,
  maxAdditionalDocumentAllowed: PropTypes.number.isRequired,
  isTerminatedPatient: PropTypes.bool.isRequired,
  terminatedDate: PropTypes.string,
  consultationCategoryName: PropTypes.shape({}).isRequired,
};

MakeClaimForm.defaultProps = {
  planId: undefined,
  selectedClaimId: undefined,
  insuranceClaim: undefined,
  maxReceiptAmount: undefined,
  selectedPatientId: undefined,
  selectedDiagnosisKey: undefined,
  isMaternity: false,
  terminatedDate: undefined,
};

const onSubmit = (values, _, props) => {
  const errors = validate(values, props);
  if (!isEmpty(errors)) {
    throw new SubmissionError(errors);
  }

  navigateTo(paths.common.claimReview);
};

const MakeClaimFormWrapper = reduxForm({
  enableReinitialize: true,
  destroyOnUnmount: false,
  keepDirtyOnReinitialize: true,
  onSubmit,
  form: 'make-claim',
})(MakeClaimForm);

export default injectIntl(MakeClaimFormWrapper);
