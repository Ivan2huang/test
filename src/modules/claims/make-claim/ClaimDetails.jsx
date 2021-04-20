import React, { useEffect, useState } from 'react';
import { Field } from 'redux-form';
import { injectIntl } from 'react-intl';
import * as PropTypes from 'prop-types';

import { Box, withTheme, withStyles } from '@material-ui/core';
import { compose } from 'redux';
import moment from 'moment';

import { addDays, formatAmount, formatMessage } from '../../../helpers/helpers';
import { required, maxLength } from '../../../helpers/validation';
import renderDropdown from '../../../utils/renderDropdown';
import renderDatePicker from '../../../utils/renderDatePicker';
import renderCurrencyInput from '../../../utils/renderCurrencyInput';
import renderCheckbox from '../../../utils/renderCheckbox';
import renderTextField from '../../../utils/renderTextField';
import Typography from '../../../uiComponents/Typography';
import WarningIcon from '../../../icons/WarningLg';
import {
  validateAnotherInsurerAmount,
  validateReceiptAmount,
} from './validation';
import WalletBalance from './WalletBalance';
import { logAction } from '../../../helpers/firebase';
import { CATEGORIES } from '../../../constants/analytics';
import {
  CLAIM_REASON_OTHER_CODE,
  CLAIM_REASON_OTHER_TEXT_MAX_LENGTH,
} from '../constant';

const VALID_CLAIM_DAYS = 90;

export const Styles = () => ({
  maternityBox: {
    backgroundColor: '#e5f3f2',
    borderRadius: 4,
  },
});

