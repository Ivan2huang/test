import React from 'react';
import * as PropTypes from 'prop-types';
import { FieldArray } from 'redux-form';
import { formatMessage } from '../../../helpers/helpers';
import renderUploadDocuments from './renderUploadDocuments';

const uploadReceipts = ({ intl, onChangeHandle }) => {
  const onUploadReceiptsChange = files => {
    onChangeHandle('receipts.files', files);
  };

  return (
    <FieldArray
      name="files"
      id="upload-receipts"
      testId="input-upload-receipts"
      title={formatMessage(
        intl,
        'claims.makeClaimForm.uploadReceipt.title',
        'Receipts / Referral letter',
      )}
      description={formatMessage(
        intl,
        'claims.makeClaimForm.uploadReceipt.description',
        'Upload up to 5 files (max 2MB each). We accept JPG or PNG.',
      )}
      filePickerLabel={formatMessage(
        intl,
        'claims.makeClaimForm.button.uploadReceipts',
        'Upload receipts / referral letter',
      )}
      maxFiles={5}
      fileTypes={['png', 'jpg']}
      onChangeHandle={onUploadReceiptsChange}
      component={renderUploadDocuments}
    />
  );
};

uploadReceipts.propTypes = {
  intl: PropTypes.shape({}).isRequired,
  onChangeHandle: PropTypes.func.isRequired,
};
export default uploadReceipts;
