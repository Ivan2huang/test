import actionCreator from '../../../helpers/action';

export const GET_CLINICS = 'GET_CLINICS';
export const UPDATE_CLINICS = 'UPDATE_CLINICS';
export const UPDATE_SELECTED_CLINIC = 'UPDATE_SELECTED_CLINIC';
export const UPDATE_SELECTED_STACKED_CLINICS =
  'UPDATE_SELECTED_STACKED_CLINICS';
export const UPDATE_VIEW = 'UPDATE_VIEW';
export const SHOW_CLINIC_DETAIL = 'SHOW_CLINIC_DETAIL';
export const HIDE_CLINIC_DETAIL = 'HIDE_CLINIC_DETAIL';
export const UPDATE_RESULTANT_CLINICS = 'UPDATE_RESULTANT_CLINICS';
export const UPDATE_FIT_MAP_TO_ORIGINAL_POSITION =
  'UPDATE_FIT_MAP_TO_ORIGINAL_POSITION';
export const HANDLE_SINGLE_CLINIC_SELECT = 'HANDLE_SINGLE_CLINIC_SELECT';
export const HANDLE_STACKED_CLINIC_SELECT = 'HANDLE_STACKED_CLINIC_SELECT';
export const UPDATE_APPLIED_CONSULTATION_TYPES_FILTER =
  'UPDATE_APPLIED_CONSULTATION_TYPES_FILTER';
export const UPDATE_SEARCHED_CLINICS = 'UPDATE_SEARCHED_CLINICS';
export const FILTER_AND_SET_RESULTANT_CLINICS =
  'FILTER_AND_SET_RESULTANT_CLINICS';
export const FILTER_CLINICS = 'FILTER_CLINICS';
export const RESET_MAP = 'RESET_MAP';
export const TOGGLE_VIEW = 'TOGGLE_VIEW';
export const SEARCH_CLINIC = 'SEARCH_CLINIC';
export const SHOW_TOAST_MESSAGE = 'SHOW_TOAST_MESSAGE';
export const HIDE_TOAST_MESSAGE = 'HIDE_TOAST_MESSAGE';
export const SET_SELECTED_CLINIC_FROM_SEARCH_RESULT_PANEL =
  'SET_SELECTED_CLINIC_FROM_SEARCH_RESULT_PANEL';
export const UNSET_SELECTED_CLINIC_FROM_SEARCH_RESULT_PANEL =
  'UNSET_SELECTED_CLINIC_FROM_SEARCH_RESULT_PANEL';

export const getClinics = actionCreator(GET_CLINICS);
export const updateClinics = actionCreator(UPDATE_CLINICS, 'clinics');
export const updateSelectedClinic = actionCreator(
  UPDATE_SELECTED_CLINIC,
  'selectedClinic',
);
export const updateSelectedStackedClinics = actionCreator(
  UPDATE_SELECTED_STACKED_CLINICS,
  'selectedStackedClinics',
);
export const showClinicDetail = actionCreator(SHOW_CLINIC_DETAIL);
export const hideClinicDetail = actionCreator(HIDE_CLINIC_DETAIL);
export const updateResultantClinics = actionCreator(
  UPDATE_RESULTANT_CLINICS,
  'resultantClinics',
);
export const updateFitMapToOriginalPosition = actionCreator(
  UPDATE_FIT_MAP_TO_ORIGINAL_POSITION,
  'fitMapToOriginalPosition',
);

export const handleSingleClinicSelect = actionCreator(
  HANDLE_SINGLE_CLINIC_SELECT,
  'clinic',
  'selectedClinicFromSearchResultPanel',
  'viewFor',
);

export const handleStackedClinicSelect = actionCreator(
  HANDLE_STACKED_CLINIC_SELECT,
  'stackedClinics',
);

export const updateAppliedConsultationTypesFilter = actionCreator(
  UPDATE_APPLIED_CONSULTATION_TYPES_FILTER,
  'appliedConsultationTypesFilters',
);

export const updateSearchedClinics = actionCreator(
  UPDATE_SEARCHED_CLINICS,
  'searchedClinics',
);

export const filterClinics = actionCreator(
  FILTER_CLINICS,
  'searchedClinics',
  'filters',
);

export const resetMap = actionCreator(RESET_MAP, 'originalClinics');

export const toggleView = actionCreator(
  TOGGLE_VIEW,
  'isShowClinicDetail',
  'currentView',
);

export const searchClinic = actionCreator(
  SEARCH_CLINIC,
  'clinics',
  'keyword',
  'searchBy',
  'appliedFilters',
);

export const updateView = actionCreator(UPDATE_VIEW, 'view');

export const showToastMessage = actionCreator(SHOW_TOAST_MESSAGE);

export const hideToastMessage = actionCreator(HIDE_TOAST_MESSAGE);

export const setSelectedClinicFromSearchResultPanel = actionCreator(
  SET_SELECTED_CLINIC_FROM_SEARCH_RESULT_PANEL,
);

export const unSetSelectedClinicFromSearchResultPanel = actionCreator(
  UNSET_SELECTED_CLINIC_FROM_SEARCH_RESULT_PANEL,
);
