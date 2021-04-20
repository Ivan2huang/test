import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { injectIntl } from 'react-intl';
import { Box, Button } from '@material-ui/core';

import Grid from '../../../../../uiComponents/Grid';
import GridItem from '../../../../../uiComponents/GridItem';
import Typography from '../../../../../uiComponents/Typography';
import Images from '../../../../../constants/images';
import { formatMessage } from '../../../../../helpers/helpers';
import renderNumberInput from '../../../../../utils/renderNumberInput';
import renderDropdown from '../../../../../utils/renderDropdown';
import validate from './validation';
import { SUPPORTED_COUNTRIES, MAX_PHONE_NUMBER_DIGITS } from '../constant';

const RequestForm = ({ intl, handleSubmit }) => {
  const phoneNumberList = SUPPORTED_COUNTRIES.map(pn => ({
    code: pn.code,
    label: `${pn.code} - ${pn.country}`,
  }));

  const renderNote = () => {
    return (
      <Box display="flex" flexDirection="column" mb={5}>
        <Typography type="style-11">
          {formatMessage(
            intl,
            'me.details.updateMobileNumber.label.note',
            'Note',
          )}
        </Typography>
        <Typography type="style-10">
          {formatMessage(
            intl,
            'me.details.updateMobileNumber.note.description',
            'The app only supports countries in the dropdown. If your mobile number is not supported you may use email for login.',
          )}
        </Typography>
      </Box>
    );
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <Box mt={{ md: 20 }} mb={12}>
        <Grid>
          <GridItem offset={{ xs: 0, md: 1 }} columns={{ md: 5 }}>
            <img src={Images.UPDATE_MOBILE_NUMBER} alt="" />
          </GridItem>
          <GridItem columns={{ xs: 12, md: 6 }}>
            <Box mb={10}>
              <Typography type="style-1">
                {formatMessage(
                  intl,
                  'me.details.updateMobileNumber.label.header',
                  'Change mobile number',
                )}
              </Typography>
            </Box>
            <Grid>
              <GridItem columns={{ xs: 12, md: 10 }}>
                <Typography type="style-5">
                  {formatMessage(
                    intl,
                    'me.details.updateMobileNumber.label.newMobileNumber',
                    'New mobile number',
                  )}
                </Typography>
                <Box display="flex" mt={2}>
                  <Box flex="2" mr={2}>
                    <Field
                      name="newMobileNumberCountryCode"
                      label={formatMessage(
                        intl,
                        'me.details.updateMobileNumber.label.countryCode',
                        'Country Code',
                      )}
                      testId="select-new-mobile-number-country-code"
                      items={phoneNumberList}
                      displayProperty="label"
                      valueProperty="code"
                      component={renderDropdown}
                    />
                  </Box>
                  <Box flex="3">
                    <Field
                      name="newMobileNumber"
                      label={formatMessage(
                        intl,
                        'me.details.updateMobileNumber.label.mobileNumber',
                        'Mobile Number',
                      )}
                      testId="input-new-mobile-number"
                      maxLength={MAX_PHONE_NUMBER_DIGITS}
                      component={renderNumberInput}
                    />
                  </Box>
                </Box>
              </GridItem>
              <GridItem columns={{ xs: 12, md: 10 }}>
                <Typography type="style-5">
                  {formatMessage(
                    intl,
                    'me.details.updateMobileNumber.label.confirmNewMobileNumber',
                    'Confirm mobile number',
                  )}
                </Typography>
                <Box display="flex" mt={2}>
                  <Box flex="2" mr={2}>
                    <Field
                      name="confirmNewMobileNumberCountryCode"
                      label={formatMessage(
                        intl,
                        'me.details.updateMobileNumber.label.countryCode',
                        'Country Code',
                      )}
                      testId="select-confirm-new-mobile-number-country-code"
                      items={phoneNumberList}
                      displayProperty="label"
                      valueProperty="code"
                      component={renderDropdown}
                    />
                  </Box>
                  <Box flex="3">
                    <Field
                      name="confirmNewMobileNumber"
                      label={formatMessage(
                        intl,
                        'me.details.updateMobileNumber.label.mobileNumber',
                        'Mobile Number',
                      )}
                      testId="input-confirm-new-mobile-number"
                      maxLength={MAX_PHONE_NUMBER_DIGITS}
                      component={renderNumberInput}
                    />
                  </Box>
                </Box>
              </GridItem>
              <GridItem columns={{ xs: 12, md: 10 }}>
                <Box display="flex" justifyContent="flex-start" mt={5} mb={10}>
                  <Button
                    type="submit"
                    data-testid="btn-submit-change-mobile-number"
                    color="primary"
                    variant="contained"
                  >
                    {formatMessage(
                      intl,
                      'me.details.updateMobileNumber.btn.submit',
                      'Submit',
                    )}
                  </Button>
                </Box>
                {renderNote()}
              </GridItem>
            </Grid>
          </GridItem>
        </Grid>
      </Box>
    </form>
  );
};

const onSubmit = (values, _, { intl, changeMobileNumber }) => {
  const errorMessage = formatMessage(
    intl,
    'validations.duplicate.phoneNumber',
    'Phone number already existed. Try a new number',
  );
  const newMobileNumber = `${values.newMobileNumberCountryCode} ${values.newMobileNumber}`;
  return new Promise((resolve, reject) => {
    changeMobileNumber(newMobileNumber, errorMessage, reject);
  });
};

RequestForm.propTypes = {
  intl: PropTypes.shape({}).isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

const RequestFormWrapper = reduxForm({
  onSubmit,
  form: 'update-mobile-number-form',
  validate,
})(RequestForm);

export default injectIntl(RequestFormWrapper);
