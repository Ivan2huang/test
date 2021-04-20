import { all, call, put, takeEvery } from 'redux-saga/effects';

import clinicSaga, {
  filterAndSetResultantSaga,
  filterClinicsSaga,
  getClinicsSaga,
  handleSingleClinicSelectSaga,
  handleStackedClinicSelectSaga,
  hideClinicDetailsView,
  resetMapSaga,
  searchClinicSaga,
  toggleViewSaga,
} from '../saga';
import {
  FILTER_AND_SET_RESULTANT_CLINICS,
  FILTER_CLINICS,
  GET_CLINICS,
  HANDLE_SINGLE_CLINIC_SELECT,
  HANDLE_STACKED_CLINIC_SELECT,
  hideClinicDetail,
  RESET_MAP,
  SEARCH_CLINIC,
  setSelectedClinicFromSearchResultPanel,
  showClinicDetail,
  showToastMessage,
  TOGGLE_VIEW,
  unSetSelectedClinicFromSearchResultPanel,
  updateAppliedConsultationTypesFilter,
  updateClinics,
  updateFitMapToOriginalPosition,
  updateResultantClinics,
  updateSearchedClinics,
  updateSelectedClinic,
  updateSelectedStackedClinics,
  updateView,
} from '../action';
import getClinics from '../api';
import { filterClinics, findClinics } from '../helper';

jest.mock('../../../loader', () => ({
  *loader(task, id) {
    yield ['START_LOADER', id];
    yield* task();
    yield ['STOP_LOADER', id];
  },
}));

jest.mock('../helper', () => ({
  findClinics: jest.fn(),
  filterClinics: jest.fn(),
}));

