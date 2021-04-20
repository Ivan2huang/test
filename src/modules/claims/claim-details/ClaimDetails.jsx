import React, { useEffect } from 'react';
import { injectIntl } from 'react-intl';
import { withRouter } from 'next/router';
import * as PropTypes from 'prop-types';

import { Box, Card, CardContent, withStyles, Button } from '@material-ui/core';

import GridItem from '../../../uiComponents/GridItem';
import Grid from '../../../uiComponents/Grid';
import Typography from '../../../uiComponents/Typography';
import NotificationBox from '../../../uiComponents/NotificationBox';
import { formatMessage } from '../../../helpers/helpers';
import Details from './Details';
import { CLAIM_STATUS, CLAIM_TYPES } from '../constant';
import { NOTIFICATION_TYPES } from '../../../constants/types';
import {
  claimDetailsWithIntl,
  claimSubmissionDetails,
  getBackgroundImage,
  patientDetails,
} from './helper';

import { AlertIcon } from '../../../icons';

const claimStatusDetails = {
  [CLAIM_STATUS.PENDING]: {
    headerId: 'claims.claimDetails.status.processing',
    headerDefaultMessage: 'Processing',
    displayRemark: false,
  },
  [CLAIM_STATUS.REQUEST_FOR_INFORMATION]: {
    headerId: 'claims.claimDetails.status.processing',
    headerDefaultMessage: 'Processing',
    displayRemark: true,
    remarkId: 'claims.claimDetails.status.processing.remark',
    remarkDefaultMessage:
      'More information is required. We will contact you soon.',
    remarkIcon: <AlertIcon size={24} />,
    remarkType: NOTIFICATION_TYPES.ERROR,
  },
  [CLAIM_STATUS.APPROVED]: {
    headerId: 'claims.claimDetails.status.approved',
    headerDefaultMessage: 'Approved',
    displayRemark: false,
  },
  [CLAIM_STATUS.REJECTED]: {
    headerId: 'claims.claimDetails.status.rejected',
    headerDefaultMessage: 'Rejected',
    displayRemark: false,
  },
};

const Styles = theme => ({
  cardRoot: {
    [theme.breakpoints.down('sm')]: {
      background: 'none',
      boxShadow: 'none',
    },
  },
  cardContent: {
    '&:last-child': {
      paddingBottom: theme.spacingX(10),
    },
    [theme.breakpoints.up('md')]: {
      padding: `${theme.spacingX(10)} ${theme.spacingX(9)}`,
      '&:last-child': {
        paddingBottom: theme.spacingX(18),
      },
    },
  },
  remark: {
    backgroundColor: `${theme.grey1}`,
    padding: `${theme.spacingX(3)} ${theme.spacingX(5)}`,
    marginTop: `${theme.spacingX(5)}`,
    display: 'inline-block',
    fontWeight: 500,
  },
  moreInfo: {
    marginTop: theme.spacingX(10),
  },
});

