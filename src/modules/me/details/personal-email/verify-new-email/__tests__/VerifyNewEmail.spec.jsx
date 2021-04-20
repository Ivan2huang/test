/* eslint-disable no-undef */
import React from 'react';
import { render, wait } from '@testing-library/react';
import VerifyNewEmail from '../VerifyNewEmail';
import withTheme from '../../../../../../themes/withThemeProvider';
import { navigateTo } from '../../../../../../helpers/helpers';
import { verifyToken } from '../api';

jest.mock(
  '../../../../../../uiComponents/GridItem',
  // eslint-disable-next-line react/prop-types
  () => ({ columns, children }) => (
    <div data-xs={columns.xs} data-sm={columns.sm} data-md={columns.md}>
      <span>GridItem Component</span>
      <div>{children}</div>
    </div>
  ),
);

jest.mock(
  '../../../../../../uiComponents/Typography',
  // eslint-disable-next-line react/prop-types
  () => ({ children, ...rest }) => (
    <div>
      Typography component
      <span>{mockPropsCapture(rest)}</span>
      <span>{children}</span>
    </div>
  ),
);

jest.mock('../../../../../../helpers/helpers', () => ({
  formatMessage: jest.fn((intl, id, defaultMessage) => defaultMessage),
  navigateTo: jest.fn(),
  fetchData: jest.fn(),
}));

jest.mock('../../../../../loader/Loader', () => () => <div>loading...</div>);

jest.mock('../api', () => ({
  verifyToken: jest.fn(),
}));

describe('VerifyNewEmail Component', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should match snapshot', () => {
    const props = {
      router: {
        query: {
          token: 'token',
          clientId: 'clientId',
        },
      },
    };
    const Component = withTheme(VerifyNewEmail);
    const { container } = render(<Component {...props} />);
    expect(container).toMatchSnapshot();
  });

  it('should navigate to error page when token not provided', () => {
    const props = {
      router: {
        query: {
          token: '',
          clientId: 'clientId',
        },
      },
    };
    const Component = withTheme(VerifyNewEmail);
    render(<Component {...props} />);

    expect(navigateTo).toHaveBeenCalledTimes(1);
    expect(navigateTo).toHaveBeenCalledWith('/error');
  });

  it('should navigate to error page when clientId not provided', () => {
    const props = {
      router: {
        query: {
          token: 'token',
          clientId: '',
        },
      },
    };
    const Component = withTheme(VerifyNewEmail);
    render(<Component {...props} />);

    expect(navigateTo).toHaveBeenCalledTimes(1);
    expect(navigateTo).toHaveBeenCalledWith('/error');
  });

  it('should navigate to success page when verify service return ok status', async () => {
    verifyToken.mockReturnValue(null);
    const props = {
      router: {
        query: {
          token: 'token',
          clientId: 'clientId',
        },
      },
    };
    const Component = withTheme(VerifyNewEmail);
    render(<Component {...props} />);

    await wait(() => {
      expect(navigateTo).toHaveBeenCalledTimes(1);
      expect(navigateTo).toHaveBeenCalledWith('/verify-new-email/success');
    });
  });

  it('should navigate to link expired page when verify service return expired code', async () => {
    verifyToken.mockReturnValue({
      error: true,
      messageKey: 'ChangePersonalEmailTokenExpired',
      message: '',
    });
    const props = {
      router: {
        query: {
          token: 'token',
          clientId: 'clientId',
        },
      },
    };
    const Component = withTheme(VerifyNewEmail);
    render(<Component {...props} />);

    await wait(() => {
      expect(navigateTo).toHaveBeenCalledTimes(1);
      expect(navigateTo).toHaveBeenCalledWith('/verify-new-email/link-expired');
    });
  });

  it('should navigate to error page when verify service return error code', async () => {
    verifyToken.mockReturnValue({
      error: true,
    });
    const props = {
      router: {
        query: {
          token: 'token',
          clientId: 'clientId',
        },
      },
    };
    const Component = withTheme(VerifyNewEmail);
    render(<Component {...props} />);

    await wait(() => {
      expect(navigateTo).toHaveBeenCalledTimes(1);
      expect(navigateTo).toHaveBeenCalledWith('/error');
    });
  });
});
