import { getRecommendations } from '../api';
import { fetchData } from '../../../../helpers/fetch';

jest.mock('../../../../helpers/fetch', () => ({
  fetchData: jest.fn(),
}));

jest.mock('../../../../helpers/url', () => ({
  recommendations: riskId =>
    riskId ? `test/recommendations/${riskId}` : `test/recommendations`,
}));

describe('Recommendations Api', () => {
  it('should get recommendations', async () => {
    fetchData.mockImplementation(() => ({ data: 'data' }));

    const response = await getRecommendations();

    expect(fetchData).toHaveBeenCalledWith(
      'GET',
      'test/recommendations',
      undefined,
      true,
    );
    expect(response).toEqual({ data: 'data' });
  });

  it('should get recommendations for specific health risk', async () => {
    fetchData.mockImplementation(() => ({ data: 'data' }));

    const response = await getRecommendations('alcohol');

    expect(fetchData).toHaveBeenCalledWith(
      'GET',
      'test/recommendations/AlcoholRisk',
      undefined,
      true,
    );
    expect(response).toEqual({ data: 'data' });
  });
});