const ClaimDetails = ({
  intl,
  classes,
  router,
  claimDetails,
  membersMap,
  getNewClaimDetails,
  getMemberProfile,
  claims,
}) => {
  const { statusCode, isCashlessClaim, claimItemCategoryCode } = claimDetails;
  const claimType =
    claimItemCategoryCode === CLAIM_TYPES.OUTPATIENT
      ? formatMessage(
          intl,
          'claims.claimDetails.subHeader.outpatient',
          'Outpatient Claim',
        )
      : formatMessage(
          intl,
          'claims.claimDetails.subHeader.wellness',
          'Wellness Claim',
        );

  useEffect(() => {
    getNewClaimDetails(router.query.id, claims);
    getMemberProfile();
  }, []);

  const backgroundImage = getBackgroundImage(statusCode);
  const renderHeader = () => (
    <Box mt={{ xs: 2, md: 0 }} textAlign={{ xs: 'center', md: 'left' }}>
      <Typography type="style-1">
        {formatMessage(
          intl,
          claimStatusDetails[statusCode].headerId,
          claimStatusDetails[statusCode].headerDefaultMessage,
        )}
      </Typography>
      <Typography type="style-6">{claimType}</Typography>
      {!isCashlessClaim && claimDetails.remark && (
        <Typography classes={{ root: classes.remark }}>
          {claimDetails.remark}
        </Typography>
      )}
    </Box>
  );

  const renderRemark = () => {
    return (
      claimStatusDetails[statusCode].displayRemark && (
        <NotificationBox
          className={classes.moreInfo}
          type={claimStatusDetails[statusCode].remarkType}
        >
          <Box pr={2}>{claimStatusDetails[statusCode].remarkIcon}</Box>
          <Typography type="style-5">
            {formatMessage(
              intl,
              claimStatusDetails[statusCode].remarkId,
              claimStatusDetails[statusCode].remarkDefaultMessage,
            )}
          </Typography>
        </NotificationBox>
      )
    );
  };

  return (
    statusCode && (
      <Box mt={{ xs: 9, sm: 9, md: 14 }}>
        <Card classes={{ root: classes.cardRoot }}>
          <CardContent classes={{ root: classes.cardContent }}>
            <Grid>
              <GridItem columns={{ xs: 12, sm: 12, md: 3 }}>
                <Box display="flex" justifyContent="center">
                  <img src={backgroundImage} alt="Background" />
                </Box>
              </GridItem>
              <GridItem offset={{ md: 1 }} columns={{ xs: 12, sm: 12, md: 8 }}>
                {renderHeader()}
                {renderRemark()}
                <Details details={claimSubmissionDetails(claimDetails, intl)} />
                <Details
                  header={formatMessage(
                    intl,
                    'claims.claimDetails.header.patientDetails',
                    'Patient details',
                  )}
                  details={patientDetails(
                    membersMap[claimDetails.claimantId],
                    intl,
                  )}
                />
                <Details
                  header={formatMessage(
                    intl,
                    'claims.claimDetails.header.claimDetails',
                    'Claim details',
                  )}
                  details={claimDetailsWithIntl(claimDetails, intl)}
                />
              </GridItem>
              <GridItem offset={{ md: 4 }} columns={{ xs: 12, sm: 12, md: 3 }}>
                <Box mt={{ xs: 4, md: 4 }}>
                  <Button
                    data-testid="btn-back-to-previous-page"
                    variant="contained"
                    color="primary"
                    onClick={router.back}
                  >
                    {formatMessage(
                      intl,
                      'claims.claimDetails.btn.back',
                      'Back',
                    )}
                  </Button>
                </Box>
              </GridItem>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    )
  );
};

ClaimDetails.propTypes = {
  intl: PropTypes.shape({}).isRequired,
  classes: PropTypes.exact({
    cardRoot: PropTypes.string.isRequired,
    cardContent: PropTypes.string.isRequired,
    remark: PropTypes.string.isRequired,
    moreInfo: PropTypes.string.isRequired,
  }).isRequired,
  router: PropTypes.shape({}).isRequired,
  claimDetails: PropTypes.shape({
    status: PropTypes.string.isRequired,
    statusCode: PropTypes.string.isRequired,
    claimSubmissionDate: PropTypes.string.isRequired,
    claimantId: PropTypes.string.isRequired,
    contactNumber: PropTypes.string.isRequired,
    claimItemCategoryCode: PropTypes.string.isRequired,
    consultationType: PropTypes.string.isRequired,
    receiptAmount: PropTypes.number.isRequired,
    reimbursedAmount: PropTypes.number,
    diagnosis: PropTypes.string.isRequired,
    consultationDate: PropTypes.string.isRequired,
    settlementDate: PropTypes.string,
    claimAmountOtherInsurer: PropTypes.number,
    receipts: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        url: PropTypes.string,
        contentType: PropTypes.string,
      }),
    ).isRequired,
    referrals: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        url: PropTypes.string,
        contentType: PropTypes.string,
      }),
    ).isRequired,
    isCashlessClaim: PropTypes.bool,
    isMaternity: PropTypes.bool,
  }).isRequired,
  membersMap: PropTypes.shape({}).isRequired,
  getNewClaimDetails: PropTypes.func.isRequired,
  getMemberProfile: PropTypes.func.isRequired,
  claims: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default withStyles(Styles)(injectIntl(withRouter(ClaimDetails)));
