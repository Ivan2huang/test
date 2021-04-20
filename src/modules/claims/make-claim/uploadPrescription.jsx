import React from 'react';
import * as PropTypes from 'prop-types';
import { FieldArray } from 'redux-form';
import { formatMessage } from '../../../helpers/helpers';
import renderUploadDocuments from './renderUploadDocuments';

const uploadPrescription = ({
  intl,
  onChangeHandle,
  maxAdditionalDocument,
}) => {
  const onUploadChange = files => {
    onChangeHandle('prescriptions.files', files);
  };

  return (
    <FieldArray
      name="files"
      id="upload-prescriptions"
      testId="input-upload-prescriptions"
      title={formatMessage(
        intl,
        'claims.makeClaimForm.prescriptions.title',
        'Prescription / Supporing Documents',
      )}
      description={formatMessage(
        intl,
        'claims.makeClaimForm.uploadPrescription.description',
        `Upload up to ${maxAdditionalDocument} files (max 2MB each). We accept PDF, JPG, TIFF, PNG or HEIC.`,
        {
          maxAdditionalDocument,
        },
      )}
      filePickerLabel={formatMessage(
        intl,
        'claims.makeClaimForm.button.uploadPrescription',
        'Upload a prescription / supporing documents',
      )}
      maxFiles={maxAdditionalDocument}
      fileTypes={['png', 'jpg']}
      onChangeHandle={onUploadChange}
      component={renderUploadDocuments}
    />
  );
};

uploadPrescription.propTypes = {
  intl: PropTypes.shape({}).isRequired,
  maxAdditionalDocument: PropTypes.number.isRequired,
  onChangeHandle: PropTypes.func.isRequired,
};
export default uploadPrescription;
