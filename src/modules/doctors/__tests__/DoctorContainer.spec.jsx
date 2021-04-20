/* eslint-disable react/prop-types */
import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { render, fireEvent } from '@testing-library/react';
import Doctors from '../DoctorsContainer';
import withTheme from '../../../themes/withThemeProvider';
import withIntl from '../../../i18n/withIntlProvider';

jest.mock('../../../helpers/helpers', () => ({
  navigateTo: jest.fn(),
  formatMessage: (intl, key, defaultMessage) => defaultMessage,
}));

jest.mock('../../../helpers/mui', () => ({
  useBreakpoint: jest.fn(() => 'xs'),
}));

jest.mock('../doctorList', () => {
  return jest.fn(() => [
    {
      icon: <div>Icon1</div>,
      activeIcon: <div>ActiveIcon1</div>,
      name: 'Icon1',
      id: 'icon1',
    },
    {
      icon: <div>Icon2</div>,
      activeIcon: <div>ActiveIcon2</div>,
      name: 'Icon2',
      id: 'icon2',
    },
    {
      icon: <div>Icon3</div>,
      activeIcon: <div>ActiveIcon3</div>,
      name: 'Icon3',
      id: 'icon3',
    },
  ]);
});

jest.mock('../../../uiComponents/Typography', () => ({ children, ...rest }) => (
  <div {...rest}>{children}</div>
));

const mockStore = configureStore([]);
const me = {
  member: {
    profile: {
      role: 'Employee',
      memberId: 1,
      fullName: 'test name',
      dependants: [
        {
          memberId: 2,
          fullName: 'test name 2',
        },
        {
          memberId: 3,
          fullName: 'test name 3',
        },
      ],
    },
  },
  settings: {},
};

const benefits = {
  benefitStatus: {
    hasOutpatient: true,
  },
};

describe('Me Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({ me, benefits });
  });

  it('should match the snapshot', () => {
    const props = {
      active: 'icon1',
      children: <div>Component</div>,
      isLoaded: true,
    };
    const Component = withIntl(withTheme(Doctors));
    const { container, getByText } = render(
      <Provider store={store}>
        <Component {...props} />
      </Provider>,
    );

    const Icon1Tab = getByText('ActiveIcon1');
    fireEvent.click(Icon1Tab);

    expect(container).toMatchSnapshot();
  });

  it('should match the snapshot when fillRight', () => {
    const props = {
      active: 'icon1',
      children: <div>Component</div>,
      isLoaded: true,
      fillRight: true,
    };
    const Component = withIntl(withTheme(Doctors));
    const { container } = render(
      <Provider store={store}>
        <Component {...props} />
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });
});