const ClaimDetails = ({
  theme,
  classes,
  intl,
  consultationTypes,
  diagnosisTypes,
  selectedClaimId,
  anotherInsurerEnabled,
  insuranceClaim,
  maxReceiptAmount,
  loader,
  fieldChange,
  fieldUntouch,
  getWalletBalance,
  selectedMemberId,
  walletBalance,
  selectedDiagnosisKey,
  isWellnessClaim,
  isMaternity,
  isTerminatedPatient,
  terminatedDate,
  consultationCategoryName,
}) => {
  const { memberToWalletBalanceMap, error: walletBalanceError } = walletBalance;
  const selectedMemberWalletBalance =
    memberToWalletBalanceMap[selectedMemberId];

  const today = moment().toDate();
  let minDate = addDays(-VALID_CLAIM_DAYS);
  let maxDate = moment.utc(terminatedDate).toDate();

  if (isTerminatedPatient) {
    minDate = moment
      .utc(terminatedDate)
      .subtract(VALID_CLAIM_DAYS, 'days')
      .toDate();
  }

  if (!isTerminatedPatient || (isTerminatedPatient && maxDate > today)) {
    maxDate = today;
  }

  const checkShowDiagnosisText = key => {
    const selectedDiagnosis = diagnosisTypes.find(d => d.key === key);
    const selectedCode = selectedDiagnosis ? selectedDiagnosis.code : '';

    return selectedCode === CLAIM_REASON_OTHER_CODE;
  };

  const [isDisplayDiagnosisText, setIsDisplayDiagnosisText] = useState(
    checkShowDiagnosisText(selectedDiagnosisKey),
  );

  const [isDisplayMaternityInfo, setIsDisplayMaternityInfo] = useState(
    isMaternity,
  );

  useEffect(() => {
    const isEmptyWalletBalance = !Object.keys(memberToWalletBalanceMap).length;
    if (isEmptyWalletBalance && isWellnessClaim) {
      getWalletBalance();
    }
  }, [insuranceClaim, selectedClaimId]);

  const onConsultationDateChange = date => {
    fieldChange('claim.consultationDate', date);
  };

  const onReceiptAmountChange = amount => {
    fieldChange('claim.receiptAmount', amount);
  };

  const onOtherInsurerAmountChange = value => {
    fieldChange('claim.otherInsurerAmount', value);
  };

  const toggleAnotherInsurrer = (event, checked) => {
    if (checked) {
      logAction({
        category: CATEGORIES.CLAIMS_SUBMISSION,
        action: 'Made a claim with another insurer',
      });
    } else {
      // reset another claim insurrer
      fieldChange('claim.otherInsurerAmount', '');
      fieldUntouch('claim.otherInsurerAmount');
    }
  };

  const onWalletBalanceRefresh = () => {
    getWalletBalance();
  };

  const getSortedConsultationTypes = () => {
    const sortedConsultationTypes = {};
    Object.keys(consultationTypes).forEach(key => {
      const groupName = consultationCategoryName[key] || key;
      sortedConsultationTypes[groupName] = consultationTypes[key]
        .slice()
        .sort((a, b) => a.value.localeCompare(b.value, intl.locale));
    });
    return sortedConsultationTypes;
  };

  const getSortedDiagnosisTypes = () => {
    if (!diagnosisTypes || diagnosisTypes.length === 0) {
      return diagnosisTypes;
    }

    return diagnosisTypes
      .slice()
      .sort((a, b) => a.value.localeCompare(b.value, intl.locale));
  };

  const onDiagnosisChange = event => {
    const selectedKey = event.target.value;
    const isShow = checkShowDiagnosisText(selectedKey);
    setIsDisplayDiagnosisText(isShow);

    fieldChange('claim.diagnosis', selectedKey);
  };

  const disableDiagnosis = diagnosisTypes.length === 0;

  const requiredReceiptAmount = (...props) =>
    required(...props) && {
      id: 'claims.makeClaimForm.validations.required.receiptAmount',
      defaultMessage: 'Enter a valid amount',
    };

  const formattedMaxReceiptAmount =
    maxReceiptAmount && formatAmount(intl, maxReceiptAmount);

  const amountLabel = isWellnessClaim
    ? formatMessage(
        intl,
        'claims.makeClaimForm.claimAmount.label',
        'Claim amount',
      )
    : formatMessage(
        intl,
        'claims.makeClaimForm.receiptAmount.label',
        'Receipt amount',
      );

  const trackingChangeConsultationType = () => {
    // reset claim amount to pristine when change consultation type
    fieldChange('claim.receiptAmount', '');
    fieldUntouch('claim.receiptAmount');

    logAction({
      category: CATEGORIES.CLAIMS_SUBMISSION,
      action: 'Select consultation type',
    });
  };

  const trackingChangeDiagnosis = () => {
    logAction({
      category: CATEGORIES.CLAIMS_SUBMISSION,
      action: 'Select diagnosis',
    });
  };
  const maxLengthDiagnosisText = value =>
    maxLength(CLAIM_REASON_OTHER_TEXT_MAX_LENGTH, value) && {
      id: 'claims.makeClaimForm.validations.maxlength.diagnosisText',
      defaultMessage: `Must be less than ${CLAIM_REASON_OTHER_TEXT_MAX_LENGTH} characters`,
      values: {
        max: CLAIM_REASON_OTHER_TEXT_MAX_LENGTH,
      },
    };

  const diagnosisChangeHandle = event => {
    onDiagnosisChange(event);
    trackingChangeDiagnosis();
  };

  const requiredDiagnosisText = value =>
    required(value) && {
      id: 'claims.makeClaimForm.validations.required.diagnosisText',
      defaultMessage: 'Enter a diagnosis',
    };

  const renderMaternityInfoBox = () => {
    return (
      <Box
        p={4}
        display="flex"
        className={classes.maternityBox}
        maxWidth={{ md: 348 }}
        data-testid="maternity-box"
      >
        <Box pr={2}>
          <WarningIcon
            fillColor={theme.info}
            fillTextColor={theme.white}
            size={24}
          />
        </Box>
        <Typography fontWeight="normal">
          {formatMessage(
            intl,
            'claims.makeClaimForm.maternityaxa.label',
            'AXA may contact you later for any additional information',
          )}
        </Typography>
      </Box>
    );
  };

  return (
    <>
      <Box mt={14} mb={5}>
        <Typography type="style-3">
          {formatMessage(
            intl,
            'claims.makeClaimForm.claimDetails.title',
            'Claim details',
          )}
        </Typography>
      </Box>

      <Field
        name="consultationDate"
        label={formatMessage(
          intl,
          'claims.makeClaimForm.consultationDate.label',
          'Consultation date',
        )}
        testId="date-consultation"
        helperText={formatMessage(
          intl,
          'claims.makeClaimForm.consultationDate.helperText',
          'Must be less than 90 days ago',
        )}
        errorMessage={formatMessage(
          intl,
          'claims.makeClaimForm.validations.required.consultationDate',
          'Enter a consultation date',
        )}
        minDate={minDate}
        maxDate={maxDate}
        onChange={onConsultationDateChange}
        component={renderDatePicker}
        validate={[required]}
      />

      <Field
        label={formatMessage(
          intl,
          'claims.makeClaimForm.consultationType.label',
          'Consultation type',
        )}
        name="claimId"
        items={getSortedConsultationTypes()}
        displayProperty="value"
        valueProperty="key"
        testId="select-consultation-type"
        group
        errorMessage={formatMessage(
          intl,
          'claims.makeClaimForm.validations.required.consultationType',
          'Select a consultation type',
        )}
        onChange={trackingChangeConsultationType}
        component={renderDropdown}
        validate={[required]}
      />

      <Field
        name="diagnosis"
        label={formatMessage(
          intl,
          'claims.makeClaimForm.diagnosis.label',
          'Diagnosis',
        )}
        items={getSortedDiagnosisTypes()}
        displayProperty="value"
        valueProperty="key"
        testId="select-diagnosis"
        disabled={disableDiagnosis}
        loading={loader.diagnosis.loading}
        errorMessage={formatMessage(
          intl,
          'claims.makeClaimForm.validations.required.diagnosis',
          'Select a diagnosis',
        )}
        onChange={diagnosisChangeHandle}
        component={renderDropdown}
        validate={[required]}
      />

      {isDisplayDiagnosisText && (
        <Field
          name="diagnosisText"
          label={formatMessage(
            intl,
            'claims.makeClaimForm.diagnosisText.label',
            'Specify other diagnosis',
          )}
          testId="input-diagnosis-text"
          component={renderTextField}
          validate={[requiredDiagnosisText, maxLengthDiagnosisText]}
        />
      )}

      {isWellnessClaim && (
        <WalletBalance
          walletBalance={selectedMemberWalletBalance}
          onRefresh={onWalletBalanceRefresh}
          loading={loader.walletBalance.loading}
          error={walletBalanceError}
        />
      )}

      <Field
        label={amountLabel}
        name="receiptAmount"
        testId="input-receipt-amount"
        helperText={
          maxReceiptAmount &&
          formatMessage(
            intl,
            'claims.makeClaimForm.receiptAmount.helperText',
            `Max receipt amount HK$${formattedMaxReceiptAmount}`,
            {
              maxReceiptAmount: formattedMaxReceiptAmount,
            },
          )
        }
        onChange={onReceiptAmountChange}
        component={renderCurrencyInput}
        validate={[requiredReceiptAmount, validateReceiptAmount]}
      />

      <Box mt={6} mb={3}>
        <Field
          label={formatMessage(
            intl,
            'claims.makeClaimForm.isMaternity.label',
            'Related to maternity',
          )}
          name="isMaternity"
          testId="checkbox-maternity-claim-type"
          component={renderCheckbox}
          onChange={(event, checked) => setIsDisplayMaternityInfo(checked)}
        />
      </Box>

      {isDisplayMaternityInfo && renderMaternityInfoBox()}

      <Box mt={6} mb={3}>
        <Field
          label={formatMessage(
            intl,
            'claims.makeClaimForm.anotherInsurer.label',
            'I have made a claim with another insurer for this',
          )}
          name="anotherInsurer"
          testId="input-another-insurer"
          onChange={toggleAnotherInsurrer}
          component={renderCheckbox}
        />
      </Box>

      {anotherInsurerEnabled && (
        <Field
          label={formatMessage(
            intl,
            'claims.makeClaimForm.otherInsurerAmount.label',
            'Claim amount (other insurer)',
          )}
          name="otherInsurerAmount"
          testId="other-insurer-amount"
          helperText={formatMessage(
            intl,
            'claims.makeClaimForm.otherInsurerAmount.helperText',
            'Must be lower than receipt amount',
          )}
          component={renderCurrencyInput}
          onChange={onOtherInsurerAmountChange}
          validate={[required, validateAnotherInsurerAmount]}
        />
      )}
    </>
  );
};

