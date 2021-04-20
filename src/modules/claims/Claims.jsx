import React, { useEffect } from 'react';
import * as PropTypes from 'prop-types';

import { Box, Card, withStyles } from '@material-ui/core';
import PendingClaims from './PendingClaims';
import ApprovedRejectedClaims from './ApprovedRejectedClaims';
import FilterContainer from './FilterContainer';
import NoFilteredClaims from './NoFilteredClaims';
import { isEmpty } from '../../helpers/helpers';

const Styles = theme => ({
  cardRoot: {
    minHeight: '400px',
    [theme.breakpoints.down('sm')]: {
      minHeight: '500px',
      background: 'unset',
      boxShadow: 'unset',
    },
  },
  approvedClaims: props => {
    return {
      marginTop: theme.spacing(props.pendingClaims.length > 0 ? 18 : 0),
      [theme.breakpoints.down('xs')]: {
        marginTop: theme.spacing(8),
      },
    };
  },
});

const Claims = ({
  classes,
  pendingClaims,
  approvedRejectedClaims,
  appliedFilters,
  getClaims,
  filterClaims,
  getMemberProfile,
  membersMap,
  components: { NoClaims, ClaimsHeader },
}) => {
  const isFiltered = !isEmpty(appliedFilters);

  useEffect(() => {
    if (isFiltered) {
      filterClaims(appliedFilters);
    } else {
      getClaims();
    }
    getMemberProfile();
  }, []);

  if (!(pendingClaims && approvedRejectedClaims && membersMap)) {
    return <></>;
  }
  const hasPending = pendingClaims.length > 0;
  const hasOthers = approvedRejectedClaims.length > 0;
  const hasNoData = !hasPending && !hasOthers;

  if (!isFiltered && hasNoData) {
    return <NoClaims />;
  }
  return (
    <Box mt={{ xs: 10 }}>
      <ClaimsHeader />
      <Box mt={{ xs: 0, md: 10 }}>
        <Card classes={{ root: classes.cardRoot }}>
          <Box px={{ md: 8 }} pb={{ xs: 10 }}>
            <FilterContainer localizeOptionsKeyPrefix="claim.filter.options" />
            {hasNoData ? (
              <NoFilteredClaims />
            ) : (
              <>
                <PendingClaims claims={pendingClaims} members={membersMap} />
                <Box className={classes.approvedClaims}>
                  <ApprovedRejectedClaims
                    claims={approvedRejectedClaims}
                    members={membersMap}
                  />
                </Box>
              </>
            )}
          </Box>
        </Card>
      </Box>
    </Box>
  );
};

const CLAIMS_INTERNAL_FIELDS = {
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
};

Claims.propTypes = {
  pendingClaims: PropTypes.arrayOf(PropTypes.exact(CLAIMS_INTERNAL_FIELDS)),
  approvedRejectedClaims: PropTypes.arrayOf(
    PropTypes.exact(CLAIMS_INTERNAL_FIELDS),
  ),
  membersMap: PropTypes.objectOf(PropTypes.string),
  appliedFilters: PropTypes.shape({}).isRequired,
  getClaims: PropTypes.func.isRequired,
  filterClaims: PropTypes.func.isRequired,
  getMemberProfile: PropTypes.func.isRequired,
  classes: PropTypes.exact({
    cardRoot: PropTypes.string.isRequired,
    approvedClaims: PropTypes.string.isRequired,
  }).isRequired,
  components: PropTypes.shape({
    NoClaims: PropTypes.func,
    ClaimsHeader: PropTypes.func,
  }),
};

Claims.defaultProps = {
  pendingClaims: null,
  approvedRejectedClaims: null,
  membersMap: null,
  components: null,
};

export default withStyles(Styles)(Claims);
