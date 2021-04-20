import React from 'react';
import { Box } from '@material-ui/core';
import { formatMessage, formatAmount } from '../../../helpers/helpers';
import { formatClaimDate } from '../claim-details/helper';
import ClaimStatus from '../ClaimStatus';
import MoreInformationRequired from '../MoreInformationRequired';

const ClaimsListHeader = (intl, members) =>
  [
    {
      name: formatMessage(intl, 'claims.table.header.status', 'Status'),
      template: row => {
        return (
          <Box minWidth="140px">
            <ClaimStatus status={row.statusCode} />
            <MoreInformationRequired status={row.statusCode} />
          </Box>
        );
      },
    },
    {
      name: formatMessage(
        intl,
        'claims.claimDetails.label.consultationDate',
        'Consultation date',
      ),
      template: row => formatClaimDate(intl, row.consultationDate),
      alignContent: 'right',
    },
    {
      name: formatMessage(
        intl,
        'claims.table.header.consultationType',
        'Consultation type',
      ),
      template: row => row.consultationTypes,
    },
    {
      name: formatMessage(
        intl,
        'claims.table.header.patientName',
        'Patient name',
      ),
      template: row => members[row.patientId],
    },
    {
      name: formatMessage(
        intl,
        'claims.table.header.reimbursed',
        'Reimbursed(HK$)',
      ),
      template: row =>
        row.statusCode === 'APPROVED' && !row.isCashlessClaim
          ? formatAmount(intl, row.approvedAmount)
          : '-',
      alignContent: 'right',
    },
  ].filter(Boolean);

export default ClaimsListHeader;
