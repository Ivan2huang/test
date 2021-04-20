/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Box, Card, Hidden, makeStyles } from '@material-ui/core';
import QRCode from './QRCode';
import Typography from '../../../uiComponents/Typography';
import TrackingButton from '../../../uiComponents/TrackingButton';
import { formatMessage, today } from '../../../helpers/helpers';
import { getQRCodeXML } from './helpers';
import { CATEGORIES } from '../../../constants/analytics';
import { OUTPATIENT } from '../constant';
import {
  CARD_BACKGROUND,
  CARD_LOGO,
  CARD_TITLE,
  CARD_INFO_COLOR_HASE,
  MEDPASS_LOGO,
  COPAYMENT_MAX_LINE,
  CARD_TYPE,
  CARD_FULL_NAME_MAX_LENGTH,
} from './constant';
import { IsEmployee } from '../../../helpers/roles';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacingX(2),
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacingX(12),
    },
  },
  healthCard: props => ({
    background: `url(${CARD_BACKGROUND[props.cardType]}) no-repeat`,
    width: '311px',
    height: '199px',
    padding: '24px 20px 18px 24px',
    boxSizing: 'border-box',
  }),
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  copaymentContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '-10px',
    '& > div': {
      alignSelf: 'flex-end',
      border: `0.5px solid ${theme.highEmphasis}`,
      borderRadius: theme.spacingX(2),
      minWidth: theme.spacing(20),
      minHeight: theme.spacing(13),
      padding: '3px 0 3px 5px',
    },
    '& > img': {
      alignSelf: 'center',
      width: '60px',
      height: '24px',
      marginBottom: '5px',
    },
  },
  clientName: {
    fontSize: '10px',
    lineHeight: '10px',
    color: theme.black,
    textTransform: 'uppercase',
  },
  cardTitle: props => ({
    fontSize: '11px',
    lineHeight: '14px',
    color: props.isHase ? theme.white : theme.black,
  }),
  cardInfo: props => ({
    fontSize: '11px',
    lineHeight: '14px',
    letterSpacing: '2.8px',
    color: props.isHase ? CARD_INFO_COLOR_HASE : theme.lowEmphasis,
    textTransform: 'uppercase',
  }),
  validThruFormat: {
    maxWidth: theme.spacing(4),
    fontSize: '6px',
    lineHeight: '6px',
    color: theme.highEmphasis,
  },
  remark: {
    fontSize: '9px',
    lineHeight: '9px',
    color: theme.black,
  },
}));

