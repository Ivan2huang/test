/* eslint-disable react/prop-types */

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import PersonInfoField from '../PersonInfoField';
import withTheme from '../../../../themes/withThemeProvider';
import withIntl from '../../../../i18n/withIntlProvider';

import { navigateTo } from '../../../../helpers/helpers';

jest.mock('../../../../helpers/mui', () => ({
  useBreakpoint: jest.fn(() => 'xs'),
}));

jest.mock(
  '../../../../uiComponents/Typography',
  () => ({ children, ...rest }) => <div {...rest}>{children}</div>,
);

jest.mock('../../../../helpers/helpers', () => ({
  navigateTo: jest.fn(),
  formatMessage: (intl, key, defaultMessage) => defaultMessage,
}));

describe('Person Info Field Component', () => {
  afterEach(() => {
    navigateTo.mockClear();
  });

  it('should match the snapshot', () => {
    const props = {
      title: 'Email',
      description: 'bob@abc.com',
      editable: false,
      addable: false,
    };
    const Component = withIntl(withTheme(PersonInfoField));
    const { container } = render(<Component {...props} />);
    expect(container).toMatchSnapshot();
  });

  it('should display the label and field value', () => {
    const props = {
      title: 'Email',
      description: 'bob@abc.com',
      editable: false,
      addable: false,
    };
    const Component = withIntl(withTheme(PersonInfoField));
    const { getByText } = render(<Component {...props} />);
    expect(getByText(/Email/)).toBeInTheDocument();
    expect(getByText(/bob@abc.com/)).toBeInTheDocument();
  });

  it('should display the edit icon', () => {
    const props = {
      title: 'Email',
      description: 'bob@abc.com',
      editable: true,
      addable: false,
      url: '/me/details/resend-email',
    };

    const Component = withIntl(withTheme(PersonInfoField));
    const { getByTestId } = render(<Component {...props} />);
    expect(getByTestId('edit-icon')).toBeInTheDocument();
  });

  it('should display the add icon', () => {
    const props = {
      title: 'Email',
      description: 'bob@abc.com',
      editable: false,
      addable: true,
      url: '/me/details/update-email',
    };

    const Component = withIntl(withTheme(PersonInfoField));
    const { getByTestId } = render(<Component {...props} />);
    expect(getByTestId('add-icon')).toBeInTheDocument();
  });

  it('should navigate to request change personal email page when click on edit icon', () => {
    const props = {
      title: 'Email',
      description: 'bob@abc.com',
      editable: true,
      addable: false,
      url: '/me/details/update-email',
    };

    const Component = withIntl(withTheme(PersonInfoField));
    const { getByTestId } = render(<Component {...props} />);

    fireEvent.click(getByTestId('btn-editAction'));

    expect(navigateTo).toHaveBeenCalledWith('/me/details/update-email');
  });

  it('should navigate to request change personal email page when click on add icon', () => {
    const props = {
      title: 'Email',
      description: 'bob@abc.com',
      editable: false,
      addable: true,
      url: '/me/details/update-email',
    };

    const Component = withIntl(withTheme(PersonInfoField));
    const { getByTestId } = render(<Component {...props} />);

    fireEvent.click(getByTestId('btn-addAction'));

    expect(navigateTo).toHaveBeenCalledWith('/me/details/update-email');
  });

  it('should navigate to resend request change personal email page when click on edit icon', () => {
    const props = {
      title: 'Email',
      description: 'bob@abc.com',
      editable: true,
      addable: false,
      url: '/me/details/resend-email',
    };

    const Component = withIntl(withTheme(PersonInfoField));
    const { getByTestId } = render(<Component {...props} />);

    fireEvent.click(getByTestId('btn-editAction'));

    expect(navigateTo).toHaveBeenCalledWith('/me/details/resend-email');
  });

  it('should do nothing when url do not provide', () => {
    const props = {
      title: 'Email',
      description: 'bob@abc.com',
      editable: true,
      addable: false,
      url: '',
    };

    const Component = withIntl(withTheme(PersonInfoField));
    const { getByTestId } = render(<Component {...props} />);

    fireEvent.click(getByTestId('btn-editAction'));
    expect(navigateTo).not.toHaveBeenCalled();
  });
});
