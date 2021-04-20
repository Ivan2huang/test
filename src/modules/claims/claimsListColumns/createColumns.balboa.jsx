import React from 'react';
import { Box } from '@material-ui/core';

import { formatMessage } from '../../../helpers/helpers';
import { formatClaimDate } from '../claim-details/helper';
import ClaimStatus from '../ClaimStatus';
import MoreInformationRequired from '../MoreInformationRequired';

const CreateClaimsListTableColumn = (intl, members) =>
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
  ].filter(Boolean);

export default CreateClaimsListTableColumn;
