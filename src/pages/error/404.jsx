import React from 'react';
import PropTypes from 'prop-types';

import withIntl from '../../i18n/withIntlProvider';
import Error from '../../modules/error/Error';
import { formatMessage } from '../../helpers/helpers';

const NotFound = ({ intl }) => (
  <Error
    hideBackBtn
    hideHomeBtn
    errorTitle={formatMessage(intl, 'error.notfound.title', 'No records found')}
    errorDesc={formatMessage(
      intl,
      'error.notfound.message',
      'The requested URL was not found on this server. Please make sure you have entered the correct URL.',
    )}
  />
);

NotFound.propTypes = {
  intl: PropTypes.shape({}).isRequired,
};

export default withIntl(NotFound);
