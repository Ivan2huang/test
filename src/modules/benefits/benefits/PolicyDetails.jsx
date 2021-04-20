import React from 'react';
import PropTypes from 'prop-types';

import { Card, Box, withStyles } from '@material-ui/core';

import { injectIntl } from 'react-intl';
import GridItem from '../../../uiComponents/GridItem';
import Typography from '../../../uiComponents/Typography';
import Grid from '../../../uiComponents/Grid';
import { formatDate, formatMessage } from '../../../helpers/helpers';

const Styles = theme => ({
  [theme.breakpoints.down('sm')]: {
    itemBorder: {
      borderBottom: `1px solid ${theme.grey1}`,
    },
  },
});

const PolicyDetails = ({
  insurer,
  policyNumber,
  effectiveFrom,
  effectiveTo,
  intl,
  classes,
}) => {
  const renderDetail = (key, value, { itemBorder }) => (
    <>
      <GridItem columns={{ xs: 12, sm: 12, md: 3 }}>
        <Box pt={{ xs: 6, md: 2 }}>
          <Typography type="style-6">
            {formatMessage(intl, `me.tabs.benefits.policyDetails.${key}`, key)}
          </Typography>
        </Box>
      </GridItem>
      <GridItem columns={{ xs: 12, sm: 12, md: 9 }}>
        <Box pt={{ xs: 1, md: 2 }} pb={{ xs: 6, md: 0 }} className={itemBorder}>
          <Typography type="style-5">{value}</Typography>
        </Box>
      </GridItem>
    </>
  );

  return (
    <Card>
      <Box pl={{ md: 12 }} pr={{ md: 12 }} pt={{ md: 10 }} pb={{ md: 13 }}>
        <Grid>
          <GridItem columns={{ xs: 12, sm: 12, md: 12 }}>
            <Box mb={{ md: 6 }}>
              <Typography type="style-3">
                {formatMessage(
                  intl,
                  'me.tabs.benefits.label.policyDetails',
                  'Policy Details',
                )}
              </Typography>
            </Box>
          </GridItem>
          {renderDetail('insurer', insurer, classes)}
          {renderDetail('policyNumber', policyNumber, classes)}
          {renderDetail(
            'effectivePeriod',
            `${formatDate(effectiveFrom)} - ${formatDate(effectiveTo)}`,
            classes,
          )}
        </Grid>
      </Box>
    </Card>
  );
};

PolicyDetails.propTypes = {
  insurer: PropTypes.string.isRequired,
  policyNumber: PropTypes.string.isRequired,
  effectiveFrom: PropTypes.string.isRequired,
  effectiveTo: PropTypes.string.isRequired,
  intl: PropTypes.shape({}).isRequired,
  classes: PropTypes.exact({ itemBorder: PropTypes.string.isRequired })
    .isRequired,
};

export default injectIntl(withStyles(Styles)(PolicyDetails));
