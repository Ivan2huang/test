/* eslint-disable no-undef, react/prop-types */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { IntlProvider } from 'react-intl';
import Settings from '../Settings';
import { IntlContext } from '../../../../i18n/withIntlProvider';

jest.mock('../../../../helpers/helpers', () => ({
  formatMessage: jest.fn((intl, id, message) => message),
}));

jest.mock(
  '../../../../uiComponents/Typography',
  () => ({ children, props }) => (
    <div {...props}>
      Typography Component
      {children}
    </div>
  ),
);

jest.mock('../WellnessNewsletterModalContainer', () => ({ props }) => (
  <div {...props}>WellnessNewsLetterModalContainer Component</div>
));

jest.mock('../../../../helpers/mui', () => ({
  useBreakpoint: jest.fn(() => 'md'),
}));

jest.mock('../helper', () => ({
  clearLocalStorage: jest.fn(),
}));

jest.mock('../AppVersion', () => () => <div>App Version</div>);

describe('Settings Component', () => {
  const props = {
    updateLanguagePreference: jest.fn(),
    updateSettings: jest.fn(),
    memberProfile: {
      preferredLocale: 'en-HK',
    },
    intl: {
      formatMessage: jest.fn(),
    },
    settings: {
      preferredLocale: 'en-HK',
      isEdmOptedOut: false,
    },
    getMemberProfile: jest.fn(),
    setIsLoaded: jest.fn(),
  };

  const setLocale = jest.fn();

  const setUp = () => {
    return render(
      <IntlContext.Provider value={setLocale}>
        <IntlProvider
          locale="en-HK"
          messages={{
            'me.tab.setting.label.field.promotional.description':
              'Not receive health, wellness and insurance {promotional}',
          }}
        >
          <Settings {...props} />
        </IntlProvider>
      </IntlContext.Provider>,
    );
  };

  // it('should match the snapshot', () => {
  //   const { container } = setUp();

  //   expect(container).toMatchSnapshot();
  // });

  it('should match the snapshot when user open promotional link', () => {
    const { container, getByTestId } = setUp();

    const link = getByTestId('promotion-link');
    fireEvent.click(link, { preventDefault: () => {} });

    expect(container).toMatchSnapshot();
  });

  // it('should update the edm option when user select yes', () => {
  //   const { getByTestId } = setUp();
  //   const optedOut = getByTestId('edm-opt-out').querySelectorAll('input');
  //   fireEvent.click(optedOut[1]);

  //   expect(props.updateSettings).toHaveBeenCalledWith({
  //     isEdmOptedOut: true,
  //   });
  // });

  // it('should update the edm option when user select yes on switch', () => {
  //   const { getByRole } = setUp();
  //   fireEvent.click(getByRole('checkbox'));
  //   fireEvent.change(getByRole('checkbox'), { target: { checked: true } });

  //   expect(props.updateSettings).toHaveBeenCalledWith({
  //     isEdmOptedOut: true,
  //   });
  // });
});
