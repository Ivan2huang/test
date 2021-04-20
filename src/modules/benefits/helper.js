import { IsDependent, IsEmployee } from '../../helpers/roles';
import { IsCategorySpouse, IsCategoryChild } from '../../helpers/relationships';

const getCoPayment = (outPatientServices, serviceId) => {
  const { coPayment } = outPatientServices.find(
    service => service.id === serviceId,
  ).details[0];

  return {
    coPayment,
    coPaymentText: `$${coPayment}`,
  };
};

const onlyUnique = (value, index, self) => {
  return self.indexOf(value) === index;
};

const getUniquePlanIds = benefits => {
  const {
    member: { planId },
    relationships,
  } = benefits;

  let uniquePlanIdList = [];
  if (relationships.length !== 0) {
    const relationshipPlanId = relationships.map(r => r.planId);
    uniquePlanIdList = relationshipPlanId.filter(onlyUnique);
  }

  const allPlanIds = [planId, ...uniquePlanIdList];
  return allPlanIds.filter(onlyUnique);
};

const transformAndFilterPolicyPayloadByMembersBenefits = (
  policyDetails,
  benefits,
) => {
  let updatedPlans;
  if (policyDetails) {
    const uniquePlanIds = getUniquePlanIds(benefits);
    const { plans } = policyDetails;
    updatedPlans = plans.reduce((acc, plan) => {
      const { id, ...rest } = plan;
      if (uniquePlanIds.includes(id)) {
        acc[plan.id] = rest;
      }
      return acc;
    }, {});
  }

  return {
    ...policyDetails,
    plans: updatedPlans,
  };
};

const getCoPaymentDetailsByPlanId = (plans, planId) => {
  const outPatientServices = plans
    .find(plan => plan.id === planId)
    .products.find(product => product.ehealthcard === true).services;
  const gp = getCoPayment(outPatientServices, 'GP');
  const sp = getCoPayment(outPatientServices, 'SP');
  const phy = getCoPayment(outPatientServices, 'PHY');
  return {
    GP: gp.coPayment,
    GPText: gp.coPaymentText,
    SP: sp.coPayment,
    SPText: sp.coPaymentText,
    PHY: phy.coPayment,
    PHYText: phy.coPaymentText,
  };
};

const getMembersCoPayments = (benefits, policy) => {
  let coPayments;
  if (benefits && policy) {
    const {
      member: { planId },
      relationships,
    } = benefits;
    const { plans } = policy;
    let uniquePlanIdList = [];
    if (relationships.length !== 0) {
      const relationshipPlanId = relationships.map(r => r.planId);
      uniquePlanIdList = relationshipPlanId.filter(onlyUnique);
    }
    const allPlanIds = [planId, ...uniquePlanIdList];
    const uniquePlanIds = allPlanIds.filter(onlyUnique);

    coPayments = uniquePlanIds.reduce((acc, id) => {
      const result = getCoPaymentDetailsByPlanId(plans, id);
      acc[id] = result;
      return acc;
    }, {});
  }

  return coPayments;
};

export const orderMembersByRole = members => {
  const getPriorityOfRole = (role, relationshipCategory) => {
    if (IsEmployee(role)) return 1;
    if (IsDependent(role) && IsCategorySpouse(relationshipCategory)) return 2;
    if (IsDependent(role) && IsCategoryChild(relationshipCategory)) return 3;
    return 4;
  };

  const compareByRole = (firstMember, secondMember) => {
    const first = getPriorityOfRole(
      firstMember.role,
      firstMember.relationshipCategory,
    );
    const second = getPriorityOfRole(
      secondMember.role,
      secondMember.relationshipCategory,
    );
    return first - second;
  };

  return members.sort(compareByRole);
};

export const enrichUserProfileWithMemberProfileOrder = userProfile => {
  const { relationships, ...rest } = userProfile;
  const outerProfile = {
    fullName: rest.fullName,
    memberId: rest.memberId,
    membershipNumber: rest.membershipNumber,
    relationship: rest.relationship,
    relationshipToEmployee: rest.relationshipToEmployee,
    relationshipCategory: rest.relationshipCategory,
    role: rest.role,
    email: rest.email,
    workEmail: rest.workEmail,
    hasLoggedIn: rest.hasLoggedIn,
    policyNumber: rest.policy ? rest.policy.policyNumber : '',
    certificateNumber: rest.certificateNumber,
    profilePolicyNumber: rest.profilePolicyNumber || '',
    profileCertificateNumber: rest.profileCertificateNumber || '',
    contactNumber: rest.contactNumber,
  };

  const members = [{ ...outerProfile }, ...relationships];
  const memberProfileOrder = orderMembersByRole(members);

  return { ...userProfile, memberProfileOrder };
};

export const enrichProfileWithBenefits = (
  memberProfile,
  benefits,
  healthCards,
  policy,
) => {
  if (!memberProfile) {
    return undefined;
  }

  let result = {};

  if (memberProfile && benefits) {
    const {
      fullName,
      dependants,
      preferredLocale,
      isEdmOptedOut,
      isTermsAccepted,
      role,
      relationship,
      relationshipToEmployee,
      relationshipCategory,
      email,
      workEmail,
      hasLoggedIn,
      contactNumber,
    } = memberProfile;
    const { member, relationships } = benefits;

    const memberRelationships = dependants.map(d => {
      const dependantInfo =
        relationships.find(r => r.memberId === d.memberId) || {};
      const { planId, checkpointVisits, membershipNumber } = dependantInfo;

      return {
        ...d,
        planId,
        checkpointVisits,
        membershipNumber,
      };
    });

    result = {
      fullName,
      preferredLocale,
      isEdmOptedOut,
      isTermsAccepted,
      email,
      workEmail,
      role,
      relationship,
      relationshipToEmployee,
      relationshipCategory,
      hasLoggedIn,
      ...member,
      profilePolicyNumber: memberProfile.policyNumber,
      profileCertificateNumber: memberProfile.certificateNumber,
      relationships: memberRelationships,
      coPayments: getMembersCoPayments(benefits, policy),
      healthCards,
      policy: transformAndFilterPolicyPayloadByMembersBenefits(
        policy,
        benefits,
      ),
      contactNumber,
    };
  } else {
    result = {
      ...memberProfile,
      relationships: memberProfile.dependants,
      email: memberProfile.email,
      workEmail: memberProfile.workEmail,
      dependants: [],
    };
  }

  return result;
};
