import getFaceAgingCategories, { deleteFaceAgingImage } from '../api';
import { fetchData } from '../../../../helpers/fetch';

jest.mock('../../../../helpers/fetch', () => ({
  fetchData: jest.fn(),
}));

jest.mock('../../../../helpers/url', () => ({
  faceAgingCategories: 'test/faceAgingCategories',
  lifestyleFaceImage: 'test/lifestyleFaceImage',
}));

describe('Get face aging categories', () => {
  it('should call lifestyle tips api', async () => {
    await getFaceAgingCategories();
    expect(fetchData).toBeCalled();
    expect(fetchData).toHaveBeenCalledWith(
      'GET',
      'test/faceAgingCategories',
      undefined,
      true,
    );
  });

  it('should call delete face aging image', async () => {
    await deleteFaceAgingImage();
    expect(fetchData).toBeCalled();
    expect(fetchData).toHaveBeenCalledWith(
      'DELETE',
      'test/lifestyleFaceImage',
      undefined,
      true,
    );
  });
});
