import paths from '../paths';

describe('Paths Helper', () => {
  it('should match snapshot', () => {
    expect(paths).toMatchSnapshot();
  });
});
