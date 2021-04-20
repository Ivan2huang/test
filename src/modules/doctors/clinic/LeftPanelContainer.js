import { connect } from 'react-redux';
import LeftPanel from './LeftPanel';
import { toggleView } from './action';

let currentView;
let isShowClinicDetail;

export const getCurrentView = () => currentView;
export const setCurrentView = v => {
  currentView = v;
};

export const getIsShowClinicDetail = () => isShowClinicDetail;
export const setIsShowClinicDetail = v => {
  isShowClinicDetail = v;
};

export const mapStateToProps = ({ clinic }) => {
  const { view, showClinicDetail } = clinic;
  setCurrentView(view);
  setIsShowClinicDetail(showClinicDetail);
  return {
    view,
  };
};

export const mapDispatchToProps = dispatch => ({
  toggleView: () => {
    dispatch(toggleView(getIsShowClinicDetail(), getCurrentView()));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LeftPanel);
