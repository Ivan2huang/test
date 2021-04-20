import {
  mapDispatchToProps,
  mapStateToProps,
  mergeProps,
} from '../ClaimsContainer';

const state = {
  claim: {
    history: {
      pendingClaims: [
        {
          status: 'Pending',
          claimantName: 'Willam',
        },
      ],
      approvedRejectedClaims: [
        {
          status: 'Approved',
          claimantName: 'Willam',
        },
        {
          status: 'Rejected',
          claimantName: 'Willam',
        },
      ],
      appliedFilters: {},
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

describe('ClaimsContainer', () => {
  describe('mapDispatchToProps', () => {
    it('should get all claims including pending approved and rejected', () => {
      const dispatch = jest.fn();
      const expected = {
        type: 'GET_CLAIMS',
        payload: {},
      };

      const dispatchToProps = mapDispatchToProps(dispatch);

      dispatchToProps.getClaims();

      expect(dispatch).toHaveBeenCalledWith(expected);
      expect(dispatch).toHaveBeenCalledTimes(1);
    });

    it('should get member profile', () => {
      const dispatch = jest.fn();
      const expected = {
        type: 'GET_MEMBER_PROFILE',
        payload: {},
      };

      const dispatchToProps = mapDispatchToProps(dispatch);

      dispatchToProps.getMemberProfile();

      expect(dispatch).toHaveBeenCalledWith(expected);
      expect(dispatch).toHaveBeenCalledTimes(1);
    });

    it('should get filtered claims', () => {
      const dispatch = jest.fn();
      const expected = {
        type: 'FILTER_CLAIMS',
        payload: {
          filters: {
            filters: {
              statuses: { APPROVED: true },
            },
          },
        },
      };

      const dispatchToProps = mapDispatchToProps(dispatch);

      dispatchToProps.filterClaims({
        filters: {
          statuses: { APPROVED: true },
        },
      });

      expect(dispatch).toHaveBeenCalledWith(expected);
      expect(dispatch).toHaveBeenCalledTimes(1);
    });
  });

  describe('map state to props', () => {
    it('should pass pending claims as props', () => {
      const expected = {
        role: 'Employee',
        pendingClaims: [
          {
            status: 'Pending',
            claimantName: 'Willam',
          },
        ],
        approvedRejectedClaims: [
          {
            status: 'Approved',
            claimantName: 'Willam',
          },
          {
            status: 'Rejected',
            claimantName: 'Willam',
          },
        ],
        membersMap: {
          1: 'test name',
          2: 'test name 2',
          3: 'test name 3',
        },
        appliedFilters: {},
      };

      const stateToProps = mapStateToProps(state);

      expect(stateToProps).toEqual(expected);
    });
  });

  describe('mergeProps', () => {
    it('should merge props with components object', () => {
      const dispatch = jest.fn();
      const props = mergeProps(
        mapStateToProps(state),
        mapDispatchToProps(dispatch),
      );

      const { NoClaims, ClaimsHeader } = props.components;

      expect(NoClaims).toBeDefined();
      expect(ClaimsHeader).toBeDefined();
    });
  });
});
