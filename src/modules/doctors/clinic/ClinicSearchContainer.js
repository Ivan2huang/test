import { connect } from 'react-redux';
import ClinicSearch from './ClinicSearch';
import filterSelector from './selector';
import { resetMap, searchClinic } from './action';

let cachedClinics = [];
let cachedAppliedConsultationTypesFilter = {};

export const getCachedClinics = () => cachedClinics;
export const setCachedClinics = c => {
  cachedClinics = c;
};

export const getCachedAppliedConsultationTypesFilter = () =>
  cachedAppliedConsultationTypesFilter;
export const setCachedAppliedConsultationTypesFilter = c => {
  cachedAppliedConsultationTypesFilter = c;
};

export const mapStateToProps = ({ clinic }) => {
  const { clinics, appliedConsultationTypesFilter } = clinic;
  const { areas } = filterSelector(clinics);
  setCachedClinics(clinics);
  setCachedAppliedConsultationTypesFilter(appliedConsultationTypesFilter);
  return {
    areas,
  };
};

export const mapDispatchToProps = dispatch => ({
  searchClinic: (keyword, searchBy) => {
    dispatch(
      searchClinic(
        getCachedClinics(),
        keyword,
        searchBy,
        getCachedAppliedConsultationTypesFilter(),
      ),
    );
  },
  resetMap: () => {
    dispatch(resetMap(getCachedClinics()));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ClinicSearch);
