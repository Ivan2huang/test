import { mapDispatchToProps, mapStateToProps } from '../FaceAgingContainer';

jest.mock('../../../loader', () => ({
  loaderDetail: jest.fn((loader, id) => ({ loading: loader[id].loading })),
}));

jest.mock('../../../error', () => ({
  errorDetails: jest.fn(() => ({
    errorState: false,
  })),
}));

jest.mock('../action', () => ({
  getUserFaceAgingCategories: jest.fn(() => ({
    type: 'GET_USER_FACE_AGING_CATEGORIES',
    payload: {},
  })),
  deleteFaceAgingImage: jest.fn(() => ({
    type: 'DELETE_FACE_AGING_IMAGE',
    payload: {},
  })),
}));

describe('FaceAging Container', () => {
  it('should dispatch get face aging categories action', () => {
    const dispatch = jest.fn();
    const expected = {
      type: 'GET_USER_FACE_AGING_CATEGORIES',
      payload: {},
    };

    const dispatchProps = mapDispatchToProps(dispatch);
    dispatchProps.getUserFaceAgingCategories();

    expect(dispatch).toHaveBeenCalledWith(expected);
  });

  it('should pass props to component', () => {
    const state = {
      loader: {
        faceAgingCategories: {
          loading: true,
        },
      },
      error: {
        faceAgingCategories: {
          errorState: true,
        },
      },
      lifestyle: {
        faceAging: {
          faceAgingIsDone: true,
          categories: [
            {
              age: 35,
              category: 'healthy',
            },
          ],
        },
      },
    };

    const expected = {
      loading: true,
      errorState: false,
      userFaceAgingData: {
        faceAgingIsDone: true,
        categories: [
          {
            age: 35,
            category: 'healthy',
          },
        ],
      },
    };

    const actual = mapStateToProps(state);

    expect(actual).toStrictEqual(expected);
  });
});
