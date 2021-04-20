import { connect } from 'react-redux';
import { membersSelector } from './selector';
import { filterClaims } from './action';
import Filter from './Filter';
import { FILTER_CATEGORIES, FILTER_STATUSES } from './constant';

export const mapStateToProps = ({ claim, me }) => {
  const {
    history: { appliedFilters },
  } = claim;
  const patientIds = membersSelector(me);
  return {
    options: {
      statuses: Object.values(FILTER_STATUSES),
      categoryCodes: Object.values(FILTER_CATEGORIES),
      patientIds: Object.keys(patientIds),
    },
    mappers: {
      patientIds,
    },
    appliedFilters,
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    filterClaims: filters => dispatch(filterClaims(filters)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Filter);
