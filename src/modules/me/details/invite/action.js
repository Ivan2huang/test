import actionCreator from '../../../../helpers/action';

export const INVITE_DEPENDENT = 'INVITE_DEPENDENT';

export const inviteDependent = actionCreator(
  INVITE_DEPENDENT,
  'dependentData',
  'loaderMessage',
);
