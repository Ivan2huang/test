import {
  mapDispatchToProps,
  mapStateToProps,
  setCurrentView,
  setIsShowClinicDetail,
} from '../LeftPanelContainer';
import { TOGGLE_VIEW } from '../action';

describe('Left Panel Container', () => {
  it('should pass props to component', () => {
    const state = {
      clinic: {
        view: 'map',
        showClinicDetail: false,
      },
    };
    const expected = {
      view: 'map',
    };

    const actual = mapStateToProps(state);

    expect(actual).toEqual(expected);
  });

  it('should dispatch toggle view', () => {
    const dispatch = jest.fn();
    setCurrentView('map');
    setIsShowClinicDetail(false);
    const expected = {
      type: TOGGLE_VIEW,
      payload: {
        currentView: 'map',
        isShowClinicDetail: false,
      },
    };
    const dispatchMapToProps = mapDispatchToProps(dispatch);
    dispatchMapToProps.toggleView();

    expect(dispatch).toHaveBeenCalledWith(expected);
  });
});
