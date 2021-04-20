import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Box, Hidden } from '@material-ui/core';

import Typography from '../../uiComponents/Typography';
import Table from '../../uiComponents/Table';
import { navigateTo } from '../../helpers/helpers';
import paths from '../../helpers/paths';
import ClaimListItems from './ClaimListItems';
import { logAction } from '../../helpers/firebase';
import { CATEGORIES } from '../../constants/analytics';
import claimsListColumns from './claimsListColumns';

const ClaimList = ({ intl, header, claims, members }) => {
  const navigateToClaimDetails = claim => {
    const { id } = claim;
    logAction({
      category: CATEGORIES.CLAIMS_PAGE,
      action: `View claim`,
    });
    navigateTo(
      paths.common.claimDetails,
      { id },
      `${paths.common.claimDetails}/${claim.id}`,
    );
  };
  const props = {
    columnDefs: claimsListColumns(intl, members),
    data: claims,
  };
  return (
    <Box>
      <Box>
        <Typography type="style-3">{header}</Typography>
      </Box>
      <Box mt={{ xs: 4 }}>
        <Hidden smDown>
          <Table {...props} hover onRowClick={navigateToClaimDetails} />
        </Hidden>
        <Hidden mdUp>
          <ClaimListItems
            claims={claims}
            members={members}
            onItemClick={navigateToClaimDetails}
          />
        </Hidden>
      </Box>
    </Box>
  );
};

const CLAIMS_INTERNAL_FIELDS = {
  id: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  statusCode: PropTypes.string.isRequired,
  consultationDate: PropTypes.string.isRequired,
  consultationTypes: PropTypes.string.isRequired,
  patientId: PropTypes.string.isRequired,
  claimedAmount: PropTypes.number.isRequired,
  approvedAmount: PropTypes.number,
  originalClaim: PropTypes.shape({}).isRequired,
  isCashlessClaim: PropTypes.bool.isRequired,
};

ClaimList.propTypes = {
  intl: PropTypes.shape({}).isRequired,
  header: PropTypes.string.isRequired,
  claims: PropTypes.arrayOf(PropTypes.exact(CLAIMS_INTERNAL_FIELDS)).isRequired,
  members: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default injectIntl(ClaimList);
