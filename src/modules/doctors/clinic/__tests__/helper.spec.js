import {
  findClinics,
  getRecentSearch,
  saveRecentSearch,
  filterClinics,
} from '../helper';
import {
  getValueFromLocalStorage,
  saveToLocalStorage,
} from '../../../../helpers/helpers';

jest.mock('../../../../helpers/helpers', () => ({
  saveToLocalStorage: jest.fn(),
  getValueFromLocalStorage: jest.fn(),
}));

afterEach(() => {
  jest.clearAllMocks();
});

describe('Find Clinics', () => {
  const allClinics = [
    {
      name: 'Dr Test Clinic',
      latitude: 1.3006643,
      longitude: 103.8001065,
      address: 'teststreet, test1 house',
      area: 'Area1',
      district: 'Central1',
      consultationType: 'dummy',
    },
    {
      name: 'Test Clinic',
      latitude: 1.3006643,
      longitude: 103.8001065,
      address: 'test1street, test2 house',
      area: 'Area2',
      district: 'Central2',
      consultationType: 'dummy 1',
    },
    {
      name: 'Test1 Clinic',
      latitude: 1.3006643,
      longitude: 103.8001065,
      address: 'test1street, test3 house',
      area: 'Area3',
      district: 'Central4',
      consultationType: 'dummy',
    },
    {
      name: 'dummy Clinic',
      latitude: 1.3006643,
      longitude: 103.8001065,
      address: 'test1street, test4 house',
      area: 'Area4',
      district: 'Central4',
      consultationType: 'dummy 2',
    },
  ];

  it('should return searched clinics when search by clinic name', () => {
    const searchKeyword = 'dr';
    const expected = [
      {
        name: 'Dr Test Clinic',
        latitude: 1.3006643,
        longitude: 103.8001065,
        address: 'teststreet, test1 house',
        area: 'Area1',
        district: 'Central1',
        consultationType: 'dummy',
      },
    ];
    const searchResult = findClinics(allClinics, searchKeyword);

    expect(searchResult).toEqual(expected);
  });

  it('should return searched clinics when search by clinic area', () => {
    const expected = [
      {
        name: 'Dr Test Clinic',
        latitude: 1.3006643,
        longitude: 103.8001065,
        address: 'teststreet, test1 house',
        area: 'Area1',
        district: 'Central1',
        consultationType: 'dummy',
      },
    ];
    const searchResult = findClinics(allClinics, 'Area1');

    expect(searchResult).toEqual(expected);
  });

  it('should return searched clinics when search by clinic district', () => {
    const expected = [
      {
        name: 'Dr Test Clinic',
        latitude: 1.3006643,
        longitude: 103.8001065,
        address: 'teststreet, test1 house',
        area: 'Area1',
        district: 'Central1',
        consultationType: 'dummy',
      },
    ];
    const searchResult = findClinics(allClinics, 'Central1');

    expect(searchResult).toEqual(expected);
  });

  it('should return searched clinics when search by clinic address', () => {
    const expected = [
      {
        name: 'dummy Clinic',
        latitude: 1.3006643,
        longitude: 103.8001065,
        address: 'test1street, test4 house',
        area: 'Area4',
        district: 'Central4',
        consultationType: 'dummy 2',
      },
    ];
    const searchResult = findClinics(allClinics, 'test4');

    expect(searchResult).toEqual(expected);
  });

  it('should return searched clinics when searched by clinic area', () => {
    const searchKeyword = 'Area2';
    const searchBy = 'area';
    const expected = [
      {
        name: 'Test Clinic',
        latitude: 1.3006643,
        longitude: 103.8001065,
        address: 'test1street, test2 house',
        area: 'Area2',
        district: 'Central2',
        consultationType: 'dummy 1',
      },
    ];
    const searchResult = findClinics(allClinics, searchKeyword, searchBy);

    expect(searchResult).toEqual(expected);
  });

  it('should return all clinics when search key word is empty', () => {
    const searchKeyword = '';

    const searchResult = findClinics(allClinics, searchKeyword);

    expect(searchResult).toEqual(allClinics);
  });

  describe('saveRecentSearch', () => {
    it('should be able to save recent search when no previous present before', () => {
      getValueFromLocalStorage.mockReturnValue(JSON.stringify(null));

      saveRecentSearch('Hongkong', 'area');

      expect(saveToLocalStorage).toHaveBeenCalledTimes(1);
      expect(saveToLocalStorage).toHaveBeenCalledWith(
        'clinic-recent-searches',
        JSON.stringify([{ keyword: 'Hongkong', searchBy: 'area' }]),
      );
    });

    it('should be able to save recent search with search keyword only', () => {
      getValueFromLocalStorage.mockReturnValue(JSON.stringify(null));

      saveRecentSearch('Hongkong');

      expect(saveToLocalStorage).toHaveBeenCalledTimes(1);
      expect(saveToLocalStorage).toHaveBeenCalledWith(
        'clinic-recent-searches',
        JSON.stringify([{ keyword: 'Hongkong', searchBy: '' }]),
      );
    });

    it('should be able to save the recent search when there are already few searches available', () => {
      const previousSearch = [
        { keyword: 'Hongkong city', searchBy: 'area' },
        { keyword: 'Hongkong island', searchBy: 'district' },
      ];
      getValueFromLocalStorage.mockReturnValue(JSON.stringify(previousSearch));

      saveRecentSearch('Hongkong', 'area');

      expect(saveToLocalStorage).toHaveBeenCalledTimes(1);
      expect(saveToLocalStorage).toHaveBeenCalledWith(
        'clinic-recent-searches',
        JSON.stringify([
          { keyword: 'Hongkong', searchBy: 'area' },
          { keyword: 'Hongkong city', searchBy: 'area' },
          { keyword: 'Hongkong island', searchBy: 'district' },
        ]),
      );
    });

    it('should be able to save the recent search when there are already max recent searches available', () => {
      const previousSearch = [
        { keyword: 'Hongkong city', searchBy: 'area' },
        { keyword: 'Hongkong island', searchBy: 'district' },
        { keyword: 'test1  city', searchBy: 'area' },
        { keyword: 'test2  island', searchBy: 'district' },
      ];
      getValueFromLocalStorage.mockReturnValue(JSON.stringify(previousSearch));

      saveRecentSearch('Hongkong', 'area');

      expect(saveToLocalStorage).toHaveBeenCalledTimes(1);
      expect(saveToLocalStorage).toHaveBeenCalledWith(
        'clinic-recent-searches',
        JSON.stringify([
          { keyword: 'Hongkong', searchBy: 'area' },
          { keyword: 'Hongkong city', searchBy: 'area' },
          { keyword: 'Hongkong island', searchBy: 'district' },
          { keyword: 'test1  city', searchBy: 'area' },
        ]),
      );
    });

    it('should able to ranked duplicate search at first position', () => {
      const previousSearch = [
        { keyword: 'Hongkong city', searchBy: 'area' },
        { keyword: 'Hongkong', searchBy: 'area' },
        { keyword: 'test1  city', searchBy: 'area' },
        { keyword: 'test2  island', searchBy: 'district' },
      ];
      getValueFromLocalStorage.mockReturnValue(JSON.stringify(previousSearch));

      saveRecentSearch('Hongkong', 'area');

      expect(saveToLocalStorage).toHaveBeenCalledTimes(1);
      expect(saveToLocalStorage).toHaveBeenCalledWith(
        'clinic-recent-searches',
        JSON.stringify([
          { keyword: 'Hongkong', searchBy: 'area' },
          { keyword: 'Hongkong city', searchBy: 'area' },
          { keyword: 'test1  city', searchBy: 'area' },
          { keyword: 'test2  island', searchBy: 'district' },
        ]),
      );
    });
    it('should be able to return recent searches', () => {
      const expected = [{ keyword: 'HongKong', searchBy: 'Area' }];
      const recentSearches = [{ keyword: 'HongKong', searchBy: 'Area' }];
      getValueFromLocalStorage.mockReturnValue(JSON.stringify(recentSearches));

      const actual = getRecentSearch();

      expect(actual).toEqual(expected);
      expect(getValueFromLocalStorage).toHaveBeenCalledWith(
        'clinic-recent-searches',
      );
    });

    it('should return empty recent searches as default', () => {
      const expected = [];
      getValueFromLocalStorage.mockReturnValue(null);

      const actual = getRecentSearch();

      expect(actual).toEqual(expected);
      expect(getValueFromLocalStorage).toHaveBeenCalledWith(
        'clinic-recent-searches',
      );
    });
  });

  describe('Clinic filter', () => {
    it('should return all clinic when filters is empty', () => {
      const expected = allClinics;
      const filters = {};

      const actual = filterClinics(allClinics, filters);

      expect(actual).toEqual(expected);
    });

    it('should return all clinic when no filter is selected', () => {
      const expected = allClinics;
      const filters = { dummy: false, 'dummy 1': false };

      const actual = filterClinics(allClinics, filters);

      expect(actual).toEqual(expected);
    });

    it('should return clinics based on filter', () => {
      const expected = [allClinics[0], allClinics[1], allClinics[2]];
      const filters = { dummy: true, 'dummy 1': true };

      const actual = filterClinics(allClinics, filters, 'consultationType');

      expect(actual).toEqual(expected);
    });

    it('should return no clinic when no filter match', () => {
      const expected = [];
      const filters = { 'dummy 4': true };

      const actual = filterClinics(allClinics, filters, 'consultationType');

      expect(actual).toEqual(expected);
    });
  });
});
