/* eslint-disable no-param-reassign */
import produce from 'immer';
import createReducer from '../../helpers/reducer';
import {
  UPDATE_WELLNESS_STATUS,
  UPDATE_OUTPATIENT_STATUS,
  UPDATE_E_HEALTH_CARD_STATUS,
} from './action';

const initialState = {
  hasWellness: false,
  hasOutpatient: false,
  hasEHealthCard: false,
  eHealthCardDetails: {},
  isClientUsingHase: false,
  cardTypeDetails: {},
  isClientGMM: false,
};

const updateWellnessStatus = produce((draft, action) => {
  const { status } = action.payload;
  draft.hasWellness = status;
});

const updateOutpatientStatus = produce((draft, action) => {
  const { status } = action.payload;
  draft.hasOutpatient = status;
});

const updateEHealthCardStatus = produce((draft, action) => {
  const {
    status,
    eHealthCardDetails,
    isClientUsingHase,
    cardTypeDetails,
    isClientGMM,
  } = action.payload;
  draft.hasEHealthCard = status;
  draft.eHealthCardDetails = eHealthCardDetails;
  draft.isClientUsingHase = isClientUsingHase;
  draft.cardTypeDetails = cardTypeDetails;
  draft.isClientGMM = isClientGMM;
});

const reducer = createReducer(initialState, {
  [UPDATE_WELLNESS_STATUS]: updateWellnessStatus,
  [UPDATE_OUTPATIENT_STATUS]: updateOutpatientStatus,
  [UPDATE_E_HEALTH_CARD_STATUS]: updateEHealthCardStatus,
});

export default reducer;
