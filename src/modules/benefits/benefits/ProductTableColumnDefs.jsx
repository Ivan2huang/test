import React from 'react';
import Typography from '../../../uiComponents/Typography';
import { formatMessage } from '../../../helpers/helpers';

const createProductTableColumnDefs = intl => (
  productKey,
  labels,
  unlimitedCheckpoint,
) => {
  const columnDef = {
    service: {
      name: formatMessage(intl, 'me.tabs.benefits.label.service', 'Service'),
      template: row => (
        <>
          <Typography type="style-5" color="highEmphasis">
            {row.name}
          </Typography>
          <Typography type="style-6">{row.metaText}</Typography>
        </>
      ),
      pivotColumn: true,
    },
    panelDoctor: {
      name: formatMessage(
        intl,
        'me.tabs.benefits.label.panelDoctor',
        `Panel doctor {value}`,
        {
          value: labels.panelLabel,
        },
      ),
      template: row => row.panelVisit,
    },
    nonPanelDoctor: {
      name: formatMessage(
        intl,
        'me.tabs.benefits.label.nonPanelDoctor',
        `Non panel doctor {value}`,
        {
          value: labels.nonPanelLabel,
        },
      ),
      template: row => row.nonPanelVisit,
    },
    freeChoiceDoctor: {
      name: formatMessage(
        intl,
        'me.tabs.benefits.label.freeChoiceDoctor',
        `Free choice doctor {value}`,
        {
          value: labels.freeChoiceLabel,
        },
      ),
      template: row => row.nonPanelVisit,
    },
    checkPoints: {
      name: formatMessage(
        intl,
        'me.tabs.benefits.label.checkpointVisit',
        'Checkpoint visits per year¹',
      ),
      template: row => {
        if (!row.checkpointVisits) {
          return '';
        }

        return unlimitedCheckpoint
          ? formatMessage(
              intl,
              'me.tabs.benefits.label.unlimitedCheckpoint',
              'Unlimited',
            )
          : formatMessage(
              intl,
              'me.tabs.benefits.label.checkpointVisitValues',
              '{checkpointVisitsBalance} out of {checkpointVisitsLimit} left',
              {
                checkpointVisitsBalance: row.checkpointVisits.balance,
                checkpointVisitsLimit: row.checkpointVisits.limit,
              },
            );
      },
    },
    description: {
      name: formatMessage(
        intl,
        'me.tabs.benefits.label.description',
        'Description',
      ),
      template: row => row.description || '',
    },
  };

  const productTableColumnDefs = {
    OutpocketMaximumLimit: [
      columnDef.service,
      columnDef.description,
      columnDef.panelDoctor,
      columnDef.nonPanelDoctor,
    ],
    Outpatient: [
      columnDef.service,
      columnDef.panelDoctor,
      columnDef.nonPanelDoctor,
      columnDef.checkPoints,
    ],
    HospitalSurgical: [
      columnDef.service,
      columnDef.description,
      columnDef.panelDoctor,
      columnDef.nonPanelDoctor,
    ],
    SupplementalMajorMedical: [
      columnDef.service,
      columnDef.description,
      columnDef.panelDoctor,
      columnDef.nonPanelDoctor,
    ],
    MaternitySubsidy: [
      columnDef.service,
      columnDef.description,
      columnDef.freeChoiceDoctor,
    ],
    WellnessFlexibleSpending: [
      columnDef.service,
      columnDef.description,
      columnDef.freeChoiceDoctor,
    ],
  };
  return productTableColumnDefs[productKey];
};

export default createProductTableColumnDefs;
