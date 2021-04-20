import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import { Card, makeStyles } from '@material-ui/core';
import TrackingFab from '../../../uiComponents/TrackingFab';

import Grid from '../../../uiComponents/Grid';
import GridItem from '../../../uiComponents/GridItem';
import Typography from '../../../uiComponents/Typography';
import TrackingDropdown from '../../../uiComponents/TrackingDropdown';
import Table from '../../../uiComponents/Table';
import {
  transformBenefitPlans,
  transformSelectedPlanWithMemberDetails,
} from './helper';
import productTableColumnDefs from './ProductTableColumnDefs';
import FootNotes from './FootNotes';
import { ArrowUpIcon } from '../../../icons';
import { formatMessage } from '../../../helpers/helpers';
import ServiceList from './ServiceList';

import { logAction } from '../../../helpers/firebase';
import { CATEGORIES } from '../../../constants/analytics';

const superScriptRegex = /\u2070|\u00b9|\u00b2|\u00b3|\u2074|\u2075|\u2076|\u2077|\u2078|\u2079/g;

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    paddingTop: theme.spacingX(12),
    [theme.breakpoints.up('md')]: {
      paddingLeft: theme.spacingX(12),
      paddingRight: theme.spacingX(12),
      paddingTop: theme.spacingX(10),
      paddingBottom: theme.spacingX(27),
    },

    '&&:last-child': {
      paddingBottom: theme.spacingX(27),
    },

    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacingX(14),

      '&&:last-child': {
        paddingBottom: theme.spacingX(14),
      },
    },
  },
  productLink: {
    textDecoration: 'none',
    display: 'block',
  },
  linkContainer: {
    marginTop: theme.spacingX(5),
    marginBottom: theme.spacingX(10),
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacingX(6),
      marginBottom: theme.spacingX(0),
    },
  },
  anchorLinks: {
    zIndex: 0,
  },
  anchor: ({ isWalletsDisabled }) => ({
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacingX(11),
      marginBottom: theme.spacingX(18),
    },
    '&::before': {
      display: 'block',
      content: '""',
      marginTop: theme.spacingX(-(isWalletsDisabled ? 20 : 34)),
      height: theme.spacingX(isWalletsDisabled ? 20 : 34),
      visibility: 'hidden',
      pointerEvents: 'none',
    },
  }),
  contentHeader: {
    marginBottom: theme.spacingX(6),
    [theme.breakpoints.up('md')]: {
      marginBottom: theme.spacingX(8),
    },
  },
  backToTopButton: {
    position: 'absolute',
    right: theme.spacing(0),
    bottom: theme.spacing(0),
    [theme.breakpoints.up('md')]: {
      right: theme.spacing(12),
      bottom: theme.spacing(13),
    },
  },
}));

const benefitProductString = {
  Outpatient: 'Outpatient',
  HospitalSurgical: 'Hospital & Surgical',
  SupplementalMajorMedical: 'Supplementary major medical',
  MaternitySubsidy: 'Maternity subsidy',
  WellnessFlexibleSpending: 'Wellness fsa',
};

