import React from 'react';

import { render, fireEvent } from '@testing-library/react';
import withIntl from '../../../../../../i18n/withIntlProvider';
import withRedux from '../../../../../../redux/withReduxProvider';
import withTheme from '../../../../../../themes/withThemeProvider';

import RequestForm from '../RequestForm';

jest.mock(
  '../../../../../../uiComponents/Typography',
  // eslint-disable-next-line react/prop-types
  () => ({ children, ...rest }) => <div {...rest}>{children}</div>,
);

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

jest.mock('../../../../../../helpers/helpers', () => ({
  navigateTo: jest.fn(),
  formatMessage: jest.fn((intl, id, defaultMessage) => defaultMessage),
}));

jest.mock('../../../../api', () => ({
  changeMobileNumber: jest.fn(),
}));

describe('ResendForm Component', () => {
  let props = {};
  const setUp = (componentProps = props) => {
    const Component = withRedux(withIntl(withTheme(RequestForm)));
    return render(<Component {...componentProps} />);
  };

  const getSelectElement = (renderResult, testId, label) => {
    const dropdown = renderResult.container.querySelector(`#select-${testId}`);
    fireEvent.click(dropdown);
    const items = renderResult.getAllByText(label);
    fireEvent.click(items[items.length - 1]);

    return dropdown;
  };

  beforeEach(() => {
    jest.clearAllMocks();

    props = {
      profile: {
        role: 'Employee',
        memberId: 1,
        fullName: 'test name',
        email: 'test@currentEmail.com',
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
        contactNumber: '+84 111111',
      },
      changeMobileNumber: jest.fn(),
    };
  });

  it('should match snapshot', () => {
    const { container } = setUp();
    expect(container).toMatchSnapshot();
  });

  it('should validate form elements', () => {
    const result = setUp();
    const newMobileNumberInput = result
      .getByTestId('input-new-mobile-number')
      .querySelector('input');
    fireEvent.change(newMobileNumberInput, { target: { value: '' } });
    fireEvent.blur(newMobileNumberInput);
    expect(result.getByText(/Enter valid mobile number/)).toBeInTheDocument();

    fireEvent.change(newMobileNumberInput, { target: { value: '111111' } });
    fireEvent.blur(newMobileNumberInput);

    getSelectElement(
      result,
      'select-new-mobile-number-country-code',
      '+84 - Vietnam',
    );

    expect(
      result.queryByText(/Enter valid mobile number/),
    ).not.toBeInTheDocument();

    const confirmNewMobileNumberInput = result
      .getByTestId('input-confirm-new-mobile-number')
      .querySelector('input');
    fireEvent.change(confirmNewMobileNumberInput, { target: { value: '' } });
    fireEvent.blur(confirmNewMobileNumberInput);
    expect(result.getByText(/Enter valid mobile number/)).toBeInTheDocument();

    getSelectElement(
      result,
      'select-confirm-new-mobile-number-country-code',
      '+84 - Vietnam',
    );

    fireEvent.change(confirmNewMobileNumberInput, {
      target: { value: '111111' },
    });
    fireEvent.blur(confirmNewMobileNumberInput);

    expect(
      result.queryByText(/Enter valid mobile number/),
    ).not.toBeInTheDocument();

    const confirmCountryCodeDropdown = getSelectElement(
      result,
      'select-confirm-new-mobile-number-country-code',
      '+39 - Italy',
    );
    fireEvent.blur(confirmCountryCodeDropdown);

    expect(result.getByText(/Country code does not match/)).toBeInTheDocument();
  });

  it('should request change mobile number when submit', () => {
    const result = setUp();
    const newMobileNumberInput = result
      .getByTestId('input-new-mobile-number')
      .querySelector('input');

    fireEvent.change(newMobileNumberInput, { target: { value: '111111' } });
    fireEvent.blur(newMobileNumberInput);

    getSelectElement(
      result,
      'select-new-mobile-number-country-code',
      '+84 - Vietnam',
    );

    const confirmNewMobileNumberInput = result
      .getByTestId('input-confirm-new-mobile-number')
      .querySelector('input');

    fireEvent.change(confirmNewMobileNumberInput, {
      target: { value: '111111' },
    });
    fireEvent.blur(confirmNewMobileNumberInput);

    getSelectElement(
      result,
      'select-confirm-new-mobile-number-country-code',
      '+84 - Vietnam',
    );

    expect(
      result.queryByText(/Enter valid mobile number/),
    ).not.toBeInTheDocument();

    const submitBtn = result.getByTestId('btn-submit-change-mobile-number');
    fireEvent.click(submitBtn);

    expect(props.changeMobileNumber).toHaveBeenCalled();
  });
});
