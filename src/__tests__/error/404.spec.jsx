import React from 'react';

import { render } from '@testing-library/react';

import NotFoundPage from '../../pages/error/404';

jest.mock('../../helpers/helpers', () => ({
  formatMessage: jest.fn((intl, id, defaultMessage) => defaultMessage),
}));

jest.mock('../../modules/error/Error', () => () => (
  <div>not found component</div>
));

describe('Not Found Page', () => {
  it('should match snapshot', () => {
    const { container } = render(<NotFoundPage intl={{}} />);
    expect(container).toMatchSnapshot();
  });
});
