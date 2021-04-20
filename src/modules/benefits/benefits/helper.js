import { formatMessage } from '../../../helpers/helpers';
import { TERMINATED } from '../constant';

const WELLNESS_FLEXIBLE_SPENDING = 'WellnessFlexibleSpending';

const getDisplayName = (intl, name, plan) => {
  if (!plan) return name;
  const planName = plan.name;
  const defaultMessage = `${name} ( Tier ${planName} - Employee and dependant)`;
  return formatMessage(intl, 'me.tabs.benefits.dropdown.item', defaultMessage, {
    name,
    planName,
  });
};

export const buildMap = (data, groupBy) => {
  const map = {};
  data.forEach(item => {
    const key = item[groupBy];
    map[key] = map[key] ? map[key] + 1 : 1;
  });
  return map;
};

export const buildBenefitsSummaryList = (intl, memberProfile) => {
  const summaryList = [];
  const {
    fullName,
    planId,
    memberId,
    checkpointVisits,
    relationships,
    relationship,
    policy: { plans },
  } = memberProfile;
  summaryList.push({
    displayName: getDisplayName(intl, fullName, plans[planId]),
    planId,
    memberId,
    checkpointVisits,
    relationship,
  });
  if (!relationships) return summaryList;
  relationships.forEach(
    // eslint-disable-next-line no-shadow
    ({ fullName, planId, memberId, checkpointVisits, relationship, status }) =>
      status !== TERMINATED &&
      summaryList.push({
        displayName: getDisplayName(intl, fullName, plans[planId]),
        planId,
        memberId,
        checkpointVisits,
        relationship,
      }),
  );
  return summaryList;
};

export const getPlanName = (memberId, consumerBenefits) => {
  const plan = consumerBenefits.find(b => b.memberId === memberId);

  return plan || { name: '' };
};

const getBenefitMemberDisplay = (intl, memberName, category) => {
  if (!category) return memberName;
  const [, name] = category.split(' ');

  return getDisplayName(intl, memberName, { name });
};

export const buildBenefitMemberList = (intl, memberProfile) => {
  const memberList = [];
  const { fullName, memberId, category, relationships } = memberProfile;

  memberList.push({
    displayName: getBenefitMemberDisplay(intl, fullName, category),
    memberId,
  });

  if (!relationships) return memberList;

  relationships.forEach(
    // eslint-disable-next-line no-shadow
    ({ fullName, category, status, memberId }) =>
      status !== TERMINATED &&
      memberList.push({
        displayName: getBenefitMemberDisplay(intl, fullName, category),
        memberId,
      }),
  );

  return memberList;
};

export const benefitNameToKey = name => name.replace(/ /g, '');

export const transformBenefitPlans = benefitPlans => {
  const plans = {};

  Object.keys(benefitPlans).forEach(planId => {
    const products = {};
    benefitPlans[planId].products.forEach(product => {
      const services = [];
      product.services.forEach(service => {
        service.details.forEach(detail => {
          services.push({
            id: service.id,
            name: service.name,
            metaText: service.metaText,
            ...detail,
          });
        });
      });
      products[product.productType] = {
        name: product.name,
        footnote: product.footnote,
        panelLabel: product.panelLabel,
        nonPanelLabel: product.nonPanelLabel,
        freeChoiceLabel: product.freeChoiceLabel,
        unlimitedCheckpoint: product.unlimitedCheckpoint,
        services,
      };
    });
    plans[planId] = products;
  });

  return plans;
};

const createCheckpointsMap = checkpoints => {
  if (!checkpoints) return {};
  const checkpointsMap = {};
  checkpoints.forEach(({ serviceId, usedCount }) => {
    checkpointsMap[serviceId] = usedCount;
  });
  return checkpointsMap;
};

export const transformSelectedPlanWithMemberDetails = (
  intl,
  checkpointVisitsData,
  selectedPlanDetails,
  availableWalletBalance,
  relationship,
) => {
  const checkpointsMap = createCheckpointsMap(checkpointVisitsData);
  if (!selectedPlanDetails) return {};
  Object.entries(selectedPlanDetails).forEach(([productType, plan]) => {
    plan.services = plan.services.filter(
      ({ forRelationship }) =>
        productType !== WELLNESS_FLEXIBLE_SPENDING ||
        relationship === forRelationship,
    );
    plan.services.forEach(details => {
      if (details.checkpointVisits) {
        details.checkpointVisits.balance =
          +details.checkpointVisits.limit - (+checkpointsMap[details.id] || 0);
      }
      if (productType === WELLNESS_FLEXIBLE_SPENDING) {
        const maxWalletBalance = details.annualLimitText; // formatAmount(intl, details.annualLimitText);

        let messageKey = 'me.tabs.benefits.label.wellness.nonPanelDoctorValue';
        let defaultMessage = `${availableWalletBalance} out of ${maxWalletBalance} left`;
        if (
          availableWalletBalance === undefined ||
          availableWalletBalance === null
        ) {
          messageKey =
            'me.tabs.benefits.label.wellness.nonPanelDoctorValue.noBalance';
          defaultMessage = `- out of ${maxWalletBalance} left`;
        }
        details.nonPanelVisit = formatMessage(
          intl,
          messageKey,
          defaultMessage,
          {
            availableWalletBalance,
            maxWalletBalance,
          },
        );
      }
    });
  });
  return selectedPlanDetails;
};

export const transformLifeBenefits = groupLifeBenefits =>
  groupLifeBenefits.map(
    ({ benefitName, descriptionLabel, sumAssuredLabel, benefitDetails }) => {
      return {
        fullWidth: true,
        benefitName,
        panelLabel: descriptionLabel,
        nonPanelLabel: sumAssuredLabel,
        subLimits: [],
        annualLimit: {},
        benefitDetails: benefitDetails.map(detail => ({
          ...detail,
          isLifeBenefit: true,
          subBenefits: [
            {
              panel: detail.description,
              nonPanel: detail.sumAssured,
            },
          ],
        })),
      };
    },
  );

export const transformSublimit = subLimits =>
  subLimits
    .filter(({ text }) => !!text)
    .map(({ text, label, footnoteSuperscript, footnote, ...rest }) => ({
      benefitType: label,
      footnoteSuperscript,
      footnote,
      subBenefits: [{ ...rest }],
      checkpoint: text,
    }));
