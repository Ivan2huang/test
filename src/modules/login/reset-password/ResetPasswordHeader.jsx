import React from 'react';
import * as PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import { FormattedHTMLMessage, injectIntl } from 'react-intl';

import Typography from '../../../uiComponents/Typography';

const ResetPasswordHeader = ({
  intl,
  userEmail,
  isFirstTimeUser,
  productName,
}) => (
  <>
    <Box mb={4}>
      <Typography type="style-1">
        {isFirstTimeUser
          ? intl.formatMessage(
              {
                id: 'login.resetPassword.onBoarding.header.title',
                defaultMessage: `Set up your ${productName} account`,
              },
              { productName },
            )
          : intl.formatMessage({
              id: 'login.resetPassword.header.title',
              defaultMessage: 'Reset password',
            })}
      </Typography>
    </Box>
    <Box>
      <Typography type="style-6">
        {intl.formatMessage({
          id: 'login.resetPassword.header.forEmail',
          defaultMessage: 'For',
        })}
        &nbsp;
        {userEmail}
        <br />
        <br />
        <FormattedHTMLMessage
          id="password.guideline.header"
          defaultMessage="Your password must contain"
        />
        :
        <br />
        -&nbsp;
        <FormattedHTMLMessage
          id="password.guideline.minimumLength"
          defaultMessage="8 or more characters"
        />
        <br />
        -&nbsp;
        <FormattedHTMLMessage
          id="password.guideline.mixCaseCharacters"
          defaultMessage="Upper and lowercase characters"
        />
        <br />
        -&nbsp;
        <FormattedHTMLMessage
          id="password.guideline.alphanumeric"
          defaultMessage="At least one number"
        />
      </Typography>
    </Box>
  </>
);

ResetPasswordHeader.propTypes = {
  intl: PropTypes.shape({}).isRequired,
  userEmail: PropTypes.string.isRequired,
  isFirstTimeUser: PropTypes.bool.isRequired,
  productName: PropTypes.string,
};

ResetPasswordHeader.defaultProps = {
  productName: '',
};

export default injectIntl(ResetPasswordHeader);
