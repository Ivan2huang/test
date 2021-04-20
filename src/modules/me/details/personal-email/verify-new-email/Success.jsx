import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import LayoutContent from './LayoutContent';
import { formatMessage } from '../../../../../helpers/helpers';
import Images from '../../../../../constants/images';

const Success = ({ intl }) => {
  const title = formatMessage(
    intl,
    'me.details.verifyEmailSuccess.label.header',
    'Successfully Verified',
  );

  const description = formatMessage(
    intl,
    'me.details.verifyEmailSuccess.label.content',
    'Launch the app to login with your new email address.',
  );
  return (
    <LayoutContent
      title={title}
      description={description}
      backgroundImage={Images.VERIFY_PERSONAL_EMAIL_SUCCESS}
    />
  );
};

Success.propTypes = {
  intl: PropTypes.shape({}).isRequired,
};

export default injectIntl(Success);
