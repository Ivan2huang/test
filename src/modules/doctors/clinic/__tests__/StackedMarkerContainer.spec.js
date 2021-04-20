import { mapDispatchToProps, mapStateToProps } from '../StackedMarkerContainer';
import { HANDLE_STACKED_CLINIC_SELECT } from '../action';

describe('Stacked Marker container', () => {
  it('should pass props to component', () => {
    const state = {
      clinic: {
        clinics: [
          {
            name: 'Dr doctor',
            latitude: 10,
            longitude: 103,
            area: 'area1',
            district: 'Central1',
            consultationType: 'test consultation1',
          },
        ],
        selectedStackedClinics: [
          {
            name: 'Dr Test Clinic',
            latitude: 1.3006643,
            longitude: 103.8001065,
            area: 'area1',
            district: 'Central1',
            consultationType: 'test consultation1',
          },
        ],
      },
    };
    const ownProps = {
      clinics: [
        {
          name: 'Dr doctor',
          latitude: 10,
          longitude: 103,
          area: 'area1',
          district: 'Central1',
          consultationType: 'test consultation1',
        },
      ],
    };
    const expected = {
      clinics: [
        {
          name: 'Dr doctor',
          latitude: 10,
          longitude: 103,
          area: 'area1',
          district: 'Central1',
          consultationType: 'test consultation1',
        },
      ],
      selectedStackedClinics: [
        {
          name: 'Dr Test Clinic',
          latitude: 1.3006643,
          longitude: 103.8001065,
          area: 'area1',
          district: 'Central1',
          consultationType: 'test consultation1',
        },
      ],
    };

    const actual = mapStateToProps(state, ownProps);

    expect(actual).toEqual(expected);
  });

  it('should dispatch handle stacked clinic select', () => {
    const dispatch = jest.fn();
    const selectedStackedClinics = [{ id: 100 }, { id: 101 }];
    const expected = {
      type: HANDLE_STACKED_CLINIC_SELECT,
      payload: {
        stackedClinics: selectedStackedClinics,
      },
    };
    const dispatchMapToProps = mapDispatchToProps(dispatch);
    dispatchMapToProps.setStackedClinics(selectedStackedClinics);

    expect(dispatch).toHaveBeenCalledWith(expected);
  });
});
