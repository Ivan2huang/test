import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import { formatMessage } from '../../helpers/helpers';
import ClaimDetails from './ClaimList';

const ApprovedRejectedClaims = ({ intl, claims, members }) => {
  if (claims.length === 0) return <></>;

  return (
    <ClaimDetails
      header={formatMessage(
        intl,
        'claims.table.claimsHistory',
        'Claims History',
      )}
      claims={claims}
      members={members}
    />
  );
};

ApprovedRejectedClaims.propTypes = {
  intl: PropTypes.shape({}).isRequired,
  claims: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string,
      status: PropTypes.string,
      statusCode: PropTypes.string,
      consultationDate: PropTypes.string,
      consultationTypes: PropTypes.string,
      patientId: PropTypes.string,
      claimedAmount: PropTypes.number,
      approvedAmount: PropTypes.number,
      originalClaim: PropTypes.shape({}),
      isCashlessClaim: PropTypes.bool,
    }),
  ).isRequired,
  members: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default injectIntl(ApprovedRejectedClaims);
