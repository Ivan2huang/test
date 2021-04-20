import moment from 'moment';
import {
  formatAmount,
  formatMessage,
  formatDate,
} from '../../../helpers/helpers';
import { DATE_WITHOUT_ZONE } from '../constant';

export const patientDetails = (patientName, contactNumber, intl) => [
  {
    label: formatMessage(
      intl,
      'claims.claimDetails.label.patientName',
      'Patient name',
    ),
    value: patientName,
  },
  {
    label: formatMessage(
      intl,
      'claims.claimDetails.label.contactNumber',
      'Contact number',
    ),
    value: contactNumber || '-',
  },
];

export const claimDetails = (
  {
    claim: {
      anotherInsurer,
      consultationDate,
      receiptAmount,
      isMaternity,
      otherInsurerAmount,
      diagnosisText,
    },
    consultationType,
    selectedClaimReason,
  },
  intl,
) => {
  const diagnosis = [selectedClaimReason, diagnosisText]
    .filter(Boolean)
    .join(' - ');
  return [
    {
      label: formatMessage(
        intl,
        'claims.claimDetails.label.consultationDate',
        'Consultation date',
      ),
      value: formatDate(consultationDate),
    },
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
        'claims.claimDetails.label.diagnosis',
        'Diagnosis',
      ),
      value: diagnosis,
    },
    {
      label: formatMessage(
        intl,
        'claims.claimDetails.label.receiptAmount',
        'Receipt amount',
      ),
      value: `HK$ ${formatAmount(intl, receiptAmount)}`,
    },
    {
      label: formatMessage(
        intl,
        'claims.claimReview.isMaternity.label',
        'Related to maternity?',
      ),
      value: isMaternity
        ? formatMessage(intl, 'claims.claimReview.isMaternity.yes', 'Yes')
        : formatMessage(intl, 'claims.claimReview.isMaternity.no', 'No'),
    },
    (anotherInsurer && otherInsurerAmount) > 0 && {
      label: formatMessage(
        intl,
        'claims.claimDetails.label.claimAmountFromAnotherInsurer',
        'Claim amount (other insurer)',
      ),
      value:
        otherInsurerAmount > 0 &&
        `HK$ ${formatAmount(intl, otherInsurerAmount)}`,
    },
  ].filter(Boolean);
};

export const transformConsultationDate = date =>
  moment(date, moment.ISO_8601)
    .startOf('day')
    .format(DATE_WITHOUT_ZONE);
