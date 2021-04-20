import { mapStateToProps } from '../LoaderContainer';

jest.mock('../util', () => ({
  loaderDetail: () => ({
    loading: true,
    message: 'loading...',
  }),
}));

describe('LoaderContainer', () => {
  describe('mapStateToProps', () => {
    it('should pass pending claims as props', () => {
      const state = {
        loader: {
          loader1: {
            loading: true,
            message: 'loading...',
          },
        },
      };
      const expected = {
        loading: true,
        message: 'loading...',
      };

      const actual = mapStateToProps(state);

      expect(actual).toEqual(expected);
    });
  });
});
