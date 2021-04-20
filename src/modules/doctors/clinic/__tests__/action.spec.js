import {
  filterClinics,
  getClinics,
  handleSingleClinicSelect,
  handleStackedClinicSelect,
  hideClinicDetail,
  hideToastMessage,
  resetMap,
  searchClinic,
  setSelectedClinicFromSearchResultPanel,
  showClinicDetail,
  showToastMessage,
  toggleView,
  unSetSelectedClinicFromSearchResultPanel,
  UPDATE_CLINICS,
  updateAppliedConsultationTypesFilter,
  updateClinics,
  updateFitMapToOriginalPosition,
  updateResultantClinics,
  updateSearchedClinics,
  updateSelectedClinic,
  updateSelectedStackedClinics,
  updateView,
} from '../action';

describe('Clinic action', () => {
  it('should create get clinic action', () => {
    const expected = {
      type: 'GET_CLINICS',
      payload: {},
    };
    const actual = getClinics();

    expect(actual).toEqual(expected);
  });

  it('should create update clinic action', () => {
    const newClinics = [{ id: 100 }, { id: 101 }];
    const expected = {
      type: UPDATE_CLINICS,
      payload: { clinics: newClinics },
    };
    const actual = updateClinics(newClinics);

    expect(actual).toEqual(expected);
  });

  it('should create update selected clinic action', () => {
    const expected = {
      type: 'UPDATE_SELECTED_CLINIC',
      payload: {
        selectedClinic: {
          id: 100,
        },
      },
    };
    const actual = updateSelectedClinic({ id: 100 });

    expect(actual).toEqual(expected);
  });

  it('should create update selected selected clinic action', () => {
    const expected = {
      type: 'UPDATE_SELECTED_STACKED_CLINICS',
      payload: {
        selectedStackedClinics: [{ id: 100 }, { id: 101 }],
      },
    };
    const actual = updateSelectedStackedClinics([{ id: 100 }, { id: 101 }]);

    expect(actual).toEqual(expected);
  });

  it('should create update view action', () => {
    const expected = {
      type: 'UPDATE_VIEW',
      payload: {
        view: 'list',
      },
    };
    const actual = updateView('list');

    expect(actual).toEqual(expected);
  });

  it('should create show clinic detail  action', () => {
    const expected = {
      type: 'SHOW_CLINIC_DETAIL',
      payload: {},
    };
    const actual = showClinicDetail();

    expect(actual).toEqual(expected);
  });

  it('should create hide clinic detail  action', () => {
    const expected = {
      type: 'HIDE_CLINIC_DETAIL',
      payload: {},
    };
    const actual = hideClinicDetail();

    expect(actual).toEqual(expected);
  });

  it('should create update resultant clinics action', () => {
    const expected = {
      type: 'UPDATE_RESULTANT_CLINICS',
      payload: {
        resultantClinics: [{ id: 10 }, { id: 11 }],
      },
    };
    const actual = updateResultantClinics([{ id: 10 }, { id: 11 }]);

    expect(actual).toEqual(expected);
  });

  it('should create update fit map to original position action', () => {
    const expected = {
      type: 'UPDATE_FIT_MAP_TO_ORIGINAL_POSITION',
      payload: {
        fitMapToOriginalPosition: true,
      },
    };
    const actual = updateFitMapToOriginalPosition(true);

    expect(actual).toEqual(expected);
  });

  it('should create handle single clinic select action', () => {
    const expected = {
      type: 'HANDLE_SINGLE_CLINIC_SELECT',
      payload: {
        clinic: {
          id: 100,
        },
        selectedClinicFromSearchResultPanel: true,
        viewFor: 'viewFor',
      },
    };
    const actual = handleSingleClinicSelect({ id: 100 }, true, 'viewFor');

    expect(actual).toEqual(expected);
  });

  it('should create handle stacked clinics select action', () => {
    const expected = {
      type: 'HANDLE_STACKED_CLINIC_SELECT',
      payload: {
        stackedClinics: [{ id: 100 }, { id: 101 }],
      },
    };
    const actual = handleStackedClinicSelect([{ id: 100 }, { id: 101 }]);

    expect(actual).toEqual(expected);
  });

  it('should create update applied consultation types filter action', () => {
    const expected = {
      type: 'UPDATE_APPLIED_CONSULTATION_TYPES_FILTER',
      payload: {
        appliedConsultationTypesFilters: { id: 100 },
      },
    };
    const actual = updateAppliedConsultationTypesFilter({ id: 100 });

    expect(actual).toEqual(expected);
  });

  it('should create update searched clinics action', () => {
    const expected = {
      type: 'UPDATE_SEARCHED_CLINICS',
      payload: {
        searchedClinics: [{ id: 100 }, { id: 101 }],
      },
    };
    const actual = updateSearchedClinics([{ id: 100 }, { id: 101 }]);

    expect(actual).toEqual(expected);
  });

  it('should create filter clinics action', () => {
    const expected = {
      type: 'FILTER_CLINICS',
      payload: {
        searchedClinics: [{ id: 100 }, { id: 101 }],
        filters: { id: 100 },
      },
    };
    const actual = filterClinics([{ id: 100 }, { id: 101 }], { id: 100 });

    expect(actual).toEqual(expected);
  });

  it('should create reset map action action', () => {
    const expected = {
      type: 'RESET_MAP',
      payload: {
        originalClinics: [{ id: 100 }],
      },
    };
    const actual = resetMap([{ id: 100 }]);

    expect(actual).toEqual(expected);
  });

  it('should create toggle view action', () => {
    const expected = {
      type: 'TOGGLE_VIEW',
      payload: {
        isShowClinicDetail: true,
        currentView: 'list',
      },
    };
    const actual = toggleView(true, 'list');

    expect(actual).toEqual(expected);
  });

  it('should create search clinic action', () => {
    const expected = {
      type: 'SEARCH_CLINIC',
      payload: {
        clinics: [{ id: 100 }],
        keyword: 'test',
        searchBy: 'area',
        appliedFilters: { id: 100 },
      },
    };
    const actual = searchClinic([{ id: 100 }], 'test', 'area', { id: 100 });

    expect(actual).toEqual(expected);
  });

  it('should create show toast message action', () => {
    const expected = {
      type: 'SHOW_TOAST_MESSAGE',
      payload: {},
    };
    const actual = showToastMessage();

    expect(actual).toEqual(expected);
  });

  it('should create hide toast message action', () => {
    const expected = {
      type: 'HIDE_TOAST_MESSAGE',
      payload: {},
    };
    const actual = hideToastMessage();

    expect(actual).toEqual(expected);
  });

  it('should create set selected clinic from search result panel action', () => {
    const expected = {
      type: 'SET_SELECTED_CLINIC_FROM_SEARCH_RESULT_PANEL',
      payload: {},
    };
    const actual = setSelectedClinicFromSearchResultPanel();

    expect(actual).toEqual(expected);
  });

  it('should create unSet selected clinic from search result panel action', () => {
    const expected = {
      type: 'UNSET_SELECTED_CLINIC_FROM_SEARCH_RESULT_PANEL',
      payload: {},
    };
    const actual = unSetSelectedClinicFromSearchResultPanel();

    expect(actual).toEqual(expected);
  });
});
