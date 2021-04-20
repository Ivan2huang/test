import {
  buildBenefitsSummaryList,
  buildMap,
  transformBenefitPlans,
  transformSelectedPlanWithMemberDetails,
  getPlanName,
  buildBenefitMemberList,
  benefitNameToKey,
} from '../helper';

jest.mock('../../../../helpers/helpers', () => ({
  formatMessage: jest.fn((intl, id, defaultMessage) => defaultMessage),
  formatAmount: jest.fn((intl, amount) => amount),
}));

describe('Benefit Helper', () => {
  it('should provide transformed data of plans', () => {
    const plans = {
      3: {
        name: 'III(Dependant)',
        products: [
          {
            name: 'Outpatient',
            productType: 'outpatient',
            services: [
              {
                name: 'General medical practitioner',
                id: 'GP',
                metaText: 'Consultation inclusive of medications',
                details: [
                  {
                    coPayment: 30,
                    description: '',
                    panelVisit: 'Up to $375 per visit',
                    nonPanelVisit: 'Up to $375 per visit',
                    checkpointVisits: {
                      active: 30,
                      limit: 30,
                    },
                  },
                  {
                    coPayment: 30,
                    description: '',
                    panelVisit: 'Up to $375 per visit',
                    nonPanelVisit: 'Up to $375 per visit',
                    checkpointVisits: {
                      active: 30,
                      limit: 30,
                    },
                  },
                ],
              },
            ],
            panelLabel: 'panel label',
            nonPanelLabel: 'non panel label',
            freeChoiceLabel: 'free choice label',
            footnote: 'footnote',
            unlimitedCheckpoint: true,
          },
        ],
      },
    };

    const expected = {
      '3': {
        outpatient: {
          services: [
            {
              checkpointVisits: {
                active: 30,
                limit: 30,
              },
              coPayment: 30,
              description: '',
              metaText: 'Consultation inclusive of medications',
              name: 'General medical practitioner',
              id: 'GP',
              nonPanelVisit: 'Up to $375 per visit',
              panelVisit: 'Up to $375 per visit',
            },
            {
              checkpointVisits: {
                active: 30,
                limit: 30,
              },
              coPayment: 30,
              description: '',
              nonPanelVisit: 'Up to $375 per visit',
              panelVisit: 'Up to $375 per visit',
              metaText: 'Consultation inclusive of medications',
              name: 'General medical practitioner',
              id: 'GP',
            },
          ],
          footnote: 'footnote',
          name: 'Outpatient',
          panelLabel: 'panel label',
          nonPanelLabel: 'non panel label',
          freeChoiceLabel: 'free choice label',
          unlimitedCheckpoint: true,
        },
      },
    };
    const actual = transformBenefitPlans(plans);

    expect(actual).toStrictEqual(expected);
  });

  it('should provide empty object if plans are empty', () => {
    const actual = transformBenefitPlans([]);

    expect(actual).toStrictEqual({});
  });

  it('should return the benefit summary list', () => {
    const memberProfile = {
      fullName: 'William Brown',
      planId: 5,
      memberId: '1',
      checkpointVisits: { limit: 25 },
      relationship: 'Employee',
      relationships: [
        {
          fullName: 'Brown',
          planId: 2,
          memberId: '12',
          checkpointVisits: null,
          relationship: 'Spouse',
        },
        {
          fullName: 'Foo',
          planId: 3,
          memberId: '13',
          checkpointVisits: null,
          relationship: 'Child',
        },
      ],
      policy: {
        plans: {
          5: { name: 'III(Employee)' },
          2: { name: 'I' },
          3: { name: 'III(Dependent)' },
        },
      },
    };
    const expected = [
      {
        displayName:
          'William Brown ( Tier III(Employee) - Employee and dependant)',
        planId: 5,
        memberId: '1',
        checkpointVisits: { limit: 25 },
        relationship: 'Employee',
      },
      {
        displayName: 'Brown ( Tier I - Employee and dependant)',
        planId: 2,
        memberId: '12',
        checkpointVisits: null,
        relationship: 'Spouse',
      },
      {
        displayName: 'Foo ( Tier III(Dependent) - Employee and dependant)',
        planId: 3,
        memberId: '13',
        checkpointVisits: null,
        relationship: 'Child',
      },
    ];

    let actual = buildBenefitsSummaryList({}, memberProfile);
    expect(actual).toStrictEqual(expected);

    delete memberProfile.relationships;
    actual = buildBenefitsSummaryList({}, memberProfile);
    expect(actual).toStrictEqual([expected[0]]);

    memberProfile.planId = null;
    actual = buildBenefitsSummaryList({}, memberProfile);
    expected[0].displayName = 'William Brown';
    expected[0].planId = null;
    expect(actual).toStrictEqual([expected[0]]);
  });

  it('should build the map', () => {
    const data = [
      {
        name: 'A',
        value: '10',
      },
      {
        name: 'A',
        value: '11',
      },
      {
        name: 'B',
        value: '13',
      },
    ];
    const expected = {};
    expected.A = 2;
    expected.B = 1;

    const actual = buildMap(data, 'name');

    expect(actual).toStrictEqual(expected);
  });

  it('should add member details in selected plan details with wallet balance', () => {
    const outpatienService = {
      annualLimit: null,
      checkpointVisits: { active: 25, limit: 25, balance: 24 },
      coPayment: null,
      description: '',
      forRelationship: null,
      id: 'MIED',
      metaText: '',
      name: 'Mental illness & emotional disorder',
      nonPanelVisit: 'Up to $2,000 per visit',
      panelVisit: '$20 co-payment per visit',
    };
    const expectedData = {
      WellnessFlexibleSpending: {
        services: [
          {
            annualLimit: 3200,
            annualLimitText: 'HK$3200',
            checkpointVisits: null,
            coPayment: null,
            description: 'Max limit per day',
            forRelationship: 'Employee',
            id: 'RB',
            metaText: '',
            name: 'Room, board & general nursing care',
            nonPanelVisit: 'HK$1000 out of HK$3200 left',
            panelVisit: 'Basic private ward',
          },
        ],
      },
      Outpatient: {
        services: [
          {
            annualLimit: null,
            checkpointVisits: null,
            coPayment: null,
            description: 'Max limit per day',
            forRelationship: null,
            id: 'RB',
            metaText: '',
            name: 'Room, board & general nursing care',
            nonPanelVisit: '$3200',
            panelVisit: 'Basic private ward',
          },
          outpatienService,
        ],
      },
    };
    let checkpointVisitsData = [{ serviceId: 'MIED', usedCount: 1 }];
    let selectedPlanDetails = {
      WellnessFlexibleSpending: {
        services: [
          {
            annualLimit: 3200,
            annualLimitText: 'HK$3200',
            checkpointVisits: null,
            coPayment: null,
            description: 'Max limit per day',
            forRelationship: 'Employee',
            id: 'RB',
            metaText: '',
            name: 'Room, board & general nursing care',
            nonPanelVisit: '',
            panelVisit: 'Basic private ward',
          },
          {
            annualLimit: 5000,
            annualLimitText: 'HK$5000',
            checkpointVisits: null,
            coPayment: null,
            description: 'Max limit per day',
            forRelationship: 'Spouse',
            id: 'RB',
            metaText: '',
            name: 'Room, board & general nursing care',
            nonPanelVisit: '',
            panelVisit: 'Basic private ward',
          },
        ],
      },
      Outpatient: {
        services: [
          {
            annualLimit: null,
            checkpointVisits: null,
            coPayment: null,
            description: 'Max limit per day',
            forRelationship: null,
            id: 'RB',
            metaText: '',
            name: 'Room, board & general nursing care',
            nonPanelVisit: '$3200',
            panelVisit: 'Basic private ward',
          },
          {
            annualLimit: null,
            checkpointVisits: { active: 25, limit: 25 },
            coPayment: null,
            description: '',
            forRelationship: null,
            id: 'MIED',
            metaText: '',
            name: 'Mental illness & emotional disorder',
            nonPanelVisit: 'Up to $2,000 per visit',
            panelVisit: '$20 co-payment per visit',
          },
        ],
      },
    };

    expect(
      transformSelectedPlanWithMemberDetails(
        {},
        checkpointVisitsData,
        selectedPlanDetails,
        'HK$1000',
        'Employee',
      ),
    ).toStrictEqual(expectedData);

    checkpointVisitsData = null;
    expectedData.Outpatient.services[1] = {
      ...outpatienService,
      checkpointVisits: {
        ...outpatienService.checkpointVisits,
        balance: 25,
      },
    };
    expect(
      transformSelectedPlanWithMemberDetails(
        {},
        checkpointVisitsData,
        selectedPlanDetails,
        'HK$1000',
        'Employee',
      ),
    ).toStrictEqual(expectedData);

    selectedPlanDetails = null;
    expect(
      transformSelectedPlanWithMemberDetails(
        {},
        checkpointVisitsData,
        selectedPlanDetails,
        'HK$1000',
        'Employee',
      ),
    ).toStrictEqual({});
  });

  it('should add member details in selected plan details without wallet balance', () => {
    const expectedData = {
      WellnessFlexibleSpending: {
        services: [
          {
            annualLimit: 3200,
            annualLimitText: 'HK$3200',
            checkpointVisits: null,
            coPayment: null,
            description: 'Max limit per day',
            forRelationship: 'Employee',
            id: 'RB',
            metaText: '',
            name: 'Room, board & general nursing care',
            nonPanelVisit: '- out of HK$3200 left',
            panelVisit: 'Basic private ward',
          },
        ],
      },
    };
    const checkpointVisitsData = [{ serviceId: 'MIED', usedCount: 1 }];
    const selectedPlanDetails = {
      WellnessFlexibleSpending: {
        services: [
          {
            annualLimit: 3200,
            annualLimitText: 'HK$3200',
            checkpointVisits: null,
            coPayment: null,
            description: 'Max limit per day',
            forRelationship: 'Employee',
            id: 'RB',
            metaText: '',
            name: 'Room, board & general nursing care',
            nonPanelVisit: '',
            panelVisit: 'Basic private ward',
          },
        ],
      },
    };

    expect(
      transformSelectedPlanWithMemberDetails(
        {},
        checkpointVisitsData,
        selectedPlanDetails,
        undefined,
        'Employee',
      ),
    ).toStrictEqual(expectedData);
  });

  describe('getPlanName', () => {
    it('should return plan if existed', () => {
      const memeberId = 1;
      const benefits = [{ memberId: 1 }];

      const result = getPlanName(memeberId, benefits);

      expect(result).toStrictEqual(benefits[0]);
    });

    it('should return default plan with empty name if it does not exist', () => {
      const memeberId = '2';
      const benefits = [{ memberId: 1 }];

      const result = getPlanName(memeberId, benefits);

      expect(result).toStrictEqual({ name: '' });
    });
  });

  describe('benefitNameToKey', () => {
    it('should remove all space', () => {
      const name = 'this is name';

      const result = benefitNameToKey(name);

      expect(result).toStrictEqual('thisisname');
    });
  });

  describe('buildBenefitMemberList', () => {
    it('should return relationship including member', () => {
      const profile = {
        fullName: 'fullName 1',
        memberId: 1,
        category: 'tier 1',
        relationships: [
          {
            fullName: 'fullName 2',
            memberId: 2,
            category: 'tier 1',
          },
        ],
      };

      const result = buildBenefitMemberList({}, profile);

      expect(result).toStrictEqual([
        {
          memberId: 1,
          displayName: 'fullName 1 ( Tier 1 - Employee and dependant)',
        },
        {
          memberId: 2,
          displayName: 'fullName 2 ( Tier 1 - Employee and dependant)',
        },
      ]);
    });

    it('should return member only if there is no relationship', () => {
      const profile = {
        fullName: 'fullName 1',
        memberId: 1,
        category: 'tier 1',
      };

      const result = buildBenefitMemberList({}, profile);

      expect(result).toStrictEqual([
        {
          memberId: 1,
          displayName: 'fullName 1 ( Tier 1 - Employee and dependant)',
        },
      ]);
    });

    it('should return name only if there is no category', () => {
      const profile = {
        fullName: 'fullName 1',
        memberId: 1,
      };

      const result = buildBenefitMemberList({}, profile);

      expect(result).toStrictEqual([
        {
          memberId: 1,
          displayName: 'fullName 1',
        },
      ]);
    });
  });
});
