/* eslint-disable react/prop-types */

import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import withIntl from '../../../../../i18n/withIntlProvider';
import withRedux from '../../../../../redux/withReduxProvider';
import Success from '../Success';
import { navigateTo } from '../../../../../helpers/helpers';

jest.mock('../../../../../helpers/helpers', () => ({
  formatMessage: jest.fn((intl, id, defaultMessage) => defaultMessage),
  navigateTo: jest.fn(),
}));

jest.mock('../../../../../uiComponents/Typography', () => props => (
  <div {...props}>Typography Component</div>
));

jest.mock(
  '../../../../../uiComponents/GridItem',
  () => ({ columns, children }) => (
    <div data-xs={columns.xs} data-sm={columns.sm} data-md={columns.md}>
      <span>GridItem Component</span>
      <div>{children}</div>
    </div>
  ),
);

jest.mock('../../../../../uiComponents/Grid', () => ({ children }) => (
  <div>
    <span>Grid Component</span>
    <div>{children}</div>
  </div>
));

jest.mock(
  '../../../../../uiComponents/ButtonGroup',
  () => ({ children, inverse, ...rest }) => (
    <div data-inverse={inverse} {...rest}>
      <span>Button Group Component</span>
      {children}
    </div>
  ),
);

describe('InviteDependentSuccess Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match the snapshot', () => {
    const componentProps = {
      router: {
        query: {
          dependentName: 'test',
          dependentEmail: 'test@test.com',
        },
      },
    };
    const Component = withRedux(withIntl(Success));
    const result = render(<Component {...componentProps} />);

    expect(result.container).toMatchSnapshot();
  });

  it('should navigate to me page when back to my details button is clicked', async () => {
    const componentProps = {
      router: {
        query: {
          dependentName: 'test',
          dependentEmail: 'test@test.com',
        },
      },
    };
    const Component = withRedux(withIntl(Success));
    const result = render(<Component {...componentProps} />);

    const button = result.getByTestId('btn-navigate-details-page');
    fireEvent.click(button, {});

    await wait(() => {
      expect(navigateTo).toHaveBeenCalledTimes(1);
      expect(navigateTo).toHaveBeenCalledWith('/me/details');
    });
  });

  it('should navigate to me page when top navigation back to my details button is clicked', async () => {
    const componentProps = {
      router: {
        query: {
          dependentName: 'test',
          dependentEmail: 'test@test.com',
        },
      },
    };
    const Component = withRedux(withIntl(Success));
    const result = render(<Component {...componentProps} />);

    const button = result.getByTestId('back-btn-navigate-details-page');
    fireEvent.click(button, {});

    await wait(() => {
      expect(navigateTo).toHaveBeenCalledTimes(1);
      expect(navigateTo).toHaveBeenCalledWith('/me/details');
    });
  });
});
