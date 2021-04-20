// eslint-disable-next-line import/prefer-default-export
import {
  getValueFromLocalStorage,
  saveToLocalStorage,
} from '../../../helpers/helpers';
import CONFIG from '../../../constants/config';

const RECENT_SEARCH_KEY = 'clinic-recent-searches';

const isIncludes = checker => value =>
  value
    .toLowerCase()
    .trim()
    .includes(checker);

export const findClinics = (clinics, searchKeyword, searchBy = '') => {
  if (searchKeyword) {
    const searchKeywordLowerCase = searchKeyword.toLowerCase();
    if (searchBy) {
      return clinics.filter(
        clinic =>
          clinic[searchBy].toLowerCase().trim() === searchKeywordLowerCase,
      );
    }

    const isIncludesSearchValue = isIncludes(searchKeywordLowerCase);
    return clinics.filter(clinic => {
      const { name, area, district, address } = clinic;
      const hasName = isIncludesSearchValue(name);
      const hasArea = isIncludesSearchValue(area);
      const hasDistrict = isIncludesSearchValue(district);
      const hasAddress = isIncludesSearchValue(address);

      return hasName || hasArea || hasDistrict || hasAddress;
    });
  }
  return clinics;
};

export const filterClinics = (clinics, filters, filterBy = '') => {
  const filtersList = Object.keys(filters).filter(element => filters[element]);
  if (filtersList.length <= 0) {
    return clinics;
  }
  return clinics.filter(clinic => filters[clinic[filterBy]]);
};

export const getRecentSearch = () => {
  return JSON.parse(getValueFromLocalStorage(RECENT_SEARCH_KEY)) || [];
};

export const saveRecentSearch = (keyword, searchBy = '') => {
  const recentSearches = getRecentSearch();
  const indexOfDuplicate = recentSearches.findIndex(
    search => search.keyword === keyword && search.searchBy === searchBy,
  );
  if (indexOfDuplicate !== -1) {
    recentSearches.splice(indexOfDuplicate, 1);
  }
  if (recentSearches.length === CONFIG.maxRecentSearch) {
    recentSearches.pop();
  }
  recentSearches.unshift({ keyword, searchBy });
  saveToLocalStorage(RECENT_SEARCH_KEY, JSON.stringify(recentSearches));
};