const BenefitSummary = ({
  intl,
  benefitedList,
  plans,
  memberToWalletBalanceMap,
  isWalletsDisabled,
}) => {
  const classes = useStyles({ isWalletsDisabled });
  if (benefitedList.length === 0 || plans.length === 0) {
    return '';
  }
  const [selectedBenefit, setSelectedBenefit] = useState(
    benefitedList[0].memberId,
  );
  const memberAvailableBalance = memberToWalletBalanceMap[selectedBenefit];
  // TODO transformedBenefits should be called once
  const transformedPlans = transformBenefitPlans(plans);
  const benefit = benefitedList.find(
    benefitedItem => benefitedItem.memberId === selectedBenefit,
  );
  const selectedPlanDetails = transformedPlans[benefit.planId];
  const transformedSelectedPlan = transformSelectedPlanWithMemberDetails(
    intl,
    benefit.checkpointVisits,
    selectedPlanDetails,
    memberAvailableBalance,
    benefit.relationship,
  );

  const footNotes =
    transformedSelectedPlan &&
    Object.keys(transformedSelectedPlan)
      .reduce(
        (accumulator, productKey) =>
          accumulator.concat(
            transformedSelectedPlan[productKey].footnote || '',
          ),
        '',
      )
      .split(superScriptRegex);

  const footNotesHalf = Math.floor(footNotes.length / 2);
  const handleOnChange = event => {
    setSelectedBenefit(event.target.value);
  };
  const renderProduct = (
    productKey,
    {
      services,
      name,
      panelLabel,
      nonPanelLabel,
      freeChoiceLabel,
      unlimitedCheckpoint,
    },
    isMobile = false,
  ) => {
    const labels = {
      panelLabel,
      nonPanelLabel,
      freeChoiceLabel,
    };
    const columnDefs = productTableColumnDefs(intl)(
      productKey,
      labels,
      unlimitedCheckpoint,
    );
    return (
      <div key={productKey} id={productKey} className={classes.anchor}>
        <Typography type="style-3">{name}</Typography>
        {isMobile ? (
          <ServiceList
            services={services}
            labels={labels}
            unlimitedCheckpoint={unlimitedCheckpoint}
          />
        ) : (
          columnDefs && (
            <Table
              columnDefs={columnDefs}
              data={services}
              groupBy="name"
              rowTabIndex="-1"
            />
          )
        )}
      </div>
    );
  };

  const getTrackingUserType = event => {
    const items = benefitedList.filter(
      item => item.memberId === event.target.value,
    );

    return {
      category: CATEGORIES.BENEFITS_PAGE,
      action: `View ${items[0].relationship} benefit`,
    };
  };

  const trackingLinkAction = (event, productKey) => {
    const items = benefitedList.filter(
      item => item.memberId === selectedBenefit,
    );
    logAction({
      category: CATEGORIES.BENEFITS_PAGE,
      action: `${benefitProductString[productKey]} for ${items[0].relationship}`,
    });
  };

  return (
    <Card className={classes.root}>
      <Grid>
        <GridItem columns={{ xs: 12, sm: 12, md: 12 }}>
          <Typography type="style-3" className={classes.contentHeader}>
            {formatMessage(
              intl,
              'me.tabs.benefits.label.benefitsSummary',
              'Benefits Summary',
            )}
          </Typography>
        </GridItem>
        <GridItem columns={{ xs: 12, sm: 12, md: 12 }}>
          <TrackingDropdown
            label={formatMessage(
              intl,
              'me.tabs.benefits.label.viewFor',
              'View for',
            )}
            valueProperty="memberId"
            displayProperty="displayName"
            items={benefitedList}
            value={selectedBenefit}
            testId="select-benefit-plan"
            onChange={handleOnChange}
            getTrackingData={getTrackingUserType}
          />
        </GridItem>
        <GridItem
          columns={{ xs: 12, sm: 12, md: 12 }}
          className={classes.anchorLinks}
        >
          <div className={classes.linkContainer}>
            {Object.keys(transformedSelectedPlan).map(productKey => (
              <Typography
                onClick={e => trackingLinkAction(e, productKey)}
                key={`link-${productKey}`}
                href={`#${productKey}`}
                type="style-4"
                color="hyperlink"
                className={classes.productLink}
                component="a"
                data-testid={`product-link-${productKey}`}
              >
                {transformedSelectedPlan[productKey].name}
              </Typography>
            ))}
          </div>
        </GridItem>
        <GridItem columns={{ md: 12 }}>
          {Object.keys(transformedSelectedPlan).map(productKey =>
            renderProduct(productKey, transformedSelectedPlan[productKey]),
          )}
        </GridItem>
        <GridItem columns={{ xs: 12, sm: 12 }}>
          {Object.keys(transformedSelectedPlan).map(productKey =>
            renderProduct(
              productKey,
              transformedSelectedPlan[productKey],
              true,
            ),
          )}
        </GridItem>
      </Grid>
      <FootNotes footNotes={footNotes} footNotesHalf={footNotesHalf} />
      <TrackingFab
        color="primary"
        component="a"
        href="#myBenefits"
        trackingData={null}
        className={classes.backToTopButton}
      >
        <ArrowUpIcon />
      </TrackingFab>
    </Card>
  );
};

BenefitSummary.propTypes = {
  intl: PropTypes.shape({}).isRequired,
  benefitedList: PropTypes.arrayOf(
    PropTypes.exact({
      checkpointVisits: PropTypes.arrayOf(
        PropTypes.exact({
          serviceId: PropTypes.string.isRequired,
          usedCount: PropTypes.number.isRequired,
        }).isRequired,
      ),
      displayName: PropTypes.string.isRequired,
      planId: PropTypes.number.isRequired,
      memberId: PropTypes.string.isRequired,
      relationship: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  plans: PropTypes.shape({}).isRequired,
  memberToWalletBalanceMap: PropTypes.shape({}).isRequired,
  isWalletsDisabled: PropTypes.bool.isRequired,
};

export default injectIntl(BenefitSummary);
