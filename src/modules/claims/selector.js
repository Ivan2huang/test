import { createSelector } from 'reselect';

const memberProfileSelector = meState => meState.member.profile;

// eslint-disable-next-line import/prefer-default-export
export const membersSelector = createSelector(
  memberProfileSelector,
  memberProfile => {
    const members = {};
    const { memberId, fullName } = memberProfile;
    if (memberId && fullName) {
      members[memberId] = fullName;
    }
    memberProfile.dependants.forEach(dependant => {
      members[dependant.memberId] = dependant.fullName;
    });
    return members;
  },
);
