import actionCreator from '../../helpers/action';

export const UPDATE_WELLNESS_STATUS = 'UPDATE_WELLNESS_STATUS';
export const UPDATE_OUTPATIENT_STATUS = 'UPDATE_OUTPATIENT_STATUS';
export const UPDATE_E_HEALTH_CARD_STATUS = 'UPDATE_E_HEALTH_CARD_STATUS';

export const updateWellnessStatus = actionCreator(
  UPDATE_WELLNESS_STATUS,
  'status',
);

export const updateOutpatientStatus = actionCreator(
  UPDATE_OUTPATIENT_STATUS,
  'status',
);

export const updateEHealthCardStatus = actionCreator(
  UPDATE_E_HEALTH_CARD_STATUS,
  'status',
  'eHealthCardDetails',
  'isClientUsingHase',
  'cardTypeDetails',
  'isClientGMM',
);
