import { fetchData } from '../../helpers/fetch';
import URL from '../../helpers/url';
import { CLAIM_STATUS } from './constant';
import { isEmpty } from '../../helpers/helpers';

export const sortBasedOnCreationDate = unOrderedClaims => {
  return unOrderedClaims.sort((claim1, claim2) => {
    return (
      new Date(claim2.consultationDate) - new Date(claim1.consultationDate)
    );
  });
};

const classifyBasedOnStatus = claims => {
  const pending = [];
  const acceptedAndRejected = [];
  claims.forEach(claim => {
    const { statusCode } = claim;
    if (
      statusCode === CLAIM_STATUS.PENDING ||
      statusCode === CLAIM_STATUS.REQUEST_FOR_INFORMATION
    ) {
      pending.push(claim);
    } else if (
      statusCode === CLAIM_STATUS.APPROVED ||
      statusCode === CLAIM_STATUS.REJECTED
    ) {
      acceptedAndRejected.push(claim);
    }
  });
  return [pending, acceptedAndRejected];
};

const transformClaims = claims => {
  return claims.length > 0
    ? claims.map(originalClaim => {
        const {
          claimId,
          status,
          statusCode,
          receiptDate,
          type,
          claimantId,
          amount,
          approvedAmount,
          isCashlessClaim,
        } = originalClaim;
        return {
          id: claimId,
          status,
          statusCode,
          consultationDate: receiptDate,
          consultationTypes: type,
          patientId: claimantId,
          claimedAmount: amount,
          approvedAmount,
          originalClaim,
          isCashlessClaim,
        };
      })
    : [];
};

export const getClaims = async () => {
  const response = await fetchData('get', URL.claims);
  if (response) {
    return classifyBasedOnStatus(
      sortBasedOnCreationDate(transformClaims(response)),
    );
  }
  return [[], []];
};

export const filterClaims = async params => {
  const url = isEmpty(params) ? URL.claims : URL.filterClaims(params);
  const response = await fetchData('get', url);
  if (response) {
    return classifyBasedOnStatus(
      sortBasedOnCreationDate(transformClaims(response)),
    );
  }
  return [[], []];
};
