import actionCreator from '../../../helpers/action';

export const VALIDATE_ACTIVATION = 'VALIDATE_ACTIVATION';

export const UPDATE_VALIDATION_STATUS = 'UPDATE_VALIDATION_STATUS';

export const validateActivation = actionCreator(
  VALIDATE_ACTIVATION,
  'client',
  'token',
);

export const updateValidationStatus = actionCreator(
  UPDATE_VALIDATION_STATUS,
  'status',
);
