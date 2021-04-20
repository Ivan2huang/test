import { createSelector } from 'reselect';

const stateSelector = state => state;
const memberStateSelector = state => state.me.member;

// eslint-disable-next-line import/prefer-default-export
export const walletsSelector = createSelector(
  stateSelector,
  ({ me, benefits }) => {
    const { profile = {} } = me.member;
    const {
      wallets: { wallets, planYear, isWalletsDisabled },
    } = benefits;
    const { member, dependents = [] } = wallets;
    const { endDate } = planYear;
    const allWallets = [];
    const eWallets = {
      isWalletsDisabled,
      expiryDate: endDate ? new Date(endDate) : undefined,
      wallets: allWallets,
    };
    if (member) {
      allWallets.push({
        ...member,
        firstName: profile.firstName,
        lastName: profile.lastName,
      });
    }
    dependents.forEach(wallet => {
      profile.dependants.forEach(dependant => {
        if (wallet.memberId === dependant.memberId) {
          allWallets.push({
            ...wallet,
            firstName: dependant.firstName,
            lastName: dependant.lastName,
          });
        }
      });
    });

    return eWallets;
  },
);

export const roleSelector = createSelector(
  memberStateSelector,
  memberState => {
    const { profile: { role } = {} } = memberState;

    return role;
  },
);
