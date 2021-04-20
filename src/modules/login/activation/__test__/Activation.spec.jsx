import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import ActivationPage from '../Activation';
import withIntl from '../../../../i18n/withIntlProvider';
import withTheme from '../../../../themes/withThemeProvider';
import { VERIFICATION_SUCCESS } from '../constant';

describe('Activation Page Component', () => {
  const activate = jest.fn();
  const client = 'test@tests.com';
  const token = '1k2j32';
  const defaultProps = {
    validateActivation: jest.fn(),
    activate,
    verificationStatus: VERIFICATION_SUCCESS,
    router: {
      query: {
        client,
        token,
      },
    },
    store: {},
  };

  const setUp = (props = defaultProps) => {
    const Component = withTheme(withIntl(ActivationPage));
    const store = {
      getState: () => ({ loader: {} }),
      subscribe: () => {},
      dispatch: () => {},
    };
    return render(
      <Provider store={store}>
        <Component {...props} />
      </Provider>,
    );
  };

  it('should validate client and token on load', () => {
    setUp();
    expect(activate).toHaveBeenCalledWith(client, token);
  });

  it('should render ActivationResultMessage Success if verificationStatus success', () => {
    const { container } = setUp({
      ...defaultProps,
      verificationStatus: VERIFICATION_SUCCESS,
    });
    expect(container).toMatchSnapshot();
  });

  it('should render ActivationResultMessage Error if verificationStatus success', () => {
    const { container } = setUp({
      ...defaultProps,
      verificationStatus: 'RegistrationTokenExpired',
    });
    expect(container).toMatchSnapshot();
  });
});
