import Images from '../../../constants/images';
import {
  formatAmount,
  formatMessage,
  formatDate,
} from '../../../helpers/helpers';
import { CLAIM_STATUS, CLAIM_TYPES } from '../constant';
import { fetchFile } from '../../../helpers/fetch';
import CONFIG from '../../../constants/config';

const LOCALE_KEY_MAPPINGS = {
  'en-HK': 'benefitDescEng',
  'zh-HK': 'benefitDescSch',
};

const localeFormatterMap = {
  'en-HK': CONFIG.dateFormat,
  'zh-HK': CONFIG.dateCustomChineseFormat,
};

export const formatClaimDate = (intl, date) => {
  const locale = intl ? intl.locale : CONFIG.locales.ENGLISH;
  return formatDate(date, locale, localeFormatterMap[locale]);
};

export const getIntlIdDefaultMessageForAmount = claimItemCategoryCode => {
  if (
    claimItemCategoryCode.toLowerCase() === CLAIM_TYPES.OUTPATIENT.toLowerCase()
  ) {
    return {
      id: 'claims.claimDetails.label.receiptAmount',
      defaultMessage: 'Receipt amount',
    };
  }
  return {
    id: 'claims.claimDetails.label.claimAmount',
    defaultMessage: 'Claim amount',
  };
};

export const getBackgroundImage = statusCode => {
  let imagePath = '';
  if (statusCode === CLAIM_STATUS.PENDING) {
    imagePath = Images.PENDING_CLAIM_BACKGROUND;
  } else if (statusCode === CLAIM_STATUS.REQUEST_FOR_INFORMATION) {
    imagePath = Images.PENDING_CLAIM_BACKGROUND;
  } else if (statusCode === CLAIM_STATUS.APPROVED) {
    imagePath = Images.APPROVED_CLAIM_BACKGROUND;
  } else if (statusCode === CLAIM_STATUS.REJECTED) {
    imagePath = Images.REJECTED_CLAIM_BACKGROUND;
  }
  return imagePath;
};

const formatNegativeAmount = (intl, amount) => {
  const sign = amount < 0 ? '-' : '';
  return `${sign}HK$${formatAmount(intl, Math.abs(amount))}`;
};

export const claimSubmissionDetails = (
  {
    reimbursedAmount,
    settlementDate,
    statusCode,
    isCashlessClaim,
    paymentList = [],
  },
  intl,
) => {
  if (isCashlessClaim) {
    return [];
  }

  let reimbursedAmountDetails = [];
  const reimbursedLabel = formatMessage(
    intl,
    'claims.claimDetails.label.reimbursedItem',
    'Reimbursed Item',
  );
  reimbursedAmountDetails = paymentList.map((payment, index) => ({
    label: `${reimbursedLabel} ${index + 1}`,
    value: `${payment[LOCALE_KEY_MAPPINGS[intl.locale]] ||
      payment[
        LOCALE_KEY_MAPPINGS[CONFIG.locales.ENGLISH]
      ]} ${formatNegativeAmount(intl, payment.reimbursedAmount)}`,
  }));

  return [
    statusCode === CLAIM_STATUS.APPROVED &&
      reimbursedAmount !== 0 && {
        label: formatMessage(
          intl,
          'claims.claimDetails.label.reimbursedAmount',
          'Total Reimbursed amount',
        ),
        value: formatNegativeAmount(intl, reimbursedAmount),
      },

    ...reimbursedAmountDetails,

    (statusCode === CLAIM_STATUS.APPROVED ||
      statusCode === CLAIM_STATUS.REJECTED) &&
      settlementDate && {
        label: formatMessage(
          intl,
          'claims.claimDetails.label.settlementDate',
          'Settlement date',
        ),
        value: formatClaimDate(intl, settlementDate),
      },
  ].filter(Boolean);
};

export const patientDetails = (patientName, intl) => [
  {
    label: formatMessage(
      intl,
      'claims.claimDetails.label.patientName',
      'Patient name',
    ),
    value: patientName,
  },
];

export const claimDetailsWithIntl = (
  {
    claimItemCategoryCode,
    claimAmountOtherInsurer,
    consultationType,
    consultationDate,
    receiptAmount,
    isMaternity,
    isCashlessClaim,
  },
  intl,
) => {
  const { id, defaultMessage } = getIntlIdDefaultMessageForAmount(
    claimItemCategoryCode,
  );
  return [
    {
      label: formatMessage(
        intl,
        'claims.claimDetails.label.consultationType',
        'Consultation type',
      ),
      value: consultationType,
    },
    {
      label: formatMessage(
        intl,
        'claims.claimDetails.label.consultationDate',
        'Consultation date',
      ),
      value: formatClaimDate(intl, consultationDate),
    },
    !isCashlessClaim &&
      receiptAmount !== 0 && {
        label: formatMessage(intl, id, defaultMessage),
        value: formatNegativeAmount(intl, receiptAmount),
      },
    !isCashlessClaim &&
      claimAmountOtherInsurer > 0 && {
        label: formatMessage(
          intl,
          'claims.claimDetails.label.claimAmountFromAnotherInsurer',
          'Claim amount (other insurer)',
        ),
        value: `HK$ ${formatAmount(intl, claimAmountOtherInsurer)}`,
      },
    !isCashlessClaim &&
      isMaternity && {
        label: formatMessage(
          intl,
          'claims.claimDetails.label.benefitType',
          'Benefit Type',
        ),
        value: formatMessage(
          intl,
          'claims.claimDetails.label.maternity',
          'Maternity',
        ),
      },
  ].filter(Boolean);
};

export const getFileUrl = async (contentType, fileUrl) => {
  let blobData = await fetchFile(fileUrl);
  blobData = new Blob([blobData], { type: contentType });
  return URL.createObjectURL(blobData);
};
