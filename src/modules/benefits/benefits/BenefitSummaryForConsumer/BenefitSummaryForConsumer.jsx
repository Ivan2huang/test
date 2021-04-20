/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import { Card, Box, makeStyles } from '@material-ui/core';
import TrackingFab from '../../../../uiComponents/TrackingFab';

import Grid from '../../../../uiComponents/Grid';
import GridItem from '../../../../uiComponents/GridItem';
import Typography from '../../../../uiComponents/Typography';
import TrackingDropdown from '../../../../uiComponents/TrackingDropdown';
import { ArrowUpIcon } from '../../../../icons';
import { formatMessage } from '../../../../helpers/helpers';
import { CATEGORIES } from '../../../../constants/analytics';
import {
  benefitNameToKey,
  transformLifeBenefits,
  transformSublimit,
} from '../helper';
import ServiceListForConsumber from './ServiceListForConsumer';
import FootNotes from './FootNotesForConsumer';
import BenefitItems from './BenefitItems';
import BenefitIndex from './BenefitIndex';
import MultilineText from './MultilineText';

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
  headerCell: {
    paddingTop: theme.spacingX(6),
    paddingBottom: theme.spacingX(3),
  },
  annualLimit: {
    border: `1px solid rgba(0, 0, 0, 0.05)`,
    display: `flex`,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  benefitContainer: {
    paddingLeft: theme.spacingX(3),
    paddingRight: theme.spacingX(3),
  },
  mainColumnWrapper: {
    borderBottom: `1px solid rgba(0, 0, 0, 0.05)`,
  },
}));

const NAME_COLUMN_WIDTH = 4;
const DEFAULT_COLUMN_WIDTH = 2;
const columnsWidth = {
  0: [12, 0],
  1: [8, 4],
  2: [4, 4],
  3: [3, 3],
};

