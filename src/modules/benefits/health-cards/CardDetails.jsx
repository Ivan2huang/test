import React from 'react';
import { injectIntl } from 'react-intl';
import * as PropTypes from 'prop-types';

import { Box, withStyles } from '@material-ui/core';

import Typography from '../../../uiComponents/Typography';
import GridItem from '../../../uiComponents/GridItem';
import Grid from '../../../uiComponents/Grid';

const Styles = () => ({
  lastBox: {
    '&:last-child': {
      marginBottom: 0,
    },
  },
});

const CardDetails = ({ classes, fullName, membershipNumber, coPayment }) => {
  const renderCardDetail = (key, value) => (
    <>
      <Box mb={{ xs: 1, sm: 1 }}>
        <Typography type="style-8" color="white">
          {`${key}:`}
        </Typography>
      </Box>
      <Box mb={{ xs: 2, sm: 2 }} classes={{ root: classes.lastBox }}>
        <Typography type="style-7" color="white">
          {value}
        </Typography>
      </Box>
    </>
  );
  const renderCoPaymentDetail = (key, value) => (
    <>
      <Box mb={{ xs: 1, sm: 1 }} classes={{ root: classes.lastBox }}>
        <Typography type="style-8" color="white">
          {`${key}: ${value}`}
        </Typography>
      </Box>
    </>
  );

  const columns = coPayment
    ? { xs: 8, sm: 8, md: 8 }
    : { xs: 12, sm: 12, md: 12 };

  return (
    <Grid alignItems="flex-end">
      <GridItem columns={{ xs: 12, sm: 12, md: 12 }}>
        <Box
          mt={{ xs: 2, sm: 2 }}
          mb={{ xs: 5, sm: 5 }}
          display="flex"
          justifyContent="center"
        >
          <Typography type="style-8" color="white">
            HSBC HealthPlus
          </Typography>
        </Box>
      </GridItem>
      <GridItem columns={columns}>
        {renderCardDetail('Name', `${fullName}`)}
        {renderCardDetail('Membership No', `${membershipNumber}`)}
      </GridItem>
      {coPayment && (
        <GridItem columns={{ xs: 4, sm: 4, md: 4 }}>
          <Box mb={{ xs: 1, sm: 1 }}>
            <Typography type="style-8" color="white" textDecoration="underline">
              Copayment
            </Typography>
          </Box>
          {renderCoPaymentDetail('GP', `${coPayment.GPText}`)}
          {renderCoPaymentDetail('SP', `${coPayment.SPText}`)}
          {renderCoPaymentDetail('PHY', `${coPayment.PHYText}`)}
        </GridItem>
      )}
    </Grid>
  );
};

CardDetails.propTypes = {
  intl: PropTypes.shape({}).isRequired,
  classes: PropTypes.exact({
    lastBox: PropTypes.string.isRequired,
  }).isRequired,
  fullName: PropTypes.string.isRequired,
  membershipNumber: PropTypes.string.isRequired,
  coPayment: PropTypes.exact({
    GP: PropTypes.number.isRequired,
    GPText: PropTypes.string.isRequired,
    SP: PropTypes.number.isRequired,
    SPText: PropTypes.string.isRequired,
    PHY: PropTypes.number.isRequired,
    PHYText: PropTypes.string.isRequired,
  }),
};

CardDetails.defaultProps = {
  coPayment: {
    GP: 0,
    GPText: '',
    SP: 0,
    SPText: '',
    PHY: 0,
    PHYText: '',
  },
};

export default injectIntl(withStyles(Styles)(CardDetails));
