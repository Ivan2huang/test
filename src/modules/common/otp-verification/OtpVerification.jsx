/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { injectIntl } from 'react-intl';
import { Box, Button, withStyles, Link } from '@material-ui/core';
import moment from 'moment';

import { required } from '../../../helpers/validation';
import Grid from '../../../uiComponents/Grid';
import GridItem from '../../../uiComponents/GridItem';
import Typography from '../../../uiComponents/Typography';
import { formatMessage } from '../../../helpers/helpers';
import renderTextField from '../../../utils/renderTextField';
import Images from '../../../constants/images';

const styles = theme => ({
  resendBtn: {
    cursor: 'pointer',
    color: theme.highEmphasis,
  },
  disableResendBtn: {
    cursor: 'not-allowed',
    color: theme.highEmphasis,
  },
  resendText: {
    display: 'inline-block',
  },
});

const VerifyOTPForm = ({
  classes,
  intl,
  headerTitle,
  headerDescription,
  otpStatus,
  resend,
  loading,
  handleSubmit,
  background,
  maxLength,
  validateOtp,
}) => {
  const [counter, setCounter] = useState(0);

  const requiredOTP = value =>
    required(value) &&
    formatMessage(intl, 'validations.otp.required', 'Enter OTP');

  const validOtp = value =>
    validateOtp(value) &&
    formatMessage(intl, 'validations.otp.invalid', 'Invalid OTP');

  const startCounter = counterTime => {
    let count = counterTime;
    setCounter(count);
    const timer = setInterval(() => {
      if (count <= 0) {
        setCounter(0);
        clearInterval(timer);
      } else {
        count -= 1;
        setCounter(count);
      }
    }, 1000);

    return timer;
  };

  useEffect(() => {
    const today = moment();
    const allowedResendDate = moment.utc(otpStatus.nextOtpRequestAllowedAtUtc);

    const duration = Math.round(
      moment.duration(allowedResendDate.diff(today)).asSeconds(),
    );
    const timer = startCounter(duration > 0 ? duration : 0);

    return () => {
      clearInterval(timer);
    };
  }, [otpStatus]);

  const handleResendOTP = async e => {
    e.preventDefault();
    if (loading || counter !== 0) return;
    resend(otpStatus.newValue);
  };

  const renderResend = () => {
    return (
      <Box mt={3}>
        <Box>
          <Typography type="style-6">
            {formatMessage(
              intl,
              'otpVerification.label.resend',
              `Didn’t receive anything? Request for new OTP in: ${counter}`,
              {
                counter,
              },
            )}
          </Typography>
        </Box>
        <Box>
          <Link
            className={!counter ? classes.resendBtn : classes.disableResendBtn}
            href="#"
            onClick={handleResendOTP}
            data-testid="resend-otp"
          >
            <Typography
              className={classes.resendText}
              type="style-5"
              color={!counter ? 'hyperlink' : 'lowEmphasis'}
            >
              {formatMessage(intl, 'otpVerification.btn.resend', 'Resend')}
            </Typography>
          </Link>
        </Box>
      </Box>
    );
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <Box mt={{ md: 20 }} mb={12}>
        <Grid>
          <GridItem offset={{ xs: 0, md: 1 }} columns={{ md: 5 }}>
            <Box textAlign="center">
              <img src={background} alt="" />
            </Box>
          </GridItem>
          <GridItem columns={{ xs: 12, md: 5 }}>
            <Grid>
              <GridItem columns={{ xs: 12, md: 10 }}>
                <Box mb={6}>
                  <Typography type="style-1">{headerTitle}</Typography>
                </Box>
                <Box mb={6}>
                  <Typography type="style-6">{headerDescription}</Typography>
                </Box>
                <Box>
                  <Field
                    name="token"
                    label={formatMessage(
                      intl,
                      'otpVerification.label.enterOTP',
                      'Enter OTP',
                    )}
                    testId="input-token"
                    validate={[requiredOTP, validOtp]}
                    disabled={loading}
                    maxLength={maxLength}
                    component={renderTextField}
                  />
                </Box>
              </GridItem>
              <GridItem columns={{ xs: 12, md: 12 }}>
                {renderResend()}
                <Box display="flex" justifyContent="flex-start" mt={6} mb={10}>
                  <Button
                    type="submit"
                    data-testid="btn-submit-verify-otp"
                    color="primary"
                    variant="contained"
                  >
                    {formatMessage(
                      intl,
                      'otpVerification.btn.verify',
                      'Verify',
                    )}
                  </Button>
                </Box>
              </GridItem>
            </Grid>
          </GridItem>
        </Grid>
      </Box>
    </form>
  );
};

const onSubmit = (values, _, { intl, verify }) => {
  const errorMessage = formatMessage(
    intl,
    'validations.incorrect.otp',
    'Incorrect OTP',
  );
  return new Promise((resolve, reject) => {
    verify(values.token, errorMessage, reject);
  });
};

VerifyOTPForm.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  intl: PropTypes.shape({}).isRequired,
  otpStatus: PropTypes.shape({
    newValue: PropTypes.string,
    nextOTPRequestAllowedAtUtc: PropTypes.string,
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resend: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  headerTitle: PropTypes.string.isRequired,
  headerDescription: PropTypes.string.isRequired,
  background: PropTypes.string,
  maxLength: PropTypes.number,
  validateOtp: PropTypes.func,
};

VerifyOTPForm.defaultProps = {
  loading: false,
  validateOtp: () => false,
  maxLength: undefined,
  background: Images.OTP_VERIFICATION_BACKGROUND,
};

const VerifyOTPFormWrapper = reduxForm({
  destroyOnUnmount: false,
  onSubmit,
})(VerifyOTPForm);

export default injectIntl(withStyles(styles)(VerifyOTPFormWrapper));
