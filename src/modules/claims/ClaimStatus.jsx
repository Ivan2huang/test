import React from 'react';
import * as PropTypes from 'prop-types';

import { PendingIcon, ApprovedIcon, RejectedIcon } from '../../icons';
import { CLAIM_STATUS } from './constant';

const ClaimStatus = ({ status }) => {
  const statusIcons = {
    [CLAIM_STATUS.PENDING]: <PendingIcon />,
    [CLAIM_STATUS.REQUEST_FOR_INFORMATION]: <PendingIcon />,
    [CLAIM_STATUS.APPROVED]: <ApprovedIcon />,
    [CLAIM_STATUS.REJECTED]: <RejectedIcon />,
  };

  return statusIcons[status];
};

ClaimStatus.propTypes = {
  status: PropTypes.string.isRequired,
};

export default ClaimStatus;
