import { mapDispatchToProps, mapStateToProps } from '../FilterContainer';
import { FILTER_CLAIMS } from '../action';
import { FILTER_STATUSES, FILTER_CATEGORIES } from '../constant';

const state = {
  claim: {
    history: {
      pendingClaims: [
        {
          patientId: '1',
        },
      ],
      approvedRejectedClaims: [
        {
          patientId: '2',
        },
      ],
      appliedFilters: { statuses: { APPROVED: true } },
    },
  },
  me: {
    member: {
      profile: {
        role: 'Employee',
        memberId: 1,
        fullName: 'test name',
        dependants: [
          {
            memberId: 2,
            fullName: 'test name 2',
          },
          {
            memberId: 3,
            fullName: 'test name 3',
          },
        ],
      },
    },
  },
};

describe('FilterContainer', () => {
  describe('mapDispatchToProps', () => {
    it('should get all claims based on filter values', () => {
      const filters = {
        statuses: {
          APPROVED: true,
        },
      };
      const dispatch = jest.fn();
      const expected = {
        type: FILTER_CLAIMS,
        payload: { filters },
      };

      const dispatchToProps = mapDispatchToProps(dispatch);

      dispatchToProps.filterClaims(filters);

      expect(dispatch).toHaveBeenCalledWith(expected);
      expect(dispatch).toHaveBeenCalledTimes(1);
    });
  });

  describe('map state to props', () => {
    it('should pass options, mappers, appliedFilters as props', () => {
      const expected = {
        appliedFilters: { statuses: { APPROVED: true } },
        options: {
          statuses: Object.values(FILTER_STATUSES),
          categoryCodes: Object.values(FILTER_CATEGORIES),
          patientIds: ['1', '2', '3'],
        },
        mappers: {
          patientIds: {
            '1': 'test name',
            '2': 'test name 2',
            '3': 'test name 3',
          },
        },
      };

      const stateToProps = mapStateToProps(state);

      expect(stateToProps).toEqual(expected);
    });
  });
});
