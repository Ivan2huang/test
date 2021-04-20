/* eslint-disable no-param-reassign */
import produce from 'immer';

import createReducer from '../../../helpers/reducer';
import {
  HIDE_CLINIC_DETAIL,
  HIDE_TOAST_MESSAGE,
  SET_SELECTED_CLINIC_FROM_SEARCH_RESULT_PANEL,
  SHOW_CLINIC_DETAIL,
  SHOW_TOAST_MESSAGE,
  UNSET_SELECTED_CLINIC_FROM_SEARCH_RESULT_PANEL,
  UPDATE_APPLIED_CONSULTATION_TYPES_FILTER,
  UPDATE_CLINICS,
  UPDATE_FIT_MAP_TO_ORIGINAL_POSITION,
  UPDATE_RESULTANT_CLINICS,
  UPDATE_SEARCHED_CLINICS,
  UPDATE_SELECTED_CLINIC,
  UPDATE_SELECTED_STACKED_CLINICS,
  UPDATE_VIEW,
} from './action';
import { VIEW } from './constants';

const initialState = {
  clinics: [],
  selectedClinic: {},
  selectedStackedClinics: [],
  searchedClinics: [],
  view: VIEW.map,
  showClinicDetail: false,
  resultantClinics: [],
  fitMapToOriginalPosition: false,
  appliedConsultationTypesFilter: {},
  openSnackBar: false,
  selectedClinicFromSearchResultPanel: false,
};

const updateClinics = produce((draft, action) => {
  const { clinics } = action.payload;
  draft.clinics = clinics;
});

const updateSelectedClinic = produce((draft, action) => {
  const { selectedClinic } = action.payload;
  draft.selectedClinic = selectedClinic;
});

const updateSelectedStackedClinics = produce((draft, action) => {
  const { selectedStackedClinics } = action.payload;
  draft.selectedStackedClinics = selectedStackedClinics;
});

const updateView = produce((draft, action) => {
  const { view } = action.payload;
  draft.view = view;
});

const showClinicDetail = produce(draft => {
  draft.showClinicDetail = true;
});

const hideClinicDetail = produce(draft => {
  draft.showClinicDetail = false;
});

const updateResultantClinics = produce((draft, action) => {
  const { resultantClinics } = action.payload;
  draft.resultantClinics = resultantClinics;
});

const updateFitMapToOriginalPosition = produce((draft, action) => {
  const { fitMapToOriginalPosition } = action.payload;
  draft.fitMapToOriginalPosition = fitMapToOriginalPosition;
});

const updateAppliedConsultationTypesFilter = produce((draft, action) => {
  const { appliedConsultationTypesFilters } = action.payload;
  draft.appliedConsultationTypesFilter = appliedConsultationTypesFilters;
});

const updateSearchedClinics = produce((draft, action) => {
  const { searchedClinics } = action.payload;
  draft.searchedClinics = searchedClinics;
});

const showToastMessage = produce(draft => {
  draft.openSnackBar = true;
});

const hideToastMessage = produce(draft => {
  draft.openSnackBar = false;
});

const setSelectedClinicFromSearchResultPanel = produce(draft => {
  draft.selectedClinicFromSearchResultPanel = true;
});

const unSetSelectedClinicFromSearchResultPanel = produce(draft => {
  draft.selectedClinicFromSearchResultPanel = false;
});

const reducer = createReducer(initialState, {
  [UPDATE_CLINICS]: updateClinics,
  [UPDATE_SELECTED_CLINIC]: updateSelectedClinic,
  [UPDATE_SELECTED_STACKED_CLINICS]: updateSelectedStackedClinics,
  [UPDATE_VIEW]: updateView,
  [SHOW_CLINIC_DETAIL]: showClinicDetail,
  [HIDE_CLINIC_DETAIL]: hideClinicDetail,
  [UPDATE_RESULTANT_CLINICS]: updateResultantClinics,
  [UPDATE_FIT_MAP_TO_ORIGINAL_POSITION]: updateResultantClinics,
  [UPDATE_FIT_MAP_TO_ORIGINAL_POSITION]: updateFitMapToOriginalPosition,
  [UPDATE_APPLIED_CONSULTATION_TYPES_FILTER]: updateAppliedConsultationTypesFilter,
  [UPDATE_SEARCHED_CLINICS]: updateSearchedClinics,
  [SHOW_TOAST_MESSAGE]: showToastMessage,
  [HIDE_TOAST_MESSAGE]: hideToastMessage,
  [SET_SELECTED_CLINIC_FROM_SEARCH_RESULT_PANEL]: setSelectedClinicFromSearchResultPanel,
  [UNSET_SELECTED_CLINIC_FROM_SEARCH_RESULT_PANEL]: unSetSelectedClinicFromSearchResultPanel,
});

export default reducer;
