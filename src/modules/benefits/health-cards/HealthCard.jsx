import React, { useState } from 'react';
import * as PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import { Box, Card, Hidden, useTheme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import TrackingButton from '../../../uiComponents/TrackingButton';
import CardDetails from './CardDetails';
import Images from '../../../constants/images';
import GridItem from '../../../uiComponents/GridItem';
import Grid from '../../../uiComponents/Grid';
import Typography from '../../../uiComponents/Typography';
import theme from '../../../themes/theme';
import { formatMessage, today } from '../../../helpers/helpers';
import QRCode from './QRCode';
import { getQRCodeXML } from './helpers';
import { CATEGORIES } from '../../../constants/analytics';

const useStyles = makeStyles({
  healthCardHolder: props => ({
    marginBottom: theme.spacingX(2),
    [props.theme.breakpoints.down('sm')]: {
      background: 'none',
      boxShadow: 'none',
      borderRadius: 0,
      marginBottom: props.theme.spacingX(12),
    },
  }),
  cardDetail: props => ({
    backgroundColor:
      props.cardType === 'PRIMARY'
        ? props.theme.primary
        : props.theme.cardSecondaryBackground,
  }),
  healthCard: props => ({
    width: props.theme.spacingX(82),
    border: '1px solid rgba(0,0,0,0.1)',
    [props.theme.breakpoints.down('sm')]: {
      width: 'auto',
      background: theme.white,
      boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.05)',
    },
  }),
});

const HealthCard = ({
  intl,
  fullName,
  membershipNumber,
  cardType,
  coPayment,
  certificateNumber,
  insurerCode,
  insurerName,
  insurerType,
  policyNumber,
}) => {
  const classes = useStyles({ theme: useTheme(), cardType });
  const [openQRModal, setOpenQRModal] = useState(false);

  const handleOpenQRModal = () => setOpenQRModal(true);
  const handleCloseQRModal = () => setOpenQRModal(false);

  const QRCodeValue = getQRCodeXML({
    fullName,
    membershipNumber,
    certificateNumber,
    insurerCode,
    insurerName,
    insurerType,
    policyNumber,
    expiryDate: today(),
  });

  return (
    <Card classes={{ root: classes.healthCardHolder }}>
      <QRCode
        title={fullName}
        value={QRCodeValue}
        open={openQRModal}
        onClose={handleCloseQRModal}
      />
      <Box
        display="flex"
        flexDirection={{ xs: 'column', md: 'row' }}
        ml={{ md: 12 }}
        my={{ md: 10 }}
        pr={{ sm: 12 }}
      >
        <Box
          mdUp
          implementation="css"
          flex="1"
          ml={{ md: 6 }}
          mb={{ xs: 2, sm: 2, md: 0 }}
          component={Hidden}
        >
          <Typography type="style-4">{fullName}</Typography>
        </Box>
        <Card classes={{ root: classes.healthCard }}>
          <Box my={{ xs: 3, sm: 3 }}>
            <Grid alignItems="center">
              <GridItem
                offset={{ xs: 4, sm: 4, md: 4 }}
                columns={{ xs: 4, sm: 4, md: 4 }}
              >
                <img
                  src={Images.HEALTH_CARD_HEADER}
                  alt="HSBC"
                  style={{ display: 'block' }}
                />
              </GridItem>
              <GridItem columns={{ xs: 4, sm: 4, md: 4 }}>
                <Typography type="style-7">{today()}</Typography>
              </GridItem>
            </Grid>
          </Box>
          <Box
            classes={{ root: classes.cardDetail }}
            px={{ xs: 6, sm: 6 }}
            pb={{ xs: 4, sm: 4 }}
          >
            <CardDetails
              fullName={fullName}
              membershipNumber={membershipNumber}
              coPayment={coPayment}
            />
          </Box>
        </Card>

        <Box flex="1" ml={{ xs: 0, md: 6 }} mt={{ xs: 4, md: 0 }}>
          <Box component={Hidden} implementation="css" mb={4} smDown>
            <Typography type="style-4">{fullName}</Typography>
          </Box>
          <TrackingButton
            variant="outlined"
            color="secondary"
            data-testid={`btn-view-qr-${membershipNumber}`}
            onClick={handleOpenQRModal}
            trackingData={{
              category: CATEGORIES.EHEALTH_CARD_PAGE,
              action: 'View QR code',
              user: membershipNumber,
            }}
            aria-label={formatMessage(
              intl,
              'me.tabs.eHealthCard.button.viewQRCodeFor',
              `View QR code for ${fullName}`,
              { fullName },
            )}
          >
            {formatMessage(
              intl,
              'me.tabs.eHealthCard.button.viewQRCode',
              'View QR code',
            )}
          </TrackingButton>
        </Box>
      </Box>
    </Card>
  );
};

HealthCard.propTypes = {
  intl: PropTypes.shape({}).isRequired,
  fullName: PropTypes.string.isRequired,
  membershipNumber: PropTypes.string,
  certificateNumber: PropTypes.string,
  insurerCode: PropTypes.number.isRequired,
  insurerName: PropTypes.string.isRequired,
  insurerType: PropTypes.string.isRequired,
  policyNumber: PropTypes.string.isRequired,
  cardType: PropTypes.string,
  coPayment: PropTypes.exact({
    GP: PropTypes.number.isRequired,
    GPText: PropTypes.string.isRequired,
    SP: PropTypes.number.isRequired,
    SPText: PropTypes.string.isRequired,
    PHY: PropTypes.number.isRequired,
    PHYText: PropTypes.string.isRequired,
  }),
};

HealthCard.defaultProps = {
  membershipNumber: '',
  certificateNumber: '',
  cardType: '',
  coPayment: {
    GP: 0,
    GPText: '',
    SP: 0,
    SPText: '',
    PHY: 0,
    PHYText: '',
  },
};
export default injectIntl(HealthCard);
