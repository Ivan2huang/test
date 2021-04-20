/* eslint-disable react/prop-types */

import React from 'react';
import { render } from '@testing-library/react';

import Loader from '../Loader';

jest.mock('../../../uiComponents/Typography', () => ({ children, ...rest }) => (
  <div {...rest}>{children}</div>
));

describe('Loader Component', () => {
  it('should match snapshot for loading with message', () => {
    const { container } = render(
      <Loader loading message="loading...">
        <div>Content</div>
      </Loader>,
    );

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot for loading without message', () => {
    const { container } = render(
      <Loader loading message="">
        <div>Content</div>
      </Loader>,
    );

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot for not loading', () => {
    const { container } = render(
      <Loader loading={false}>
        <div>Content</div>
      </Loader>,
    );

    expect(container).toMatchSnapshot();
  });
});
