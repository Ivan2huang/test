import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import LayoutContent from './LayoutContent';
import { formatMessage } from '../../../../../helpers/helpers';
import Images from '../../../../../constants/images';

const LinkExpired = ({ intl }) => {
  const title = formatMessage(
    intl,
    'me.details.verifyEmailLinkExpired.label.header',
    'Link expired',
  );

  const description = formatMessage(
    intl,
    'me.details.verifyEmailLinkExpired.label.content',
    'You can login by existing email address and go to Me > Details > Change email address page and click ‘Resend’ to request a new link',
  );
  return (
    <LayoutContent
      title={title}
      description={description}
      backgroundImage={Images.VERIFY_PERSONAL_EMAIL_LINK_EXPIRED_BACKGROUND}
    />
  );
};

LinkExpired.propTypes = {
  intl: PropTypes.shape({}).isRequired,
};

export default injectIntl(LinkExpired);