describe('Clinic Saga', () => {
  it('should watch actions', () => {
    const generator = clinicSaga();

    let next = generator.next();
    expect(next.value).toEqual(all([takeEvery(GET_CLINICS, getClinicsSaga)]));

    next = generator.next();
    expect(next.value).toEqual(
      all([
        takeEvery(HANDLE_SINGLE_CLINIC_SELECT, handleSingleClinicSelectSaga),
      ]),
    );

    next = generator.next();
    expect(next.value).toEqual(
      all([
        takeEvery(HANDLE_STACKED_CLINIC_SELECT, handleStackedClinicSelectSaga),
      ]),
    );

    next = generator.next();
    expect(next.value).toEqual(
      all([
        takeEvery(FILTER_AND_SET_RESULTANT_CLINICS, filterAndSetResultantSaga),
      ]),
    );

    next = generator.next();
    expect(next.value).toEqual(
      all([takeEvery(FILTER_CLINICS, filterClinicsSaga)]),
    );

    next = generator.next();
    expect(next.value).toEqual(all([takeEvery(RESET_MAP, resetMapSaga)]));

    next = generator.next();
    expect(next.value).toEqual(all([takeEvery(TOGGLE_VIEW, toggleViewSaga)]));

    next = generator.next();
    expect(next.value).toEqual(
      all([takeEvery(SEARCH_CLINIC, searchClinicSaga)]),
    );
  });

  it('should get panel clinics', () => {
    const generator = getClinicsSaga();

    let next = generator.next();
    expect(next.value).toStrictEqual(['START_LOADER', 'page']);
    next = generator.next();
    expect(next.value).toEqual(call(getClinics));
    next = generator.next();
    expect(next.value).toStrictEqual(['STOP_LOADER', 'page']);
    next = generator.next();
    expect(next.done).toBe(true);
  });

  it('should update clinics', () => {
    const clinics = [
      {
        name: 'Dr Test Clinic',
        latitude: 1.3006643,
        longitude: 103.8001065,
      },
    ];
    const generator = getClinicsSaga();
    let next = generator.next();
    expect(next.value).toStrictEqual(['START_LOADER', 'page']);
    generator.next();
    next = generator.next(clinics);
    expect(next.value).toEqual(put(updateClinics(clinics)));
    next = generator.next();
    expect(next.value).toStrictEqual(['STOP_LOADER', 'page']);
    next = generator.next();
    expect(next.done).toBe(true);
  });

  it('should handle single clinic select action with selected clinic from search result panel', () => {
    const clinic = {
      id: 100,
    };
    const selectedClinicFromSearchResultPanel = true;
    const viewFor = 'selectedStackedClinics';
    const action = {
      payload: {
        clinic,
        selectedClinicFromSearchResultPanel,
        viewFor,
      },
    };
    const generator = handleSingleClinicSelectSaga(action);
    let next = generator.next();
    expect(next.value).toEqual(put(setSelectedClinicFromSearchResultPanel()));

    next = generator.next();
    expect(next.value).toEqual(put(updateSelectedClinic(clinic)));

    next = generator.next();
    expect(next.value).toEqual(put(showClinicDetail()));
  });

  it('should handle single clinic select action with selected clinic from map', () => {
    const clinic = {
      id: 100,
    };
    const selectedClinicFromSearchResultPanel = false;
    const viewFor = 'selectedStackedClinics';
    const action = {
      payload: {
        clinic,
        selectedClinicFromSearchResultPanel,
        viewFor,
      },
    };
    const generator = handleSingleClinicSelectSaga(action);
    let next = generator.next();
    expect(next.value).toEqual(put(unSetSelectedClinicFromSearchResultPanel()));

    next = generator.next();
    expect(next.value).toEqual(put(updateSelectedClinic(clinic)));

    next = generator.next();
    expect(next.value).toEqual(put(showClinicDetail()));
  });

  it('should handle single clinic select action with view for filtered clinics', () => {
    const clinic = {
      id: 100,
    };
    const selectedClinicFromSearchResultPanel = false;
    const viewFor = 'filteredClinics';
    const action = {
      payload: {
        clinic,
        selectedClinicFromSearchResultPanel,
        viewFor,
      },
    };
    const generator = handleSingleClinicSelectSaga(action);
    let next = generator.next();
    expect(next.value).toEqual(put(updateSelectedStackedClinics([])));

    next = generator.next();
    expect(next.value).toEqual(put(unSetSelectedClinicFromSearchResultPanel()));

    next = generator.next();
    expect(next.value).toEqual(put(updateSelectedClinic(clinic)));

    next = generator.next();
    expect(next.value).toEqual(put(showClinicDetail()));
  });

  it('should handle hide clinic detail view', () => {
    const generator = hideClinicDetailsView();

    let next = generator.next();
    expect(next.value).toEqual(put(updateSelectedClinic({})));

    next = generator.next();
    expect(next.value).toEqual(put(hideClinicDetail()));
  });

  it('should handle stacked clinics select', () => {
    const stackedClinics = [{ id: 100 }, { id: 101 }];
    const action = {
      payload: {
        stackedClinics,
      },
    };
    const generator = handleStackedClinicSelectSaga(action);

    let next = generator.next();
    expect(next.value).toEqual(
      put(updateSelectedStackedClinics(stackedClinics)),
    );

    next = generator.next();
    expect(next.value).toEqual(put(updateSelectedClinic({})));

    next = generator.next();
    expect(next.value).toEqual(put(hideClinicDetail()));
  });

  it('should handle filter and set resultant clinics', () => {
    const clinicList = [{ id: 100 }, { id: 101 }];
    const filters = { id: 100 };
    const action = {
      payload: {
        clinicList,
        filters,
      },
    };
    filterClinics.mockReturnValue([{ id: 101 }]);
    const generator = filterAndSetResultantSaga(action);

    let next = generator.next();
    expect(next.value).toEqual(put(updateResultantClinics([{ id: 101 }])));

    next = generator.next();
    expect(next.value).toEqual(put(updateSelectedClinic({})));

    next = generator.next();
    expect(next.value).toEqual(put(hideClinicDetail()));
  });

  it('should handle filter and set resultant clinics when no clinics found during search', () => {
    const clinicList = [{ id: 100 }, { id: 101 }];
    const filters = { id: 100 };
    const action = {
      payload: {
        clinicList,
        filters,
      },
    };
    filterClinics.mockReturnValue([]);
    const generator = filterAndSetResultantSaga(action);

    let next = generator.next();
    expect(next.value).toEqual(put(updateResultantClinics([])));

    next = generator.next();
    expect(next.value).toEqual(put(showToastMessage()));

    next = generator.next();
    expect(next.value).toEqual(put(updateSelectedClinic({})));

    next = generator.next();
    expect(next.value).toEqual(put(hideClinicDetail()));
  });

  it('should handle filter clinics', () => {
    const searchedClinics = [{ id: 100 }, { id: 101 }];
    const filters = { id: 100 };
    const action = {
      payload: {
        searchedClinics,
        filters,
      },
    };
    filterClinics.mockReturnValue([{ id: 101 }]);
    const generator = filterClinicsSaga(action);

    let next = generator.next();
    expect(next.value).toEqual(put(updateSelectedStackedClinics([])));

    next = generator.next();
    expect(next.value).toEqual(put(updateSelectedClinic({})));

    next = generator.next();
    expect(next.value).toEqual(put(updateResultantClinics([{ id: 101 }])));

    next = generator.next();
    expect(next.value).toEqual(put(updateSelectedClinic({})));

    next = generator.next();
    expect(next.value).toEqual(put(hideClinicDetail()));

    next = generator.next();
    expect(next.value).toEqual(
      put(updateAppliedConsultationTypesFilter(filters)),
    );
  });

  it('should handle reset map', () => {
    const originalClinics = [{ id: 100 }, { id: 101 }];
    const action = {
      payload: {
        originalClinics,
      },
    };
    const generator = resetMapSaga(action);

    let next = generator.next();
    expect(next.value).toEqual(put(updateResultantClinics(originalClinics)));

    next = generator.next();
    expect(next.value).toEqual(put(updateAppliedConsultationTypesFilter({})));

    next = generator.next();
    expect(next.value).toEqual(put(updateSearchedClinics(originalClinics)));

    next = generator.next();
    expect(next.value).toEqual(put(updateSelectedStackedClinics([])));

    next = generator.next();
    expect(next.value).toEqual(put(updateSelectedClinic({})));

    next = generator.next();
    expect(next.value).toEqual(put(hideClinicDetail()));

    next = generator.next();
    expect(next.value).toEqual(put(updateFitMapToOriginalPosition(true)));
  });

  it('should handle toggle view when current view is map and show clinic detail view is true', () => {
    const isShowClinicDetail = true;
    const currentView = 'map';
    const action = {
      payload: {
        isShowClinicDetail,
        currentView,
      },
    };
    const generator = toggleViewSaga(action);

    let next = generator.next();
    expect(next.value).toEqual(put(hideClinicDetail()));

    next = generator.next();
    expect(next.value).toEqual(put(updateView('list')));
  });

  it('should handle toggle view when current view is map and show clinic detail view is false', () => {
    const isShowClinicDetail = false;
    const currentView = 'map';
    const action = {
      payload: {
        isShowClinicDetail,
        currentView,
      },
    };
    const generator = toggleViewSaga(action);

    const next = generator.next();
    expect(next.value).toEqual(put(updateView('list')));
  });

  it('should handle toggle view when current view is list and show clinic detail view is false', () => {
    const isShowClinicDetail = false;
    const currentView = 'list';
    const action = {
      payload: {
        isShowClinicDetail,
        currentView,
      },
    };
    const generator = toggleViewSaga(action);

    const next = generator.next();
    expect(next.value).toEqual(put(updateView('map')));
  });
  it('should handle search clinics clinics with results found', () => {
    const clinics = [{ id: 100 }, { id: 101 }];
    const keyword = 'test';
    const searchBy = 'area';
    const appliedFilters = { id: 100 };
    const action = {
      payload: {
        clinics,
        keyword,
        searchBy,
        appliedFilters,
      },
    };

    findClinics.mockReturnValue([{ id: 101 }]);
    const generator = searchClinicSaga(action);

    let next = generator.next();
    expect(next.value).toEqual(put(updateSearchedClinics([{ id: 101 }])));

    next = generator.next();
    expect(next.value).toEqual(put(updateResultantClinics([{ id: 101 }])));

    next = generator.next();
    expect(next.value).toEqual(put(updateSelectedClinic({})));

    next = generator.next();
    expect(next.value).toEqual(put(hideClinicDetail()));
  });

  it('should handle search clinics clinics with no results found', () => {
    const clinics = [{ id: 100 }, { id: 101 }];
    const keyword = 'test';
    const searchBy = 'area';
    const appliedFilters = { id: 100 };
    const action = {
      payload: {
        clinics,
        keyword,
        searchBy,
        appliedFilters,
      },
    };

    findClinics.mockReturnValue([]);
    filterClinics.mockReturnValue([]);
    const generator = searchClinicSaga(action);

    let next = generator.next();
    expect(next.value).toEqual(put(showToastMessage()));

    next = generator.next();
    expect(next.value).toEqual(put(updateSearchedClinics([])));

    next = generator.next();
    expect(next.value).toEqual(put(updateResultantClinics([])));

    next = generator.next();
    expect(next.value).toEqual(put(showToastMessage()));

    next = generator.next();
    expect(next.value).toEqual(put(updateSelectedClinic({})));

    next = generator.next();
    expect(next.value).toEqual(put(hideClinicDetail()));
  });
});