ClaimDetails.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  theme: PropTypes.shape({}).isRequired,
  intl: PropTypes.shape({}).isRequired,
  consultationTypes: PropTypes.shape({}).isRequired,
  diagnosisTypes: PropTypes.arrayOf(
    PropTypes.exact({
      key: PropTypes.number.isRequired,
      value: PropTypes.string.isRequired,
      code: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  loader: PropTypes.exact({
    diagnosis: PropTypes.exact({
      loading: PropTypes.bool.isRequired,
      message: PropTypes.string.isRequired,
    }).isRequired,
    walletBalance: PropTypes.exact({
      loading: PropTypes.bool.isRequired,
      message: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  selectedClaimId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  insuranceClaim: PropTypes.bool,
  maxReceiptAmount: PropTypes.number,
  anotherInsurerEnabled: PropTypes.bool.isRequired,
  fieldChange: PropTypes.func.isRequired,
  fieldUntouch: PropTypes.func.isRequired,
  getWalletBalance: PropTypes.func.isRequired,
  selectedMemberId: PropTypes.string,
  walletBalance: PropTypes.shape({
    memberToWalletBalanceMap: PropTypes.instanceOf(Object).isRequired,
    error: PropTypes.bool.isRequired,
  }).isRequired,
  selectedDiagnosisKey: PropTypes.number,
  isWellnessClaim: PropTypes.bool.isRequired,
  isMaternity: PropTypes.bool,
  isTerminatedPatient: PropTypes.bool.isRequired,
  terminatedDate: PropTypes.string,
  consultationCategoryName: PropTypes.shape({}).isRequired,
};

ClaimDetails.defaultProps = {
  selectedClaimId: undefined,
  insuranceClaim: undefined,
  maxReceiptAmount: undefined,
  selectedMemberId: undefined,
  selectedDiagnosisKey: undefined,
  isMaternity: false,
  terminatedDate: undefined,
};

export default compose(
  withTheme,
  injectIntl,
  withStyles(Styles),
)(ClaimDetails);
