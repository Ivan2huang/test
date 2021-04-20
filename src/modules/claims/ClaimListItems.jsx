import React from 'react';
import * as PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import { Box, withStyles } from '@material-ui/core';

import { ChevronRightIcon } from '../../icons';
import ClaimStatus from './ClaimStatus';
import Typography from '../../uiComponents/Typography';
import { formatClaimDate } from './claim-details/helper';
import MoreInformationRequired from './MoreInformationRequired';

const Styles = theme => ({
  item: {
    borderBottom: `1px solid ${theme.grey1}`,
  },
});

const ClaimListItems = ({ classes, intl, claims, onItemClick, members }) => {
  return (
    <Box component="ul" p={0} mt={2}>
      {claims.map(claim => (
        <Box
          component="li"
          key={claim.id}
          display="flex"
          py={6}
          classes={{ root: classes.item }}
          data-testid={`claim-item-${claim.id}`}
          onClick={() => onItemClick(claim)}
          alignItems="center"
        >
          <ClaimStatus status={claim.statusCode} />
          <Box flex="1" mx={7}>
            <MoreInformationRequired status={claim.statusCode} />
            <Typography type="style-6">
              {formatClaimDate(intl, claim.consultationDate)}
            </Typography>
            <Typography type="style-6">{claim.consultationTypes}</Typography>
            <Typography type="style-6">{members[claim.patientId]}</Typography>
          </Box>
          <ChevronRightIcon />
        </Box>
      ))}
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
  originalClaim: PropTypes.shape({}),
  isCashlessClaim: PropTypes.bool.isRequired,
};

ClaimListItems.propTypes = {
  classes: PropTypes.exact({
    item: PropTypes.string.isRequired,
  }).isRequired,
  intl: PropTypes.shape({}).isRequired,
  claims: PropTypes.arrayOf(PropTypes.exact(CLAIMS_INTERNAL_FIELDS)).isRequired,
  onItemClick: PropTypes.func.isRequired,
  members: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(Styles)(injectIntl(ClaimListItems));
