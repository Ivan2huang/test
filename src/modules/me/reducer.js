/* eslint-disable no-param-reassign */
import produce from 'immer';
import createReducer from '../../helpers/reducer';
import {
  UPDATE_MEMBER_PROFILE,
  UPDATE_MEMBERSHIP_DETAILS,
  UPDATE_POLICY_DETAILS,
  UPDATE_PERSONAL_EMAIL_STATUS,
  UPDATE_MOBILE_NUMBER_STATUS,
} from './action';
import { NONE } from './constant';

const initialState = {
  profile: {
    fullName: '',
    email: '',
    memberId: '',
    membershipNumber: '',
    preferredLocale: '',
    planId: 0,
    role: '',
    relationships: [],
    dependants: [],
    coPayments: {},
    healthCards: [],
    policy: {
      policyNumber: '',
      initialDate: '',
      expiryDate: '',
      insurer: {
        code: 0,
        name: '',
      },
      plans: {},
    },
    memberProfileOrder: [],
    status: NONE,
  },
  personalEmailStatus: {
    email: '',
    status: NONE,
  },
  mobileNumberStatus: {
    newValue: '',
    allowedToVerify: false,
    attemptCount: 0,
    nextOTPRequestAllowedAtUtc: '',
  },
};

const updateMemberProfile = produce((draft, action) => {
  draft.profile = {
    ...draft.profile,
    ...action.payload.memberProfile,
  };
});

const updateMembership = produce((draft, action) => {
  draft.membership = { ...action.payload.membership };
});

const updatePolicy = produce((draft, action) => {
  draft.policy = { ...action.payload.policy };
});

const updatePersonalEmailStatus = produce((draft, action) => {
  draft.personalEmailStatus = { ...action.payload.status };
});

const updateMobileNumberStatus = produce((draft, action) => {
  draft.mobileNumberStatus = { ...action.payload.status };
});

const reducer = createReducer(initialState, {
  [UPDATE_MEMBER_PROFILE]: updateMemberProfile,
  [UPDATE_MEMBERSHIP_DETAILS]: updateMembership,
  [UPDATE_POLICY_DETAILS]: updatePolicy,
  [UPDATE_PERSONAL_EMAIL_STATUS]: updatePersonalEmailStatus,
  [UPDATE_MOBILE_NUMBER_STATUS]: updateMobileNumberStatus,
});

export default reducer;
