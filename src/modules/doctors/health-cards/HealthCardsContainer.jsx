import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HealthCards from '../../benefits/health-cards/HealthCards';
import HealthCardsForConsumer from '../../benefits/health-cards/HealthCardsForConsumer';
import Doctors from '../DoctorsContainer';
import { DOCTORS_ROOT_PATHNAME, HEALTHCARDS_ID } from '../constant';
import { TERMINATED } from '../../benefits/constant';
import { getMemberProfileWithMembershipNumber } from '../../me/action';
import { navigateTo } from '../../../helpers/helpers';
import { loaderDetail } from '../../loader/util';
import LOADER from '../../../constants/loader';
import { CARD_TYPE } from '../../benefits/health-cards/constant';

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
    getMemberProfile();
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (memberProfile.status === TERMINATED || !hasEHealthCard) {
      navigateTo(DOCTORS_ROOT_PATHNAME);
    }
  }, [memberProfile]);

  const isConsumerBenefits = !!memberProfile.consumerBenefits;

  return (
    <Doctors active={HEALTHCARDS_ID} isLoaded={isLoaded}>
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
    </Doctors>
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
