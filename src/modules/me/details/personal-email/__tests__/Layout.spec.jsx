import React from 'react';

import { render, fireEvent } from '@testing-library/react';
import withIntl from '../../../../../i18n/withIntlProvider';

import Layout from '../Layout';

import { navigateTo } from '../../../../../helpers/helpers';

jest.mock(
  '../../../../../uiComponents/Typography',
  // eslint-disable-next-line react/prop-types
  () => ({ children, ...rest }) => <div {...rest}>{children}</div>,
);

jest.mock('../../../../../helpers/helpers', () => ({
  navigateTo: jest.fn(),
  formatMessage: jest.fn((intl, id, defaultMessage) => defaultMessage),
}));

describe('Layout Component', () => {
  it('should match snapshot', () => {
    const Component = withIntl(Layout);
    const { container } = render(<Component>Form Detail</Component>);

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot with no background', () => {
    const Component = withIntl(Layout);
    const { container } = render(
      <Component noBackground>Form Detail</Component>,
    );

    expect(container).toMatchSnapshot();
  });

  it('should navigate to details page', () => {
    const Component = withIntl(Layout);
    const { getByTestId } = render(<Component>Form Detail</Component>);

    fireEvent.click(getByTestId('btn-BackToDetails'));

    expect(navigateTo).toHaveBeenCalledWith('/me/details');
  });
});
