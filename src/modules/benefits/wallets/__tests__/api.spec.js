import { getWallets, getCurrentPlanYear } from '../api';
import { fetchData } from '../../../../helpers/fetch';

jest.mock('../../../../helpers/fetch', () => ({
  fetchData: jest.fn(),
}));

jest.mock('../../../../helpers/url', () => ({
  eWallets: includeDependents =>
    `test/wallets?includeDependents=${includeDependents}`,
  currentPlanyear: 'test/currentPlanyear',
}));

describe('Wallet Api', () => {
  it('should get getWallets', async () => {
    fetchData.mockReturnValue({
      member: {
        balance: 1,
      },
    });
    const expected = {
      member: {
        balance: 1,
      },
    };
    const actual = await getWallets(false);

    expect(actual).toEqual(expected);
    expect(fetchData).toHaveBeenCalledWith(
      'get',
      'test/wallets?includeDependents=false',
      null,
      true,
    );
  });

  it('should get current plan year', async () => {
    fetchData.mockReturnValue({
      name: 'plan 1',
    });
    const expected = {
      name: 'plan 1',
    };
    const actual = await getCurrentPlanYear(false);

    expect(actual).toEqual(expected);
    expect(fetchData).toHaveBeenCalledWith('get', 'test/currentPlanyear');
  });
});
