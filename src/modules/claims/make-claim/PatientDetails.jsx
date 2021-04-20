import React from 'react';
import { Field } from 'redux-form';
import * as PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import { Box } from '@material-ui/core';

import { formatMessage } from '../../../helpers/helpers';
import renderDropdown from '../../../utils/renderDropdown';
import renderNumberInput from '../../../utils/renderNumberInput';
import Typography from '../../../uiComponents/Typography';
import { logAction } from '../../../helpers/firebase';
import { CATEGORIES } from '../../../constants/analytics';

const MAX_CONTACT_NO_LENGTH = 20;

const PatientDetails = ({ intl, patients, fieldChange }) => {
  const trackingChangePatientName = () => {
    logAction({
      category: CATEGORIES.CLAIMS_SUBMISSION,
      action: 'Select patient name',
    });
    // reset consultation date
    fieldChange('claim.consultationDate', '');
  };

  return (
    <>
      <Box mb={5}>
        <Typography type="style-3">
          {formatMessage(
            intl,
            'claims.makeClaimForm.patientDetails.title',
            'Patient details',
          )}
        </Typography>
      </Box>
      <Field
        name="patientId"
        label={formatMessage(
          intl,
          'claims.makeClaimForm.patientName.label',
          'Patient name',
        )}
        items={patients}
        displayProperty="fullName"
        valueProperty="memberId"
        testId="select-patient-name"
        onChange={trackingChangePatientName}
        component={renderDropdown}
      />
      <Field
        name="contactNumber"
        label={formatMessage(
          intl,
          'claims.makeClaimForm.contactNumber.label',
          'Contact number',
        )}
        testId="input-contact-number"
        helperText={formatMessage(
          intl,
          'claims.makeClaimForm.contactNumber.helperText',
          'Optional',
        )}
        maxLength={MAX_CONTACT_NO_LENGTH}
        component={renderNumberInput}
      />
    </>
  );
};

PatientDetails.propTypes = {
  intl: PropTypes.shape({}).isRequired,
  patients: PropTypes.arrayOf(
    PropTypes.exact({
      fullName: PropTypes.string,
      memberId: PropTypes.string,
    }).isRequired,
  ).isRequired,
  fieldChange: PropTypes.func.isRequired,
};

export default injectIntl(PatientDetails);
