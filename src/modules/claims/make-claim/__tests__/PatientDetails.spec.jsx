/* eslint-disable react/prop-types */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { reduxForm } from 'redux-form';

import PatientDetails from '../PatientDetails';
import withIntl from '../../../../i18n/withIntlProvider';
import withRedux from '../../../../redux/withReduxProvider';
import { logAction } from '../../../../helpers/firebase';

jest.mock('../../../../helpers/helpers', () => ({
  formatMessage: jest.fn((intl, id, defaultMessage) => defaultMessage),
}));

jest.mock('../../../../uiComponents/Typography', () => props => (
  <div {...props}>Typography Component</div>
));

jest.mock('../../../../helpers/firebase', () => ({
  logAction: jest.fn(),
  logEvent: jest.fn(),
}));

jest.mock(
  '../../../../uiComponents/Dropdown',
  // eslint-disable-next-line react/prop-types
  () => ({
    items,
    error,
    loading,
    group,
    errorMessage,
    testId,
    valueProperty,
    displayProperty,
    ...rest
  }) => (
    <select {...rest} data-testid="select-patient">
      {items.map(p => (
        <option key={p.memberId} value={p.memberId}>
          {p.fullName}
        </option>
      ))}
    </select>
  ),
);

jest.mock(
  '../../../../uiComponents/NumberInput',
  // eslint-disable-next-line react/prop-types
  () => ({
    error,
    testId,
    value,
    onChange,
    endAdornment,
    helperText,
    decimalScale,
    ...rest
  }) => {
    const internalChange = e => {
      onChange(e.target.value);
    };
    return (
      <input
        {...rest}
        data-testid="input-contact-number"
        type="number"
        value={value}
        onChange={internalChange}
      />
    );
  },
);

describe('PatientDetails Component', () => {
  const props = {
    patients: [
      {
        fullName: 'dummy name',
        memberId: '12',
      },
      {
        fullName: 'dummy dependant name',
        memberId: '1',
      },
    ],
    fieldChange: jest.fn(),
  };

  beforeEach(() => {
    logAction.mockClear();
  });

  const setUp = (componentProps = props) => {
    const Component = withRedux(
      withIntl(
        reduxForm({
          form: 'form',
          initialValues: {
            patientId: '12',
            contactNumber: '12345678',
          },
        })(PatientDetails),
      ),
    );
    return render(<Component {...componentProps} />);
  };

  it('should match snapshot', () => {
    const { container } = setUp();

    expect(container).toMatchSnapshot();
  });

  it('should have default value for contact number and patient name', () => {
    const result = setUp();
    const ContactField = result.getByTestId('input-contact-number');
    const PatientSelect = result.getByTestId('select-patient');

    expect(PatientSelect.value).toBe('12');
    expect(ContactField.value).toBe('12345678');
  });

  it('should call firebase and reset consultation date when change patient name', () => {
    const { getByTestId } = setUp();

    fireEvent.change(getByTestId('select-patient'), {
      target: {
        value: '30',
      },
    });

    expect(logAction).toHaveBeenCalled();
    expect(props.fieldChange).toHaveBeenCalledWith(
      'claim.consultationDate',
      '',
    );
  });
});
