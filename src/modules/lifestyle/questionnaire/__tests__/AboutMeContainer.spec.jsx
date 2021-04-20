import { mapStateToProps } from '../AboutMeContainer';

jest.mock('../AboutMe', () => jest.fn());

describe('Questionnaire Container', () => {
  it('should pass props to component ', () => {
    const state = {
      form: {
        'lifestyle-questionnaire': {
          values: {
            aboutMe: {
              test: 'test',
            },
          },
        },
      },
    };
    const actual = mapStateToProps(state);

    expect(actual).toStrictEqual({
      data: { test: 'test' },
    });
  });
});
