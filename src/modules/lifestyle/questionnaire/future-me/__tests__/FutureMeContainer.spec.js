import { mapStateToProps, mapDispatchToProps } from '../FutureMeContainer';

jest.mock('../FutureMe', () => jest.fn());

describe('FutureMe Container', () => {
  it('should pass props to component', () => {
    const state = {
      lifestyle: {
        questionnaire: {
          faceAgingImage: 'testimage.jpg',
        },
      },
      form: {
        'lifestyle-questionnaire': {
          values: {
            futureMe: {
              image: {
                name: 'test.png',
              },
            },
          },
        },
      },
    };

    const expectedFutureMeImage = { name: 'test.png' };

    const actual = mapStateToProps(state, { fieldChange: jest.fn() });

    expect(actual.futureMeImage).toEqual(expectedFutureMeImage);
    expect(actual.fieldChange).toEqual(expect.any(Function));
    expect(actual.image).toEqual('testimage.jpg');
  });

  it('should dispatch get face aging image action', () => {
    const dispatch = jest.fn();
    const expected = {
      type: 'GET_FACE_AGING_IMAGE',
      payload: {},
    };

    const dispatchToProps = mapDispatchToProps(dispatch);
    dispatchToProps.getFaceAgingImage();

    expect(dispatch).toHaveBeenCalledWith(expected);
  });
});
