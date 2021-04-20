import {
  mapDispatchToProps,
  mapStateToProps,
} from '../ClinicDetailViewContainer';
import { HIDE_CLINIC_DETAIL } from '../action';

describe('ClinicDetailViewContainer', () => {
  it('should pass props to component', () => {
    const state = {
      clinic: {
        showClinicDetail: true,
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
    const expected = {
      showClinicDetail: true,
      clinic: {
        name: 'Dr Test Clinic',
        latitude: 1.3006643,
        longitude: 103.8001065,
        area: 'area1',
        district: 'Central1',
        consultationType: 'test consultation1',
      },
    };

    const actual = mapStateToProps(state);

    expect(actual).toEqual(expected);
  });

  it('should dispatch hide clinic detail', () => {
    const dispatch = jest.fn();
    const expected = {
      type: HIDE_CLINIC_DETAIL,
      payload: {},
    };
    const dispatchMapToProps = mapDispatchToProps(dispatch);
    dispatchMapToProps.backToResults();

    expect(dispatch).toHaveBeenCalledWith(expected);
  });
});
