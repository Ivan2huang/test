/* eslint-disable react/prop-types, jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions,no-undef,react/button-has-type */

import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import withIntl from '../../../../i18n/withIntlProvider';
import withTheme from '../../../../themes/withThemeProvider';
import Clinic from '../Clinic';

jest.mock('../mapConfig', () => ({
  map: 'map-props',
}));

jest.mock('../MapContainer', () => props => (
  <div>
    Map Component with number of clinics
    <span>{mockPropsCapture(props)}</span>
  </div>
));

jest.mock('../LeftPanelContainer', () => () => (
  <div>Left Panel search and filter Component</div>
));

jest.mock(
  '../../../../uiComponents/Toast',
  () => ({ message, handleClose, open, ...rest }) => (
    <div data-testid="not-found-toast" data-open={open}>
      {message}
      <div data-testid="not-found-toast-close" onClick={handleClose}>
        Close
      </div>
      <span>{mockPropsCapture(rest)}</span>
    </div>
  ),
);

jest.mock(
  '../../../../uiComponents/Typography',
  () => ({ children, ...rest }) => <div {...rest}>{children}</div>,
);

afterEach(() => {
  jest.clearAllMocks();
});

describe('Clinic Component', () => {
  const props = {
    clinics: [{ name: 'clinic 1' }, { name: 'clinic 2' }, { name: 'clinic 3' }],
    openSnackBar: false,
    getClinics: jest.fn(),
    setResultantClinics: jest.fn(),
    setSearchedClinics: jest.fn(),
    closeSnackBar: jest.fn(),
    isWalletsDisabled: false,
  };
  const setUp = (componentProps = props) => {
    const Component = withIntl(withTheme(Clinic));
    return render(<Component {...componentProps} />);
  };

  it('should match snapshot', () => {
    const { container } = setUp();

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot with disabled eWallet status', () => {
    const { container } = setUp({ isWalletsDisabled: true, ...props });

    expect(container).toMatchSnapshot();
  });

  it('should call getClinics on load', () => {
    setUp();

    expect(props.getClinics).toHaveBeenCalledTimes(1);
  });

  it('should set searched and resultant clinics on change change', () => {
    const { rerender } = setUp();
    const newClinics = [
      { id: 100, longitude: 1, latitude: 1 },
      { id: 101, longitude: 2, latitude: 2 },
    ];
    const newProps = {
      ...props,
      clinics: newClinics,
    };
    const Component = withIntl(withTheme(Clinic));
    rerender(<Component {...newProps} />);

    expect(props.setSearchedClinics).toHaveBeenCalledTimes(2);
    expect(props.setSearchedClinics).toHaveBeenCalledWith(newClinics);

    expect(props.setResultantClinics).toHaveBeenCalledTimes(2);
    expect(props.setResultantClinics).toHaveBeenCalledWith(newClinics);
  });

  it('should match the snapshot with toast message when open snack bar is true', () => {
    const newProps = {
      ...props,
      openSnackBar: true,
    };
    const { container } = setUp(newProps);

    expect(container).toMatchSnapshot();
  });

  it('should close the toast when clicked on close button', () => {
    const newProps = {
      ...props,
      openSnackBar: true,
    };
    const { getByTestId } = setUp(newProps);
    const closeToast = getByTestId('not-found-toast-close');

    fireEvent.click(closeToast);
    expect(props.closeSnackBar).toHaveBeenCalledTimes(1);
  });
});
