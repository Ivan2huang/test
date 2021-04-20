import { mapDispatchToProps, mapStateToProps } from '../MapContainer';
import { UPDATE_FIT_MAP_TO_ORIGINAL_POSITION } from '../action';

describe('Map container', () => {
  it('should pass props to component', () => {
    const state = {
      clinic: {
        resultantClinics: [
          {
            name: 'Dr doctor',
            latitude: 10,
            longitude: 103,
            area: 'area1',
            district: 'Central1',
            consultationType: 'test consultation1',
          },
        ],
        showClinicDetail: false,
        view: 'map',
        fitMapToOriginalPosition: false,
        selectedClinic: {
          id: 101,
        },
        selectedClinicFromSearchResultPanel: false,
      },
    };
    const ownProps = {
      MAP_CONFIG: 'config',
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
      selectedClinic: { id: 101 },
      showClinicDetail: false,
      view: 'map',
      fitMapToOriginalPosition: false,
      selectedClinicFromSearchResultPanel: false,
      MAP_CONFIG: 'config',
    };

    const actual = mapStateToProps(state, ownProps);

    expect(actual).toEqual(expected);
  });

  it('should dispatch handle single clinic select', () => {
    const dispatch = jest.fn();
    const expected = {
      type: UPDATE_FIT_MAP_TO_ORIGINAL_POSITION,
      payload: {
        fitMapToOriginalPosition: true,
      },
    };
    const dispatchMapToProps = mapDispatchToProps(dispatch);
    dispatchMapToProps.setFitMapToOriginalPosition(true);

    expect(dispatch).toHaveBeenCalledWith(expected);
  });
});
