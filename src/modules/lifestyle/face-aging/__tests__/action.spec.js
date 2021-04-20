import {
  getUserFaceAgingCategories,
  updateUserFaceAgingCategories,
} from '../action';

describe('User Face Aging Categories action', () => {
  it('should generate get user face aging categories action', () => {
    const expected = {
      type: 'GET_USER_FACE_AGING_CATEGORIES',
      payload: {},
    };

    const actual = getUserFaceAgingCategories();

    expect(actual).toEqual(expected);
  });

  it('should generate update user face aging categories action', () => {
    const expected = {
      type: 'UPDATE_USER_FACE_AGING_CATEGORIES',
      payload: {
        faceAgingIsDone: true,
        categories: [
          {
            category: 'healthy',
            age: '35',
          },
        ],
      },
    };

    const actual = updateUserFaceAgingCategories(true, [
      {
        category: 'healthy',
        age: '35',
      },
    ]);

    expect(actual).toEqual(expected);
  });
});