const BenefitSummaryForConsumer = ({
  intl,
  benefits,
  members,
  isWalletsDisabled,
}) => {
  if (benefits.length === 0) {
    return '';
  }
  const classes = useStyles({ isWalletsDisabled });
  const [selectedBenefit, setSelectedBenefit] = useState(benefits[0].memberId);
  const { groupLifeBenefits, groupMedicalBenefits } =
    benefits.find(b => b.memberId === selectedBenefit) || {};
  const footNotes = [];

  const handleOnChange = event => {
    setSelectedBenefit(event.target.value);
  };

  const renderHeaderCell = (label, column = 2) => {
    return (
      <GridItem columns={{ md: column }} key={label}>
        <Typography type="style-8">{label}</Typography>
      </GridItem>
    );
  };

  const addFootNotes = data => {
    if (!data) return;
    const { footnoteSuperscript, footnote } = data;
    const isValidData = footnoteSuperscript && footnote;
    const isExisiting = footNotes.find(note => note.footnote === footnote);
    if (isValidData && !isExisiting) {
      footNotes.push({ footnoteSuperscript, footnote });
    }
  };

  const renderBenefitItem = (benefitDetail, columns, benefitIndex) => {
    const {
      benefitType,
      subBenefits = [],
      footnoteSuperscript,
      footnote,
      checkpoint,
    } = benefitDetail;
    const columnCount = columns.filter(Boolean).length;
    const [columnName, otherColumn] = columnsWidth[columnCount];

    addFootNotes({ footnoteSuperscript, footnote });

    return (
      <BenefitItems
        key={benefitIndex}
        subBenefits={subBenefits}
        prefixKey={benefitIndex}
        benefitType={benefitType}
        checkpoint={checkpoint}
        options={{
          columnNameWidth: columnName,
          otherColumnWidth: otherColumn,
          columnsLabel: columns,
        }}
      />
    );
  };

  const renderHeader = columns => {
    const [columnName, otherColumn] = columnsWidth[columns.length];
    return (
      <>
        {renderHeaderCell(
          formatMessage(intl, 'me.tabs.benefits.label.benefit', 'Benefit'),
          columnName,
        )}
        {columns.map(label => renderHeaderCell(label, otherColumn))}
      </>
    );
  };

  const renderBenefitDetails = (benefit, isMobile) => {
    const {
      benefitName,
      panelLabel,
      nonPanelLabel,
      checkpointLabel,
      annualLimitLabel,
      benefitDetails,
      sublimits = [],
      annualLimit,
      fullWidth,
    } = benefit;
    const key = benefitNameToKey(benefitName);

    if (isMobile) {
      return (
        <div key={key} id={key} className={classes.anchor}>
          <ServiceListForConsumber benefit={benefit} />
        </div>
      );
    }

    addFootNotes(annualLimit);

    const transformedSublimits = transformSublimit(sublimits);

    const limitPerYearLabel =
      checkpointLabel ||
      (transformedSublimits.length > 0
        ? formatMessage(
            intl,
            'me.tabs.benefits.label.limitPerYear',
            'Limits per year',
          )
        : '');
    const columns = [panelLabel, nonPanelLabel, limitPerYearLabel];
    const existingColumns = columns.filter(Boolean);
    const columnCount = existingColumns.length;

    const mainColumnWidth = fullWidth
      ? 12
      : DEFAULT_COLUMN_WIDTH * columnCount + NAME_COLUMN_WIDTH;
    const remainColumnWidthWithOutAnnualLimit = 12 - mainColumnWidth;
    const remainColumnWidthWithAnnualLimit =
      remainColumnWidthWithOutAnnualLimit + DEFAULT_COLUMN_WIDTH;
    return (
      <div key={key} id={key} className={classes.anchor}>
        <Typography type="style-3">{benefitName}</Typography>
        <Grid className={classes.benefitContainer}>
          <GridItem columns={{ md: mainColumnWidth }}>
            <Box className={classes.headerCell}>
              <Grid>{renderHeader(existingColumns)}</Grid>
            </Box>
          </GridItem>
          {annualLimitLabel && (
            <>
              <GridItem columns={{ md: DEFAULT_COLUMN_WIDTH }}>
                <Box className={classes.headerCell}>
                  {renderHeaderCell(annualLimitLabel, 12)}
                </Box>
              </GridItem>
              {remainColumnWidthWithAnnualLimit > 0 && (
                <GridItem columns={{ md: remainColumnWidthWithAnnualLimit }} />
              )}
            </>
          )}
          {!annualLimitLabel && (
            <GridItem columns={{ md: remainColumnWidthWithOutAnnualLimit }} />
          )}

          <GridItem
            columns={{ md: mainColumnWidth }}
            className={classes.mainColumnWrapper}
          >
            <Grid>
              {[...benefitDetails, ...transformedSublimits].map(
                (benefitDetail, index) =>
                  renderBenefitItem(benefitDetail, columns, index),
              )}
            </Grid>
          </GridItem>
          {annualLimitLabel && (
            <GridItem
              columns={{ md: DEFAULT_COLUMN_WIDTH }}
              className={classes.annualLimit}
            >
              <MultilineText text={annualLimit.text} />
            </GridItem>
          )}
          {!annualLimitLabel && (
            <GridItem columns={{ md: remainColumnWidthWithOutAnnualLimit }} />
          )}
        </Grid>
      </div>
    );
  };

  const getTrackingUserType = event => {
    const items = members.filter(item => item.memberId === event.target.value);

    return {
      category: CATEGORIES.BENEFITS_PAGE,
      action: `View ${items[0].relationship} benefit`,
    };
  };

  const transformedLifeBenefits = transformLifeBenefits(groupLifeBenefits);

  const benefitList = [
    ...transformedLifeBenefits,
    ...groupMedicalBenefits,
  ].filter(Boolean);

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
            name="viewFor"
            label={formatMessage(
              intl,
              'me.tabs.benefits.label.viewFor',
              'View for',
            )}
            valueProperty="memberId"
            displayProperty="displayName"
            items={members}
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
            <BenefitIndex
              members={members}
              selectedBenefit={selectedBenefit}
              benefitList={benefitList}
            />
          </div>
        </GridItem>
        <GridItem columns={{ md: 12 }}>
          {benefitList &&
            benefitList.map(benefit => renderBenefitDetails(benefit))}
        </GridItem>
        <GridItem columns={{ xs: 12, sm: 12 }}>
          {benefitList &&
            benefitList.map(benefit => renderBenefitDetails(benefit, true))}
        </GridItem>
      </Grid>
      <FootNotes footNotes={footNotes} />
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

BenefitSummaryForConsumer.propTypes = {
  intl: PropTypes.shape({}).isRequired,
  benefits: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  members: PropTypes.arrayOf(
    PropTypes.exact({
      displayName: PropTypes.string.isRequired,
      memberId: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  isWalletsDisabled: PropTypes.bool.isRequired,
};

export default injectIntl(BenefitSummaryForConsumer);
