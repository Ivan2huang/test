import React from 'react';

import { render } from '@testing-library/react';

import ErrorPage from '../pages/_error';

jest.mock('../modules/error/Error', () => () => <div>error component</div>);

describe('Error Page', () => {
  it('should match snapshot', () => {
    const { container } = render(<ErrorPage />);
    expect(container).toMatchSnapshot();
  });
});
