import { mapDispatchToProps, mapStateToProps } from '../ClinicMarkerContainer';
import { HANDLE_SINGLE_CLINIC_SELECT } from '../action';

describe('ClinicMarker Container', () => {
  it('should pass props to component', () => {
    const state = {
      clinic: {
        selectedClinic: { id: 101 },
      },
    };
    const ownProps = {
      clinic: { id: 100 },
    };
    const expected = {
      clinic: { id: 100 },
      selectedClinic: { id: 101 },
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
    dispatchMapToProps.setSelectedClinic(selectedClinic);

    expect(dispatch).toHaveBeenCalledWith(expected);
  });
});
