/* eslint-disable react/no-array-index-key */
import React from 'react';
import * as PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import { Box, withStyles } from '@material-ui/core';

import Typography from '../../../uiComponents/Typography';
import {
  PanelDocIcon,
  NonPanelDocIcon,
  CheckpointVisitIcon,
} from '../../../icons/me';
import { formatMessage } from '../../../helpers/helpers';

const Styles = theme => ({
  itemBorder: {
    borderTop: `1px solid ${theme.grey1}`,
    paddingTop: theme.spacingX(6),
    '&:nth-child(2)': {
      borderTop: 0,
      paddingTop: theme.spacingX(4),
    },
    '&:last-child': {
      borderBottom: `1px solid ${theme.grey1}`,
      marginBottom: theme.spacingX(6),
    },
  },
});

const ICONS = {
  panelDoctor: <PanelDocIcon />,
  nonPanelDoctor: <NonPanelDocIcon />,
  checkPoints: <CheckpointVisitIcon />,
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
      <Typography type="style-6">{serviceValue}</Typography>
    </Box>
  </Box>
);

ServiceItem.propTypes = {
  iconType: PropTypes.node.isRequired,
  serviceType: PropTypes.string.isRequired,
  serviceValue: PropTypes.string.isRequired,
};

const ServiceList = ({
  intl,
  classes,
  services,
  labels,
  unlimitedCheckpoint,
}) => {
  let previousServiceName = '';
  return services.map(
    (
      {
        name,
        metaText,
        panelVisit,
        nonPanelVisit,
        description,
        checkpointVisits,
      },
      key,
    ) => {
      const isNewService = name !== previousServiceName;
      previousServiceName = name;
      return (
        <Box
          key={`${name}-${key}`}
          className={isNewService ? classes.itemBorder : ''}
        >
          {isNewService && <Typography type="style-5">{name}</Typography>}
          <Typography type="style-6">{metaText}</Typography>
          <Box mt={{ xs: 6 }}>
            <Typography type="style-6">{description}</Typography>
          </Box>
          {!!panelVisit && (
            <ServiceItem
              iconType={ICONS.panelDoctor}
              serviceType={
                labels.panelLabel
                  ? formatMessage(
                      intl,
                      'me.tabs.benefits.label.panelDoctor',
                      `Panel doctor ${labels.panelLabel}`,
                      {
                        value: labels.panelLabel,
                      },
                    )
                  : ''
              }
              serviceValue={panelVisit}
            />
          )}
          {!!nonPanelVisit && !labels.freeChoiceLabel && (
            <ServiceItem
              iconType={ICONS.nonPanelDoctor}
              serviceType={
                labels.nonPanelLabel
                  ? formatMessage(
                      intl,
                      'me.tabs.benefits.label.nonPanelDoctor',
                      `Non panel doctor ${labels.nonPanelLabel}`,
                      {
                        value: labels.nonPanelLabel,
                      },
                    )
                  : ''
              }
              serviceValue={nonPanelVisit}
            />
          )}
          {!!nonPanelVisit && !!labels.freeChoiceLabel && (
            <ServiceItem
              iconType={ICONS.nonPanelDoctor}
              serviceType={formatMessage(
                intl,
                'me.tabs.benefits.label.freeChoiceDoctor',
                `Free choice doctor ${labels.freeChoiceLabel}`,
                {
                  value: labels.freeChoiceLabel,
                },
              )}
              serviceValue={nonPanelVisit}
            />
          )}
          {!!checkpointVisits && (
            <ServiceItem
              iconType={ICONS.checkPoints}
              serviceType={formatMessage(
                intl,
                'me.tabs.benefits.label.checkpointVisit',
                'Checkpoint visits per year¹',
              )}
              serviceValue={
                unlimitedCheckpoint
                  ? formatMessage(
                      intl,
                      'me.tabs.benefits.label.unlimitedCheckpoint',
                      'Unlimited',
                    )
                  : formatMessage(
                      intl,
                      'me.tabs.benefits.label.checkpointVisitValues',
                      `${checkpointVisits.balance} out of ${checkpointVisits.limit} left`,
                      {
                        checkpointVisitsBalance: checkpointVisits.balance,
                        checkpointVisitsLimit: checkpointVisits.limit,
                      },
                    )
              }
            />
          )}
        </Box>
      );
    },
  );
};

ServiceList.propTypes = {
  intl: PropTypes.shape({}).isRequired,
  classes: PropTypes.exact({
    itemBorder: PropTypes.string.isRequired,
  }),
  services: PropTypes.arrayOf(
    PropTypes.exact({
      annualLimit: PropTypes.number,
      annualLimitText: PropTypes.string,
      checkpointVisits: PropTypes.shape(
        PropTypes.exact({
          balance: PropTypes.number.isRequired,
          limit: PropTypes.number.isRequired,
          active: PropTypes.number.isRequired,
        }).isRequired,
      ),
      coPayment: PropTypes.number,
      coPaymentText: PropTypes.string,
      description: PropTypes.string,
      forRelationship: PropTypes.string,
      id: PropTypes.string,
      metaText: PropTypes.string,
      name: PropTypes.string,
      nonPanelVisit: PropTypes.string,
      panelVisit: PropTypes.string,
    }).isRequired,
  ).isRequired,
  labels: PropTypes.exact({
    panelLabel: PropTypes.string,
    nonPanelLabel: PropTypes.string,
    freeChoiceLabel: PropTypes.string,
  }).isRequired,
};

export default injectIntl(withStyles(Styles)(ServiceList));