const HealthCardsForConsumer = ({
  intl,
  memberProfile,
  eHealthCardDetails,
  cardType,
  cardTypeDetails,
  isClientGMM,
}) => {
  const isHase = cardType === CARD_TYPE.hase;
  const classes = useStyles({ cardType, isHase });
  const {
    memberId,
    policy,
    consumerBenefits,
    relationships,
    role,
  } = memberProfile;
  const [openQRModal, setOpenQRModal] = useState(-1);

  const handleOpenQRModal = idx => setOpenQRModal(idx);
  const handleCloseQRModal = () => setOpenQRModal(-1);

  const transformedCards = consumerBenefits
    .filter(card => IsEmployee(role) || card.memberId === memberId)
    .map(cardBenefit => {
      const transformedCard = {
        clientName: eHealthCardDetails.clientName,
        brandName: eHealthCardDetails.brandName,
        policyNumber: policy.policyNumber,
        expiryDate: policy.expiryDate,
      };
      transformedCard.benefit = cardBenefit || {};

      if (cardBenefit.memberId === memberId) {
        const { firstName, lastName, certificateNumber } = memberProfile;
        transformedCard.firstName = firstName;
        transformedCard.lastName = lastName;
        transformedCard.certificateNumber = certificateNumber;
      } else {
        const dependant = relationships.find(
          r => r.memberId === cardBenefit.memberId,
        );
        if (dependant) {
          transformedCard.firstName = dependant.firstName;
          transformedCard.lastName = dependant.lastName;
          transformedCard.certificateNumber = dependant.certificateNumber;
        }
      }

      return transformedCard;
    });

  const getBenefitData = benefitGroup => {
    const { groupMedicalBenefits, currency } = benefitGroup;
    let outpatientRemark = '';
    return groupMedicalBenefits.reduce(
      (result, benefit) => {
        const { remark, benefitDetails, benefitName } = benefit;
        let coPayments = [];
        if (benefitName && benefitName.toLowerCase().includes(OUTPATIENT)) {
          outpatientRemark = remark;
        }
        coPayments = benefitDetails.map(d => d.coPaymentText);
        return {
          coPayments: [...result.coPayments, ...coPayments].filter(
            (co, idx) => co && idx < COPAYMENT_MAX_LINE,
          ),
          remark: outpatientRemark,
          currency,
        };
      },
      {
        coPayments: [],
      },
    );
  };

  const renderCopaymentText = (copayment, key) => (
    <Typography key={key} type="style-13" color="highEmphasis">
      {copayment}
    </Typography>
  );

  const transformCardName = (firstCardName, lastCardName, maxLength) => {
    const fullName = `${lastCardName} ${firstCardName}`;
    const transformed = fullName.substring(0, maxLength - 1);
    return fullName.length <= maxLength ? fullName : `${transformed}*`;
  };

  const renderHealthCard = (card, key) => {
    const {
      policyNumber,
      clientName,
      benefit = {},
      expiryDate,
      certificateNumber,
    } = card;
    const { membershipNumber } = benefit;
    const transformFullName = transformCardName(
      card.firstName,
      card.lastName,
      CARD_FULL_NAME_MAX_LENGTH,
    );
    const fullName = `${card.lastName} ${card.firstName}`;
    const { remark, coPayments } = getBenefitData(benefit);
    const {
      cardType: insurerType,
      insuranceCompanyCode,
      insuranceCompanyName,
    } = cardTypeDetails;
    const QRCodeValue = getQRCodeXML({
      insurerType,
      insurerCode: insuranceCompanyCode,
      insurerName: insuranceCompanyName,
      fullName,
      membershipNumber,
      policyNumber,
      certificateNumber,
      expiryDate: today(),
    });

    return (
      <Card key={key} classes={{ root: classes.root }}>
        <QRCode
          title={fullName}
          value={QRCodeValue}
          open={openQRModal === key}
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
          <Box className={classes.healthCard}>
            <Box className={classes.row}>
              <img src={CARD_LOGO[cardType]} alt="HSBC" />
              {!isHase && (
                <Box alignSelf="flex-end">
                  <Typography className={classes.clientName}>
                    {clientName}
                  </Typography>
                </Box>
              )}
            </Box>
            <Box pt={isHase ? 6 : 3} display="flex" flexDirection="column">
              <Typography className={classes.cardTitle} fontWeight="bold">
                {CARD_TITLE[cardType]}
              </Typography>
              {!isHase && (
                <Typography className={classes.cardTitle}>
                  {formatMessage(
                    intl,
                    'benefits.tabs.label.healthCard.secondaryTitle',
                    '滙豐保險全方位僱員福利醫療保險計劃',
                  )}
                </Typography>
              )}
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              pt={isHase ? 1 : 2}
            >
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
              >
                <Box mt={isHase ? 6 : 0}>
                  <Box mb={2}>
                    <Typography className={classes.cardInfo}>
                      {`${policyNumber} - ${membershipNumber}`}
                    </Typography>
                  </Box>
                  <Box mb={2}>
                    <Typography className={classes.cardInfo}>
                      {transformFullName}
                    </Typography>
                  </Box>

                  {!isHase && (
                    <Box display="flex" alignItems="center" mb={remark ? 2 : 0}>
                      <Box mr={2}>
                        <Typography className={classes.validThruFormat}>
                          Valid thru
                        </Typography>
                      </Box>
                      <Typography className={classes.cardInfo}>
                        {moment(expiryDate).format('DD/MM/YYYY')}
                      </Typography>
                    </Box>
                  )}
                </Box>
                <Box display="flex" flexDirection="column">
                  <Typography className={classes.remark}>{remark}</Typography>
                </Box>
              </Box>
              <Box className={classes.copaymentContainer}>
                <img src={MEDPASS_LOGO[cardType]} alt="Medpass Logo" />
                <Box>
                  <Typography
                    type="style-13"
                    color="highEmphasis"
                    fontWeight="bold"
                  >
                    Copayment
                  </Typography>
                  <Box pt={2}>{coPayments.map(renderCopaymentText)}</Box>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box flex="1" ml={{ xs: 0, md: 6 }} mt={{ xs: 4, md: 0 }}>
            <Box component={Hidden} implementation="css" mb={4} smDown>
              <Typography type="style-4">{fullName}</Typography>
            </Box>
            {!isClientGMM && (
              <TrackingButton
                variant="outlined"
                color="secondary"
                data-testid={`btn-view-qr-${membershipNumber}`}
                onClick={() => handleOpenQRModal(key)}
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
            )}
          </Box>
        </Box>
      </Card>
    );
  };

  return transformedCards.map(renderHealthCard);
};

HealthCardsForConsumer.propTypes = {
  intl: PropTypes.shape({}).isRequired,
  memberProfile: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    memberId: PropTypes.string.isRequired,
    relationships: PropTypes.arrayOf(
      PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        memberId: PropTypes.string.isRequired,
      }),
    ).isRequired,
    healthCards: PropTypes.arrayOf(
      PropTypes.shape({
        memberId: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
      }).isRequired,
    ).isRequired,
    policy: PropTypes.shape({
      expiryDate: PropTypes.string.isRequired,
      policyNumber: PropTypes.string.isRequired,
    }).isRequired,
    consumerBenefits: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
  eHealthCardDetails: PropTypes.shape({
    clientName: PropTypes.string,
    brandName: PropTypes.string,
  }).isRequired,
  cardType: PropTypes.string,
  cardTypeDetails: PropTypes.shape({
    cardType: PropTypes.string,
    insuranceCompanyCode: PropTypes.string,
    insuranceCompanyName: PropTypes.string,
  }).isRequired,
  isClientGMM: PropTypes.bool.isRequired,
};

HealthCardsForConsumer.defaultProps = {
  cardType: CARD_TYPE.default,
};

export default injectIntl(HealthCardsForConsumer);
