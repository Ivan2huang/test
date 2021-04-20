import React from 'react';
import * as PropTypes from 'prop-types';
import { FieldArray } from 'redux-form';
import { formatMessage } from '../../../helpers/helpers';
import renderUploadDocuments from './renderUploadDocuments';

const uploadSettlementAdvice = ({
  intl,
  onChangeHandle,
  maxAdditionalDocument,
}) => {
  const onUploadChange = files => {
    onChangeHandle('settlementAdvices.files', files);
  };

  return (
    <FieldArray
      name="files"
      id="upload-settlement-advice"
      testId="input-upload-settlement-advice"
      title={formatMessage(
        intl,
        'claims.makeClaimForm.settlementAdvice.title',
        'Settlement Advice',
      )}
      description={formatMessage(
        intl,
        'claims.makeClaimForm.uploadSettlementAdvice.description',
        `Upload up to ${maxAdditionalDocument} files (max 2MB each). We accept JPG or PNG.`,
        {
          maxAdditionalDocument,
        },
      )}
      filePickerLabel={formatMessage(
        intl,
        'claims.makeClaimForm.button.uploadSettlementAdvice',
        'Upload a settlement advice',
      )}
      maxFiles={maxAdditionalDocument}
      fileTypes={['png', 'jpg']}
      onChangeHandle={onUploadChange}
      component={renderUploadDocuments}
    />
  );
};

uploadSettlementAdvice.propTypes = {
  intl: PropTypes.shape({}).isRequired,
  maxAdditionalDocument: PropTypes.number.isRequired,
  onChangeHandle: PropTypes.func.isRequired,
};
export default uploadSettlementAdvice;
