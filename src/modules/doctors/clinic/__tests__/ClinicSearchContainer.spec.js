import {
  mapDispatchToProps,
  mapStateToProps,
  setCachedAppliedConsultationTypesFilter,
  setCachedClinics,
} from '../ClinicSearchContainer';
import { RESET_MAP, SEARCH_CLINIC } from '../action';
import filterSelector from '../selector';

jest.mock('../selector', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('Clinic Search Container', () => {
  it('should pass props to component', () => {
    const areaMap = {};
    areaMap.area1 = 'Central1';
    filterSelector.mockReturnValue({
      areas: areaMap,
      consultationTypes: ['test consultation1'],
    });
    const state = {
      clinic: {
        clinics: [
          {
            name: 'Dr Test Clinic',
            latitude: 1.3006643,
            longitude: 103.8001065,
            area: 'area1',
            district: 'Central1',
            consultationType: 'test consultation1',
          },
        ],
        appliedConsultationTypesFilter: { id: 100 },
        showClinicDetail: false,
      },
    };
    const expected = {
      areas: areaMap,
    };

    const actual = mapStateToProps(state);

    expect(actual).toEqual(expected);
  });

  it('should dispatch search clinic', () => {
    const dispatch = jest.fn();
    setCachedClinics([{ id: 100 }, { id: 101 }]);
    setCachedAppliedConsultationTypesFilter({ id: 101 });
    const expected = {
      type: SEARCH_CLINIC,
      payload: {
        clinics: [{ id: 100 }, { id: 101 }],
        keyword: 'test',
        searchBy: 'area',
        appliedFilters: { id: 101 },
      },
    };
    const dispatchMapToProps = mapDispatchToProps(dispatch);
    dispatchMapToProps.searchClinic('test', 'area');

    expect(dispatch).toHaveBeenCalledWith(expected);
  });

  it('should dispatch reset Map', () => {
    const dispatch = jest.fn();
    setCachedClinics([{ id: 100 }, { id: 101 }]);
    setCachedAppliedConsultationTypesFilter({ id: 101 });
    const expected = {
      type: RESET_MAP,
      payload: {
        originalClinics: [{ id: 100 }, { id: 101 }],
      },
    };
    const dispatchMapToProps = mapDispatchToProps(dispatch);
    dispatchMapToProps.resetMap([{ id: 100 }, { id: 101 }]);

    expect(dispatch).toHaveBeenCalledWith(expected);
  });
});
