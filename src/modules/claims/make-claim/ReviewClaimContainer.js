import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';

import ReviewClaim from './ReviewClaim';
import {
  submitClaim,
  updateTNCModal,
  updateTNCAction,
  updatePreviewModal,
} from './action';
import { membersSelector } from '../selector';
import { CONSULTATION_CHINESE_HERBALIST_TYPE } from '../constant';

const selector = formValueSelector('make-claim');
const getValue = (form, id) => selector({ form }, id);

const defaultState = {
  patient: null,
  claimData: null,
};

export const mapStateToProps = ({ claim, me, form }) => {
  const membersMap = membersSelector(me);
  const {
    types,
    reasons,
    tncModal,
    previewModal,
    termAndCondition,
  } = claim.makeClaim;

  const selectedPatientId = getValue(form, 'patient.patientId');
  if (!selectedPatientId) {
    return defaultState;
  }

  const contactNumber = getValue(form, 'patient.contactNumber');
  const claimId = getValue(form, 'claim.claimId');
  const selectedConsultationType = types.byId[claimId];
  const diagnosis = getValue(form, 'claim.diagnosis');
  const selectedClaimReason = reasons.byId[diagnosis];
  const diagnosisText = getValue(form, 'claim.diagnosisText');
  const consultationDate = getValue(form, 'claim.consultationDate');
  const receiptAmount = getValue(form, 'claim.receiptAmount');
  const isMaternity = getValue(form, 'claim.isMaternity') || false;
  const otherInsurerAmount = getValue(form, 'claim.otherInsurerAmount');
  const anotherInsurer = getValue(form, 'claim.anotherInsurer');

  const { referralRequired } = selectedConsultationType;
  const isChineseHerbalist =
    selectedConsultationType.code === CONSULTATION_CHINESE_HERBALIST_TYPE;

  const receipts = getValue(form, 'receipts');
  const referral = getValue(form, 'referral');
  const settlementAdvices = getValue(form, 'settlementAdvices');
  const prescriptions = getValue(form, 'prescriptions');

  return {
    tncModal,
    previewModal,
    patient: {
      patientId: selectedPatientId,
      patientName: membersMap[selectedPatientId],
      contactNumber,
    },
    claimData: {
      claim: {
        anotherInsurer,
        consultationDate,
        claimId,
        diagnosis,
        diagnosisText,
        receiptAmount,
        isMaternity,
        otherInsurerAmount,
      },
      consultationType: selectedConsultationType.claimType,
      selectedClaimReason: selectedClaimReason.claimReason,
      anotherInsurerEnabled: anotherInsurer,
      referralRequired,
      isChineseHerbalist,
      receipts,
      referral,
      settlementAdvices,
      prescriptions,
    },
    termAndCondition,
  };
};

export const mapDispatchToProps = dispatch => ({
  submitClaim: (claimData, loaderMessage) =>
    dispatch(submitClaim(claimData, loaderMessage)),
  updatePreviewModal: modalState => dispatch(updatePreviewModal(modalState)),
  updateTNCModal: modalState => dispatch(updateTNCModal(modalState)),
  updateTNCAction: tncAction => dispatch(updateTNCAction(tncAction)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReviewClaim);
