/* eslint-disable no-undef,react/prop-types */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/router';
import LanguageSelection from '../language-selection/LanguageSelection';
import withTheme from '../../themes/withThemeProvider';
import withIntl from '../../i18n/withIntlProvider';
import { updateLanguagePreference } from '../../modules/me/settings/action';
import IMAGES from '../../constants/images';

const languages = {
  'en-HK': {
    label: 'UK English',
    image: IMAGES.FLAG_EN,
  },
  'zn-HK': {
    label: '中文 (繁體)',
    image: IMAGES.FLAG_ZH,
  },
};

jest.mock('next/router');

jest.mock('../../modules/me/settings/action', () => ({
  updateLanguagePreference: jest.fn(() => ({
    type: 'mock_updateLanguagePreference',
  })),
}));

jest.mock('../../helpers/helpers', () => ({
  formatMessage: jest.fn((intl, id, defaultMessage) => defaultMessage),
}));

jest.mock('../../uiComponents/Typography', () => ({ children, ...rest }) => (
  <div>
    Typography component
    <span>{mockPropsCapture(rest)}</span>
    <span>{children}</span>
  </div>
));

jest.mock(
  '@material-ui/core/MenuItem',
  () => ({ children, onClick, ...rest }) => (
    <div>
      MenuItem component
      <span>{mockPropsCapture(rest)}</span>
      <span>{children}</span>
      <button onClick={onClick} type="button" data-testid="language">
        Change
      </button>
    </div>
  ),
);

jest.mock('@material-ui/core/Menu', () => ({ children, onClose, ...rest }) => (
  <div>
    MenuItem component
    <span>{mockPropsCapture(rest)}</span>
    <span>{children}</span>
    <button onClick={onClose} type="button" data-testid="close-language">
      Change
    </button>
  </div>
));

describe('LanguageSelection component', () => {
  const defaultProps = {
    query: {},
  };

  const setUp = (props = defaultProps) => {
    useRouter.mockImplementation(() => ({
      pathname: '/',
      query: props.query,
      replace: jest.fn(),
    }));

    const Component = withIntl(withTheme(LanguageSelection));
    return render(
      <Component
        {...props}
        languages={languages}
        updateLanguagePreference={updateLanguagePreference}
      />,
    );
  };

  it('should match snapshot', () => {
    const { container } = setUp();
    expect(container).toMatchSnapshot();
  });

  it('should match snapshot when click on selected language', () => {
    const { container, getAllByText } = setUp();
    const text = getAllByText('UK English');
    fireEvent.click(text[0]);
    expect(container).toMatchSnapshot();
  });

  it('should match snapshot when click on menu language', () => {
    const { container, getByTestId } = setUp();
    const menu = getByTestId('close-language');
    fireEvent.click(menu);
    expect(container).toMatchSnapshot();
  });

  it('should call update language preference', () => {
    const { getAllByTestId } = setUp();
    const langButton = getAllByTestId('language');
    fireEvent.click(langButton[0]);
    expect(updateLanguagePreference).toHaveBeenCalledTimes(1);
  });

  it('should match snapshot when click on selected language with url language query', () => {
    const { getAllByTestId } = setUp({
      query: { lang: 'other-lang' },
    });
    const langButton = getAllByTestId('language');
    fireEvent.click(langButton[0]);
    expect(updateLanguagePreference).toHaveBeenCalledTimes(2);
  });
});
