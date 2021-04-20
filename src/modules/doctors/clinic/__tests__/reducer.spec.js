import reducer from '../reducer';

describe('Clinic reducer', () => {
  it('should update clinics', () => {
    const initialState = {
      clinics: [],
    };

    const action = {
      type: 'UPDATE_CLINICS',
      payload: {
        clinics: [
          {
            name: 'Dr Test Clinic',
            latitude: 1.3006643,
            longitude: 103.8001065,
          },
        ],
      },
    };

    const expected = {
      clinics: [
        {
          name: 'Dr Test Clinic',
          latitude: 1.3006643,
          longitude: 103.8001065,
        },
      ],
    };

    const state = reducer(initialState, action);

    expect(state).toEqual(expected);
  });

  it('should update selected clinics', () => {
    const initialState = {
      selectedClinic: {},
    };

    const action = {
      type: 'UPDATE_SELECTED_CLINIC',
      payload: {
        selectedClinic: {
          name: 'Dr Test Clinic',
          latitude: 1.3006643,
          longitude: 103.8001065,
        },
      },
    };

    const expected = {
      selectedClinic: {
        name: 'Dr Test Clinic',
        latitude: 1.3006643,
        longitude: 103.8001065,
      },
    };

    const state = reducer(initialState, action);

    expect(state).toEqual(expected);
  });

  it('should update selected stacked clinics', () => {
    const initialState = {
      selectedStackedClinics: [{ id: 101 }],
    };

    const action = {
      type: 'UPDATE_SELECTED_STACKED_CLINICS',
      payload: {
        selectedStackedClinics: [{ id: 101 }, { id: 102 }],
      },
    };

    const expected = {
      selectedStackedClinics: [{ id: 101 }, { id: 102 }],
    };

    const state = reducer(initialState, action);

    expect(state).toEqual(expected);
  });

  it('should update view', () => {
    const initialState = {
      view: 'map',
    };

    const action = {
      type: 'UPDATE_VIEW',
      payload: {
        view: 'list',
      },
    };

    const expected = {
      view: 'list',
    };

    const state = reducer(initialState, action);

    expect(state).toEqual(expected);
  });

  it('should make show clinic details true', () => {
    const initialState = {
      showClinicDetail: false,
    };

    const action = {
      type: 'SHOW_CLINIC_DETAIL',
      payload: {},
    };

    const expected = {
      showClinicDetail: true,
    };

    const state = reducer(initialState, action);

    expect(state).toEqual(expected);
  });

  it('should make show clinic detail false', () => {
    const initialState = {
      showClinicDetail: true,
    };

    const action = {
      type: 'HIDE_CLINIC_DETAIL',
      payload: {},
    };

    const expected = {
      showClinicDetail: false,
    };

    const state = reducer(initialState, action);

    expect(state).toEqual(expected);
  });

  it('should update resultant clinics', () => {
    const initialState = {
      resultantClinics: [{ id: 101 }],
    };

    const action = {
      type: 'UPDATE_RESULTANT_CLINICS',
      payload: {
        resultantClinics: [{ id: 200 }],
      },
    };

    const expected = {
      resultantClinics: [{ id: 200 }],
    };

    const state = reducer(initialState, action);

    expect(state).toEqual(expected);
  });

  it('should update fit map to original position', () => {
    const initialState = {
      fitMapToOriginalPosition: false,
    };

    const action = {
      type: 'UPDATE_FIT_MAP_TO_ORIGINAL_POSITION',
      payload: {
        fitMapToOriginalPosition: true,
      },
    };

    const expected = {
      fitMapToOriginalPosition: true,
    };

    const state = reducer(initialState, action);

    expect(state).toEqual(expected);
  });

  it('should update applied consultation types filters', () => {
    const initialState = {
      appliedConsultationTypesFilter: {},
    };

    const action = {
      type: 'UPDATE_APPLIED_CONSULTATION_TYPES_FILTER',
      payload: {
        appliedConsultationTypesFilters: { id: 100 },
      },
    };

    const expected = {
      appliedConsultationTypesFilter: { id: 100 },
    };

    const state = reducer(initialState, action);

    expect(state).toEqual(expected);
  });

  it('should update searched clinics ', () => {
    const initialState = {
      searchedClinics: [],
    };

    const action = {
      type: 'UPDATE_SEARCHED_CLINICS',
      payload: {
        searchedClinics: [{ id: 100 }, { id: 101 }],
      },
    };

    const expected = {
      searchedClinics: [{ id: 100 }, { id: 101 }],
    };

    const state = reducer(initialState, action);

    expect(state).toEqual(expected);
  });

  it('should update show toast message to true ', () => {
    const initialState = {
      openSnackBar: false,
    };

    const action = {
      type: 'SHOW_TOAST_MESSAGE',
      payload: {
        openSnackBar: false,
      },
    };

    const expected = {
      openSnackBar: true,
    };

    const state = reducer(initialState, action);

    expect(state).toEqual(expected);
  });

  it('should update show toast message to false', () => {
    const initialState = {
      openSnackBar: true,
    };

    const action = {
      type: 'HIDE_TOAST_MESSAGE',
      payload: {
        openSnackBar: false,
      },
    };

    const expected = {
      openSnackBar: false,
    };

    const state = reducer(initialState, action);

    expect(state).toEqual(expected);
  });

  it('should update selected clinic from search result panel to true', () => {
    const initialState = {
      selectedClinicFromSearchResultPanel: false,
    };

    const action = {
      type: 'SET_SELECTED_CLINIC_FROM_SEARCH_RESULT_PANEL',
      payload: {},
    };

    const expected = {
      selectedClinicFromSearchResultPanel: true,
    };

    const state = reducer(initialState, action);

    expect(state).toEqual(expected);
  });

  it('should update selected clinic from search result panel to false', () => {
    const initialState = {
      selectedClinicFromSearchResultPanel: true,
    };

    const action = {
      type: 'UNSET_SELECTED_CLINIC_FROM_SEARCH_RESULT_PANEL',
      payload: {
        selectedClinicFromSearchResultPanel: false,
      },
    };

    const expected = {
      selectedClinicFromSearchResultPanel: false,
    };

    const state = reducer(initialState, action);

    expect(state).toEqual(expected);
  });
});
