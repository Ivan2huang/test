import React from 'react';
import * as PropTypes from 'prop-types';
import { FieldArray } from 'redux-form';
import { formatMessage } from '../../../helpers/helpers';
import renderUploadDocuments from './renderUploadDocuments';

const uploadReferral = ({ intl, onChangeHandle }) => {
  const onUploadReferralChange = files => {
    onChangeHandle('referral.files', files);
  };
  return (
    <FieldArray
      name="files"
      id="upload-referral"
      testId="input-upload-referral"
      title={formatMessage(
        intl,
        'claims.makeClaimForm.uploadReferralLetter.title',
        'Referral Letter',
      )}
      description={formatMessage(
        intl,
        'claims.makeClaimForm.uploadReferralLetter.description',
        'Upload 1 file (max 2MB). We accept PNG or JPG.',
      )}
      info={formatMessage(
        intl,
        'claims.makeClaimForm.uploadReferralLetter.info',
        'Referral letters by the registered medical practitioner are also required.',
      )}
      filePickerLabel={formatMessage(
        intl,
        'claims.makeClaimForm.button.uploadReferralLetter',
        'Upload a referral letter',
      )}
      maxFiles={1}
      fileTypes={['png', 'jpg']}
      onChangeHandle={onUploadReferralChange}
      component={renderUploadDocuments}
    />
  );
};

uploadReferral.propTypes = {
  intl: PropTypes.shape({}).isRequired,
  onChangeHandle: PropTypes.func.isRequired,
};

export default uploadReferral;
