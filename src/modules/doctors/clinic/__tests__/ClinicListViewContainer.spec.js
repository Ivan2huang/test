import {
  mapDispatchToProps,
  mapStateToProps,
} from '../ClinicListViewContainer';
import {
  HANDLE_SINGLE_CLINIC_SELECT,
  UPDATE_SELECTED_STACKED_CLINICS,
} from '../action';

describe('ClinicListView Container', () => {
  it('should pass props to component', () => {
    const state = {
      clinic: {
        selectedStackedClinics: [
          {
            id: 100,
          },
          {
            id: 100,
          },
        ],
        showClinicDetail: false,
        resultantClinics: [{ id: 100 }, { id: 101 }, { id: 103 }],
        view: 'list',
      },
    };
    const expected = {
      selectedStackedClinics: [
        {
          id: 100,
        },
        {
          id: 100,
        },
      ],
      showClinicDetail: false,
      resultantClinics: [{ id: 100 }, { id: 101 }, { id: 103 }],
      view: 'list',
    };

    const actual = mapStateToProps(state);

    expect(actual).toEqual(expected);
  });

  it('should dispatch handle single clinic select', () => {
    const dispatch = jest.fn();
    const selectedClinic = { id: 100 };
    const expected = {
      type: HANDLE_SINGLE_CLINIC_SELECT,
      payload: {
        clinic: selectedClinic,
        selectedClinicFromSearchResultPanel: true,
        viewFor: undefined,
      },
    };
    const dispatchMapToProps = mapDispatchToProps(dispatch);
    dispatchMapToProps.handleOnViewClinicDetailsClick(selectedClinic);

    expect(dispatch).toHaveBeenCalledWith(expected);
  });

  it('should dispatch update selected stacked clinics', () => {
    const dispatch = jest.fn();
    const expected = {
      type: UPDATE_SELECTED_STACKED_CLINICS,
      payload: {
        selectedStackedClinics: [],
      },
    };
    const dispatchMapToProps = mapDispatchToProps(dispatch);
    dispatchMapToProps.backToResults();

    expect(dispatch).toHaveBeenCalledWith(expected);
  });
});
