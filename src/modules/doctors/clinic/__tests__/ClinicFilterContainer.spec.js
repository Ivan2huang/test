import {
  mapDispatchToProps,
  mapStateToProps,
  setCachedSearchedClinics,
} from '../ClinicFilterContainer';
import { FILTER_CLINICS } from '../action';
import filterSelector from '../selector';

jest.mock('../selector', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('ClinicFilterContainer', () => {
  it('should pass props to component', () => {
    filterSelector.mockReturnValue({
      consultationTypes: ['test consultation1'],
    });
    const state = {
      clinic: {
        clinics: [
          {
            id: 100,
          },
          {
            id: 100,
          },
        ],
        appliedConsultationTypesFilter: { id: 100 },
        searchedClinics: [{ id: 100 }],
      },
    };
    const expected = {
      consultationTypes: ['test consultation1'],
      appliedFilters: { id: 100 },
    };

    const actual = mapStateToProps(state);

    expect(actual).toEqual(expected);
  });

  it('should dispatch filters clinics', () => {
    const dispatch = jest.fn();
    const selectedFilters = { id: 100 };
    setCachedSearchedClinics([{ id: 100 }, { id: 101 }]);
    const expected = {
      type: FILTER_CLINICS,
      payload: {
        searchedClinics: [{ id: 100 }, { id: 101 }],
        filters: selectedFilters,
      },
    };
    const dispatchMapToProps = mapDispatchToProps(dispatch);
    dispatchMapToProps.filterClinic(selectedFilters);

    expect(dispatch).toHaveBeenCalledWith(expected);
  });
});
