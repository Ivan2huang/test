import getCompanyContactDetailsAndFAQs from '../api';
import { fetchData } from '../../../../helpers/fetch';

jest.mock('../../../../helpers/fetch', () => ({
  fetchData: jest.fn(),
}));

jest.mock('../../../../helpers/url', () => ({
  companyContactDetailsAndFAQs: locale => `/content/help?locale=${locale}`,
}));

describe('Help Api', () => {
  it('should call fetch data with auth with GET', () => {
    getCompanyContactDetailsAndFAQs('en-HK');

    expect(fetchData).toHaveBeenCalledTimes(1);
    expect(fetchData).toHaveBeenCalledWith('GET', '/content/help?locale=en-HK');
  });
});
