import theme from '../theme';

describe('Mui Theme', () => {
  it('should match snapshot', () => {
    expect(theme).toMatchSnapshot();
  });
});
