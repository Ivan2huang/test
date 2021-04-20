import { mapStateToProps, mapDispatchToProps } from '../NewsLetterContainer';

describe('NewsLetter Container', () => {
  it('should dispath get news letter action', () => {
    const dispath = jest.fn();
    const action = {
      type: 'GET_NEWS_LETTER',
      payload: {},
    };

    const dispathToProps = mapDispatchToProps(dispath);
    dispathToProps.getNewsLetter();

    expect(dispath).toHaveBeenCalledWith(action);
  });

  it('should pass props to component', () => {
    const state = {
      legalContents: {
        newsLetter: {
          content: {},
        },
      },
    };

    const expected = {
      newsLetter: {},
    };

    const actual = mapStateToProps(state);

    expect(actual).toStrictEqual(expected);
  });
});
