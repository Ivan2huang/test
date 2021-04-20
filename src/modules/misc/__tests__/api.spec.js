import { getContactInfo } from '../api';
import { fetchData } from '../../../helpers/fetch';

jest.mock('../../../helpers/fetch', () => ({
  fetchData: jest.fn(),
}));

jest.mock('../../../helpers/url', () => ({
  contactUsInfo: locale => `test/contactUs?locale=${locale}`,
}));

describe('Misc Api', () => {
  it('should get the contact us info', async () => {
    fetchData.mockReturnValue({
      email: 'mail@test.com',
      phone: '1232334422',
      customerSupportHour: 'customerSupportHour',
    });
    const expected = {
      email: 'mail@test.com',
      phone: '1232334422',
      customerSupportHour: 'customerSupportHour',
    };
    const actual = await getContactInfo('en-HK');

    expect(actual).toEqual(expected);
    expect(fetchData).toHaveBeenCalledWith(
      'get',
      'test/contactUs?locale=en-HK',
    );
  });
});
