import React from 'react';
import { injectIntl } from 'react-intl';
import * as PropTypes from 'prop-types';

import { Box, withStyles } from '@material-ui/core';

import Typography from '../../../uiComponents/Typography';
import PolicyDetails from './PolicyDetails';
import BenefitSummery from './BenefitSummary';
import { buildBenefitsSummaryList, buildBenefitMemberList } from './helper';
import { formatMessage } from '../../../helpers/helpers';
import memberStatusType from '../../../types/memberStatusType';
import BenefitSummaryForConsumer from './BenefitSummaryForConsumer';

const Styles = theme => ({
  title: ({ isWalletsDisabled }) => ({
    '&::before': {
      display: 'block',
      content: '""',
      marginTop: theme.spacingX(-(isWalletsDisabled ? 20 : 34)),
      height: theme.spacingX(isWalletsDisabled ? 20 : 34),
      visibility: 'hidden',
      pointerEvents: 'none',
    },
  }),
});

const Benefits = ({
  classes,
  intl,
  memberProfile,
  memberToWalletBalanceMap,
  isWalletsDisabled,
  loaded,
}) => {
  const {
    policy: {
      policyNumber,
      insurer: { myBenefitsName },
      initialDate,
      expiryDate,
      plans,
    },
    consumerBenefits,
  } = memberProfile;

  const isConsumerBenefits = !!consumerBenefits;

  return (
    loaded && (
      <>
        <Box id="myBenefits" className={classes.title}>
          <Typography type="style-2">
            {formatMessage(
              intl,
              'me.tabs.benefits.label.myBenefits',
              'My Benefits',
            )}
          </Typography>
        </Box>
        <Box mt={{ xs: 6, md: 8 }} mb={{ md: 2 }}>
          <PolicyDetails
            insurer={myBenefitsName}
            policyNumber={policyNumber}
            effectiveFrom={initialDate}
            effectiveTo={expiryDate}
          />
        </Box>
        <Box>
          {isConsumerBenefits ? (
            <BenefitSummaryForConsumer
              members={buildBenefitMemberList(intl, memberProfile)}
              benefits={consumerBenefits}
              isWalletsDisabled={isWalletsDisabled}
            />
          ) : (
            <BenefitSummery
              benefitedList={buildBenefitsSummaryList(intl, memberProfile)}
              plans={plans}
              memberToWalletBalanceMap={memberToWalletBalanceMap}
              isWalletsDisabled={isWalletsDisabled}
            />
          )}
        </Box>
      </>
    )
  );
};

Benefits.propTypes = {
  intl: PropTypes.shape({}).isRequired,
  memberProfile: PropTypes.shape({
    fullName: PropTypes.string.isRequired,
    memberId: PropTypes.string.isRequired,
    planId: PropTypes.number.isRequired,
    relationship: PropTypes.string.isRequired,
    relationships: PropTypes.arrayOf(
      PropTypes.shape({
        fullName: PropTypes.string.isRequired,
        planId: PropTypes.number.isRequired,
        memberId: PropTypes.string.isRequired,
        relationship: PropTypes.string.isRequired,
        status: memberStatusType.isRequired,
      }).isRequired,
    ).isRequired,
    policy: PropTypes.exact({
      policyNumber: PropTypes.string.isRequired,
      expiryDate: PropTypes.string.isRequired,
      initialDate: PropTypes.string.isRequired,
      insurer: PropTypes.exact({
        code: PropTypes.number,
        myBenefitsName: PropTypes.string,
        name: PropTypes.string,
      }).isRequired,
      plans: PropTypes.shape({}),
    }).isRequired,
  }).isRequired,
  memberToWalletBalanceMap: PropTypes.shape({}).isRequired,
  isWalletsDisabled: PropTypes.bool.isRequired,
  loaded: PropTypes.bool.isRequired,
};

export default withStyles(Styles)(injectIntl(Benefits));
