import getClinics from '../api';
import url from '../../../../helpers/url';
import { fetchData } from '../../../../helpers/fetch';

jest.mock('../../../../helpers/fetch', () => ({
  fetchData: jest.fn(),
}));

jest.mock('../../../../helpers/url', () => ({
  clinics: () => 'test/clients/2/panels',
}));

describe('clinics api', () => {
  it('should get all clinic', async () => {
    const response = [
      {
        id: 3599,
        name: 'dr. Law Ka Bo Bonita\n',
        consultationType: 'abc',
      },
      {
        id: 3591,
        name: 'Dr. Law Ka Bo Bonita\n',
        specialty: 'xyz',
      },
      {
        id: 3580,
        name: 'Dr. Lam Chi Wan Edwin\n',
        consultationType: 'abc',
      },
      {
        id: 3592,
        name: 'Dr. Lau Wing Kee\n',
        consultationType: 'abc',
      },
    ];

    fetchData.mockReturnValue(response);

    await getClinics();

    expect(fetchData).toHaveBeenCalledTimes(1);
    expect(fetchData).toHaveBeenCalledWith('get', url.clinics);
  });

  it('should return undefined when clinics api gives no response', async () => {
    const response = undefined;
    fetchData.mockReturnValue(response);
    const clinics = await getClinics();

    expect(clinics).toEqual(response);
  });
});
