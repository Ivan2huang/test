import React from 'react';
import { render } from '@testing-library/react';

import Choices from '../../pages/choices';

jest.mock('../../layouts/withLayoutProvider', () => Component => () => (
  <div>
    <header>Layout Header</header>
    <Component />
  </div>
));

describe('Choices Index Page', () => {
  it('should match snapshot', () => {
    const { container } = render(<Choices />);
    expect(container).toMatchSnapshot();
  });
});
