import React from 'react';
import PropTypes from 'prop-types';
import HealthCard from './HealthCard';
import { EMPLOYEE, TIER_3, TERMINATED } from '../constant';
import { IsEmployee } from '../../../helpers/roles';

const HealthCards = ({ memberProfile, loaded }) => {
  if (Object.keys(memberProfile.policy).length === 0) {
    return '';
  }

  const {
    memberId,
    relationships,
    membershipNumber: mainMembershipNumber,
    planId: mainPlanId,
    healthCards,
    coPayments,
    certificateNumber,
    policy,
    role,
    category,
    firstName,
    lastName,
  } = memberProfile;
  const mainFullName = `${lastName} ${firstName}`;
  const { policyNumber } = policy;
  const {
    code: insurerCode,
    eHealthCardName: insurerName,
    cardType: insurerType,
  } = policy.insurer;

  const memberHealthCard = healthCards.find(healthCard => {
    return healthCard.memberId === memberId;
  });

  const filteredHealthCards = [];
  if (IsEmployee(role)) {
    healthCards.forEach(h => {
      if (h.memberId !== memberId) {
        const dependantInfo = relationships.find(
          r => r.memberId === h.memberId && r.status !== TERMINATED,
        );
        if (dependantInfo) {
          dependantInfo.cardType = h.type;
          filteredHealthCards.push(dependantInfo);
        }
      }
    });
  }

  const getCoPayment = planId => {
    return category === TIER_3 ? null : coPayments[planId];
  };

  return (
    loaded && (
      <>
        {memberHealthCard && (
          <HealthCard
            fullName={mainFullName}
            membershipNumber={mainMembershipNumber}
            coPayment={
              role === EMPLOYEE
                ? coPayments[mainPlanId]
                : getCoPayment(mainPlanId)
            }
            cardType={memberHealthCard.type}
            certificateNumber={certificateNumber}
            insurerCode={insurerCode}
            insurerName={insurerName}
            insurerType={insurerType}
            policyNumber={policyNumber}
          />
        )}
        {filteredHealthCards.map((healthCard, index) => {
          const {
            firstName: memberFirstName,
            lastName: memberLastName,
            membershipNumber,
            planId,
            cardType,
          } = healthCard;
          return (
            <HealthCard
              /* eslint-disable-next-line react/no-array-index-key */
              key={`healthCard-${index}`}
              fullName={`${memberLastName} ${memberFirstName}`}
              membershipNumber={membershipNumber}
              coPayment={getCoPayment(planId)}
              cardType={cardType}
              certificateNumber={certificateNumber}
              insurerCode={insurerCode}
              insurerName={insurerName}
              insurerType={insurerType}
              policyNumber={policyNumber}
            />
          );
        })}
      </>
    )
  );
};

HealthCards.propTypes = {
  memberProfile: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    memberId: PropTypes.string.isRequired,
    membershipNumber: PropTypes.string.isRequired,
    planId: PropTypes.number,
    relationships: PropTypes.arrayOf(
      PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        memberId: PropTypes.string.isRequired,
        planId: PropTypes.number,
      }),
    ).isRequired,
    coPayments: PropTypes.shape({}).isRequired,
    healthCards: PropTypes.arrayOf(
      PropTypes.shape({
        memberId: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
      }).isRequired,
    ).isRequired,
    category: PropTypes.string.isRequired,
  }).isRequired,
  loaded: PropTypes.bool.isRequired,
};

export default HealthCards;
