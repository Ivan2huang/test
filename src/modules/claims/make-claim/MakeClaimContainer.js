import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import moment from 'moment';

import MakeClaim from './MakeClaim';
import { getWalletBalance, getClaimTypes, getTermAndCondition } from './action';
import { getMemberProfile } from '../../me';
import { loaderDetail } from '../../loader';
import LOADER from '../../../constants/loader';
import { TERMINATED } from '../../me/constant';
import {
  CONSULTATION_CHINESE_HERBALIST_TYPE,
  DEFAULT_MAX_DOCUMENTS_UPLOAD,
} from '../constant';

const selector = formValueSelector('make-claim');

export const mapStateToProps = ({ claim, me, form, loader }) => {
  const { profile } = me.member;
  const user = {
    fullName: profile.fullName,
    memberId: profile.memberId,
    status: profile.status,
    terminationDate: profile.terminationDate,
    limitedAccessUntil: profile.limitedAccessUntil,
  };

  let isTerminatedPatient = false;
  let terminatedDate;
  const selectedPatientId = selector({ form }, 'patient.patientId');
  const today = moment();
  const patients = [user, ...profile.dependants]
    .filter(patient => {
      if (patient.status !== TERMINATED) {
        return true;
      }
      const limitUntilDate = patient.limitedAccessUntil
        ? moment.utc(patient.limitedAccessUntil, moment.ISO_8601)
        : null;
      return limitUntilDate && limitUntilDate.diff(today) > 0;
    })
    .map(patient => {
      return {
        fullName: patient.fullName,
        memberId: patient.memberId,
        status: patient.status,
        terminationDate: patient.terminationDate,
        limitedAccessUntil: patient.limitedAccessUntil,
      };
    });

  const terminatedPatient = patients.find(p => {
    return p.memberId === selectedPatientId && p.status === TERMINATED;
  });

  if (terminatedPatient) {
    isTerminatedPatient = true;
    terminatedDate = terminatedPatient.terminationDate;
  }

  const { categories, types, reasons, walletBalance } = claim.makeClaim;

  let maxAdditionalDocumentAllowed = DEFAULT_MAX_DOCUMENTS_UPLOAD;
  const selectedClaimId = selector({ form }, 'claim.claimId');
  const consultationCategoryName = {};
  const consultationTypes = categories.all
    .map(categoryId => categories.byId[categoryId])
    .reduce((acc, category) => {
      const { code: categoryCode, claimTypeIds, claimCategory } = category;
      consultationCategoryName[categoryCode] = claimCategory;
      acc[categoryCode] = claimTypeIds.map(claimTypeId => {
        const { id, claimType, code, maxAdditionalDocument } = types.byId[
          claimTypeId
        ];
        if (claimTypeId === selectedClaimId && maxAdditionalDocument) {
          maxAdditionalDocumentAllowed = maxAdditionalDocument;
        }
        return {
          key: id,
          value: claimType,
          code,
        };
      });
      return acc;
    }, {});

  let insuranceClaim;
  let referralRequired = false;
  let maxReceiptAmount;
  let diagnosisTypes = [];
  let isChineseHerbalist = false;

  if (selectedClaimId) {
    const selectedClaim = types.byId[selectedClaimId];
    ({ referralRequired } = selectedClaim);
    insuranceClaim = selectedClaim.isInsuranceClaim;
    maxReceiptAmount = selectedClaim.maxAmountPerClaim;
    diagnosisTypes = selectedClaim.claimReasonIds.map(claimReasonId => {
      const { id, claimReason, code } = reasons.byId[claimReasonId];
      return {
        key: id,
        value: claimReason,
        code,
      };
    });

    if (selectedClaim.code === CONSULTATION_CHINESE_HERBALIST_TYPE) {
      isChineseHerbalist = true;
    }
  }

  return {
    patients,
    consultationTypes,
    diagnosisTypes,
    insuranceClaim,
    maxReceiptAmount,
    referralRequired,
    walletBalance,
    selectedClaimId,
    selectedPatientId,
    selectedDiagnosisKey: selector({ form }, 'claim.diagnosis'),
    anotherInsurerEnabled: selector({ form }, 'claim.anotherInsurer'),
    loader: {
      diagnosis: loaderDetail(loader, LOADER.claimDiagnosis),
      walletBalance: loaderDetail(loader, LOADER.walletBalance),
    },
    initialValues: {
      patient: {
        patientId: profile.memberId,
        contactNumber:
          profile.contactNumber &&
          String(profile.contactNumber).replace(/[+ ]/g, ''),
      },
      claim: {
        anotherInsurer: false,
        consultationDate: null,
      },
      receipts: {
        files: [],
      },
      referral: {
        files: [],
      },
      settlementAdvices: {
        files: [],
      },
      prescriptions: {
        files: [],
      },
    },
    isChineseHerbalist,
    maxAdditionalDocumentAllowed,
    isTerminatedPatient,
    terminatedDate,
    consultationCategoryName,
  };
};

export const mapDispatchToProps = dispatch => ({
  getMemberProfile: () => dispatch(getMemberProfile()),
  getClaimTypes: () => dispatch(getClaimTypes()),
  getWalletBalance: () => dispatch(getWalletBalance()),
  getTermAndCondition: () => dispatch(getTermAndCondition()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MakeClaim);
