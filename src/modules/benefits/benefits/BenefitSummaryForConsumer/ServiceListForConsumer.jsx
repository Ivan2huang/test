/* eslint-disable react/no-array-index-key */
import React, { Fragment } from 'react';
import * as PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import { Box, withStyles } from '@material-ui/core';

import Typography from '../../../../uiComponents/Typography';
import {
  PanelDocIcon,
  NonPanelDocIcon,
  CheckpointVisitIcon,
  SumAssuredIcon,
} from '../../../../icons/me';
import { formatMessage } from '../../../../helpers/helpers';
import { transformSublimit } from '../helper';
import MultilineText from './MultilineText';

const Styles = theme => ({
  benefitItem: {
    borderBottom: `1px solid ${theme.grey1}`,
    marginBottom: theme.spacingX(6),
  },
});

const ICONS = {
  panelDoctor: <PanelDocIcon />,
  nonPanelDoctor: <NonPanelDocIcon />,
  checkPoints: <CheckpointVisitIcon />,
  sumAssured: <SumAssuredIcon />,
};

const ServiceItem = ({ iconType, serviceType, serviceValue }) => (
  <Box my={6} display="flex" alignItems="center">
    {iconType}
    <Box ml={7}>
      {serviceType && (
        <Box mb={{ xs: 2, md: 0 }}>
          <Typography type="style-8">{serviceType}</Typography>
        </Box>
      )}
      <MultilineText text={serviceValue} />
    </Box>
  </Box>
);

ServiceItem.propTypes = {
  iconType: PropTypes.node.isRequired,
  serviceType: PropTypes.string.isRequired,
  serviceValue: PropTypes.string.isRequired,
};

const ServiceListForConsumber = ({ intl, classes, benefit }) => {
  const {
    benefitName,
    panelLabel,
    nonPanelLabel,
    checkpointLabel,
    annualLimitLabel,
    benefitDetails,
    sublimits = [],
    annualLimit,
  } = benefit;

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

  return (
    <Fragment>
      <Typography type="style-3">{benefitName}</Typography>
      {annualLimitLabel && (
        <ServiceItem
          iconType={ICONS.sumAssured}
          serviceType={annualLimitLabel}
          serviceValue={annualLimit.text}
        />
      )}
      {[...benefitDetails, ...transformedSublimits].map(
        (benefitDetail, key) => {
          const {
            benefitType,
            subBenefits = [],
            checkpoint,
            isLifeBenefit,
          } = benefitDetail;
          return (
            <Box key={key} className={classes.benefitItem}>
              <Box mt={{ xs: 4 }}>
                <Typography type="style-5">{benefitType}</Typography>
              </Box>
              {subBenefits.map(({ text, panel, nonPanel }, subKey) => {
                const displayText = isLifeBenefit ? panel : text;
                return (
                  <Fragment key={`${key}_${subKey}`}>
                    <Box mt={{ xs: isLifeBenefit ? 1 : 4 }}>
                      <Typography type="style-6">{displayText}</Typography>
                    </Box>
                    {panel && !isLifeBenefit && (
                      <ServiceItem
                        iconType={ICONS.panelDoctor}
                        serviceType={panelLabel}
                        serviceValue={panel}
                      />
                    )}
                    {nonPanel && (
                      <ServiceItem
                        iconType={
                          isLifeBenefit
                            ? ICONS.sumAssured
                            : ICONS.nonPanelDoctor
                        }
                        serviceType={nonPanelLabel}
                        serviceValue={nonPanel}
                      />
                    )}
                    {checkpoint && !isLifeBenefit && (
                      <ServiceItem
                        iconType={ICONS.checkPoints}
                        serviceType={limitPerYearLabel}
                        serviceValue={checkpoint}
                      />
                    )}
                  </Fragment>
                );
              })}
            </Box>
          );
        },
      )}
    </Fragment>
  );
};

ServiceListForConsumber.propTypes = {
  intl: PropTypes.shape({}).isRequired,
  classes: PropTypes.exact({
    benefitItem: PropTypes.string.isRequired,
  }).isRequired,
  benefit: PropTypes.shape({}).isRequired,
};

export default injectIntl(withStyles(Styles)(ServiceListForConsumber));
