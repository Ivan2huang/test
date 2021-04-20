import {
  mapDispatchToProps,
  mapStateToProps,
} from '../NonClusterMapMarkerContainer';
import { HANDLE_SINGLE_CLINIC_SELECT } from '../action';

describe('Non Cluster Map marker container', () => {
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
        selectedClinic: {
          name: 'Dr Test Clinic',
          latitude: 1.3006643,
          longitude: 103.8001065,
          area: 'area1',
          district: 'Central1',
          consultationType: 'test consultation1',
        },
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
      selectedClinic: {
        name: 'Dr Test Clinic',
        latitude: 1.3006643,
        longitude: 103.8001065,
        area: 'area1',
        district: 'Central1',
        consultationType: 'test consultation1',
      },
    };

    const actual = mapStateToProps(state, ownProps);

    expect(actual).toEqual(expected);
  });

  it('should dispatch handle single clinic select', () => {
    const dispatch = jest.fn();
    const selectedClinic = { id: 100 };
    const expected = {
      type: HANDLE_SINGLE_CLINIC_SELECT,
      payload: {
        clinic: selectedClinic,
        selectedClinicFromSearchResultPanel: false,
        viewFor: undefined,
      },
    };
    const dispatchMapToProps = mapDispatchToProps(dispatch);
    dispatchMapToProps.selectPin(selectedClinic);

    expect(dispatch).toHaveBeenCalledWith(expected);
  });
});
