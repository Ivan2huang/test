/* eslint-disable no-param-reassign */

import { transformConsultationDate } from './helper';
import { fetchData, uploadFile } from '../../../helpers/fetch';
import URL from '../../../helpers/url';

const transformClaimTypes = claimCategories => {
  const categories = {
    all: [],
    byId: {},
  };
  const types = {
    byId: {},
  };
  const reasons = {
    byId: {},
  };

  claimCategories.forEach(cat => {
    const { claimTypes, ...category } = cat;
    const claimTypeIds = [];

    claimTypes.forEach(({ claimReasons, isActive, ...type }) => {
      if (isActive) {
        const claimReasonIds = [];
        claimReasons.forEach(reason => {
          reasons.byId[reason.id] = reason;
          claimReasonIds.push(reason.id);
        });
        type.isInsuranceClaim = category.isInsuranceClaim;
        type.claimReasonIds = claimReasonIds;
        type.claimCategoryId = category.id;
        types.byId[type.id] = type;
        claimTypeIds.push(type.id);
      }
    });

    if (claimTypeIds.length > 0) {
      category.claimTypeIds = claimTypeIds;
      categories.byId[category.id] = category;
      categories.all.push(category.id);
    }
  });

  return {
    categories,
    types,
    reasons,
  };
};

export const getClaimTypes = async () => {
  const response = await fetchData('get', URL.claimTypes);
  return transformClaimTypes(response);
};

const transformWalletBalanceDetails = ({ member, dependents }) => {
  const memberToWalletBalanceTextMap = {};
  const memberToWalletBalanceMap = {};
  if (member) {
    memberToWalletBalanceMap[member.memberId] = member.balance;
    memberToWalletBalanceTextMap[member.memberId] = member.balanceText;
  }
  if (dependents) {
    dependents.forEach(dependent => {
      const { balance, balanceText } = dependent;
      memberToWalletBalanceMap[dependent.memberId] = balance;
      memberToWalletBalanceTextMap[dependent.memberId] = balanceText;
    });
  }
  return { memberToWalletBalanceMap, memberToWalletBalanceTextMap };
};

export const getWalletBalance = async () => {
  const response = await fetchData('get', URL.walletBalance, null, true);
  if (response.error) {
    return {
      error: true,
    };
  }
  return transformWalletBalanceDetails(response);
};

export const uploadDocument = async (type, document) => {
  const fileFormData = new FormData();
  fileFormData.append('document', document);
  const response = await uploadFile(
    'post',
    `${URL.uploadDocument(type)}`,
    fileFormData,
  );
  return (response && response.documentId) || 'Error';
};

function transformClaimSubmit(formValues, claimType) {
  const {
    receiptFileIds,
    settlementAdvicesFileIds,
    prescriptionsFileIds,
    referralFileIds,
    claim,
    patient,
  } = formValues;
  const {
    receiptAmount,
    claimId,
    diagnosis,
    consultationDate,
    otherInsurerAmount,
    anotherInsurer,
    diagnosisText,
    isMaternity,
  } = claim;
  const { patientId, contactNumber } = patient;

  const receiptDate = transformConsultationDate(consultationDate);

  const selectedClaimType = claimType.types.byId[claimId];
  const selectedClaimReason = claimType.reasons.byId[diagnosis];
  const selectedCategory =
    claimType.categories.byId[selectedClaimType.claimCategoryId];

  let claimFormSubmitData = {
    claimantId: patientId,
    categoryCode: selectedCategory.code,
    reasonCode: selectedClaimReason.code,
    typeCode: selectedClaimType.code,
    amount: receiptAmount,
    acceptTermsAndConditions: true,
    contactNumber,
    receiptDate,
    documents: {
      receipts: receiptFileIds,
      referrals: referralFileIds,
      settlementAdvices: settlementAdvicesFileIds,
      prescriptions: prescriptionsFileIds,
    },
    isMaternity,
  };

  if (anotherInsurer) {
    claimFormSubmitData = {
      ...claimFormSubmitData,
      otherInsurerAmount,
    };
  }

  if (diagnosisText) {
    claimFormSubmitData = {
      ...claimFormSubmitData,
      diagnosisText,
    };
  }

  return claimFormSubmitData;
}

export const submitClaim = async (...props) => {
  const payload = transformClaimSubmit(...props);
  return (
    (await fetchData('post', URL.submitClaim, payload)) || {
      error: 'api call failure',
    }
  );
};
