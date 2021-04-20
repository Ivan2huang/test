import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedHTMLMessage, FormattedMessage } from 'react-intl';
import { Box } from '@material-ui/core';
import HealthCards from './HealthCards';
import HealthCardsForConsumer from './HealthCardsForConsumer';
import Benefits from '../BenefitsContainer';
import { HEALTHCARDS_ID, BENEFITS_PATHNAME, TERMINATED } from '../constant';
import { getMemberProfileWithMembershipNumber } from '../../me/action';
import { navigateTo } from '../../../helpers/helpers';
import { loaderDetail } from '../../loader/util';
import LOADER from '../../../constants/loader';
import Typography from '../../../uiComponents/Typography';
import { CARD_TYPE } from './constant';

const mapStateToProps = ({ me, benefits, loader }) => ({
  memberProfile: me.member.profile,
  hasEHealthCard: benefits.benefitStatus.hasEHealthCard,
  eHealthCardDetails: benefits.benefitStatus.eHealthCardDetails,
  isClientUsingHase: benefits.benefitStatus.isClientUsingHase,
  cardTypeDetails: benefits.benefitStatus.cardTypeDetails,
  isClientGMM: benefits.benefitStatus.isClientGMM,
  ...loaderDetail(loader, LOADER.page),
});

const mapDispatchToProps = {
  getMemberProfile: getMemberProfileWithMembershipNumber,
};

const HealthCardsContainer = ({
  getMemberProfile,
  memberProfile,
  hasEHealthCard,
  eHealthCardDetails,
  isClientUsingHase,
  cardTypeDetails,
  isClientGMM,
  ...rest
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const cardType = isClientUsingHase ? CARD_TYPE.hase : CARD_TYPE.default;

  useEffect(() => {
    if (!hasEHealthCard) {
      navigateTo(BENEFITS_PATHNAME);
    } else {
      getMemberProfile();
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (memberProfile.status === TERMINATED || !hasEHealthCard) {
      navigateTo(BENEFITS_PATHNAME);
    }
  }, [memberProfile]);

  const isConsumerBenefits = !!memberProfile.consumerBenefits;

  return (
    <>
      {hasEHealthCard && (
        <Benefits active={HEALTHCARDS_ID} isLoaded={isLoaded}>
          <Box
            display="flex"
            justifyContent="space-between"
            align={{ md: 'right' }}
            flexDirection={{ xs: 'column', md: 'row' }}
            mb={{ xs: 8, md: 5 }}
            pt={{ sm: 3, md: 0 }}
          >
            <Box mb={{ xs: 4, md: 0 }}>
              <Typography type="style-2">
                <FormattedMessage
                  id="benefits.tabs.label.benefitsHealthCard"
                  defaultMessage="eHealth card"
                />
              </Typography>
            </Box>
            {!isClientGMM && (
              <Typography type="style-6">
                <FormattedHTMLMessage
                  id="benefits.tabs.label.healthCard.QRCodeMessage"
                  defaultMessage="Share card details by showing<br/>QR code to clinic staff."
                />
              </Typography>
            )}
          </Box>
          {isConsumerBenefits ? (
            <HealthCardsForConsumer
              memberProfile={memberProfile}
              eHealthCardDetails={eHealthCardDetails}
              cardType={cardType}
              cardTypeDetails={cardTypeDetails}
              isClientGMM={isClientGMM}
            />
          ) : (
            <HealthCards memberProfile={memberProfile} {...rest} />
          )}
        </Benefits>
      )}
    </>
  );
};

HealthCardsContainer.propTypes = {
  memberProfile: PropTypes.shape().isRequired,
  getMemberProfile: PropTypes.func.isRequired,
  hasEHealthCard: PropTypes.bool.isRequired,
  eHealthCardDetails: PropTypes.shape({}).isRequired,
  isClientUsingHase: PropTypes.bool.isRequired,
  cardTypeDetails: PropTypes.shape({}).isRequired,
  isClientGMM: PropTypes.bool.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HealthCardsContainer);
