import React from 'react';
import { render } from '@testing-library/react';

import MePage from '../../pages/me';

jest.mock('../../layouts/withLayoutProvider', () => Component => () => (
  <div>
    <header>Layout Header</header>
    <Component />
  </div>
));

jest.mock('../../modules/me', () => ({
  Me: () => <div>Me Component</div>,
}));

describe('Me Index Page', () => {
  it.skip('should match snapshot', () => {
    const { container, debug } = render(<MePage />);
    debug();
    expect(container).toMatchSnapshot();
  });
});
