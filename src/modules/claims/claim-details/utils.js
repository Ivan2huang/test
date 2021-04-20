import URL from '../../../helpers/url';
import { formatDate } from '../../../helpers/helpers';
import { getFileUrl } from './helper';

export const getDocumentsDetails = async attachments => {
  const fileAttachments = attachments.reduce((details, attachment) => {
    details.push({
      name: attachment.fileName,
      url: URL.claimDocument(attachment.id),
      contentType: attachment.contentType,
    });

    return details;
  }, []);

  return Promise.all(
    fileAttachments.map(async file => {
      // eslint-disable-next-line no-param-reassign
      file.url = await getFileUrl(file.contentType, file.url);
      return file;
    }),
  );
};

export const transformClaimDetails = async ({
  status,
  statusCode,
  createdOn,
  claimantId,
  contactNumber,
  type,
  categoryCode,
  reason,
  receiptDate,
  amount,
  approvedAmount,
  lastUpdatedOn,
  otherInsurerAmount,
  remark,
  documents,
  isCashlessClaim,
  paymentList,
}) => {
  const fetchedDocuments = {
    receipts: await getDocumentsDetails(
      (documents && documents.receipts) || [],
    ),
    referrals: await getDocumentsDetails(
      (documents && documents.referrals) || [],
    ),
  };
  return {
    status,
    statusCode,
    claimSubmissionDate: formatDate(createdOn),
    claimantId,
    contactNumber,
    claimItemCategoryCode: categoryCode,
    consultationType: type,
    diagnosis: reason,
    consultationDate: formatDate(receiptDate),
    receiptAmount: amount,
    reimbursedAmount: approvedAmount,
    settlementDate: formatDate(lastUpdatedOn),
    claimAmountOtherInsurer: otherInsurerAmount,
    remark,
    isCashlessClaim,
    ...fetchedDocuments,
    paymentList,
  };
};
