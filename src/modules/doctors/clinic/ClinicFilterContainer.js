import { connect } from 'react-redux';
import filterSelector from './selector';
import ClinicFilter from './ClinicFilter';
import { filterClinics } from './action';

let cachedSearchedClinics = [];

export const getCachedSearchedClinics = () => cachedSearchedClinics;
export const setCachedSearchedClinics = clinics => {
  cachedSearchedClinics = clinics;
};

export const mapStateToProps = ({ clinic }) => {
  const { clinics, appliedConsultationTypesFilter, searchedClinics } = clinic;
  const { consultationTypes } = filterSelector(clinics);
  setCachedSearchedClinics(searchedClinics);
  return {
    consultationTypes,
    appliedFilters: appliedConsultationTypesFilter,
  };
};

export const mapDispatchToProps = dispatch => ({
  filterClinic: selectedFilters => {
    dispatch(filterClinics(getCachedSearchedClinics(), selectedFilters));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ClinicFilter);
