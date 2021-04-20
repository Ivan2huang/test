import React from 'react';
import { render, fireEvent, getByText } from '@testing-library/react';
import withIntl from '../../i18n/withIntlProvider';

import DatePicker from '../DatePicker';

describe('DatePicker UI Component', () => {
  let props;
  const Component = withIntl(DatePicker);

  beforeEach(() => {
    props = {
      name: 'datepicker',
      label: 'Date Picker',
      testId: 'dp-test',
      value: new Date('2019-08-13'),
      helperText: 'Must be less than 90 days ago',
      error: false,
      onChange: jest.fn(),
    };
  });

  afterEach(() => {
    props.onChange.mockReset();
  });

  it('should match snapshot', () => {
    const { container } = render(<Component {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot for error', () => {
    const newProps = {
      ...props,
      error: true,
    };

    const { container } = render(<Component {...newProps} />);

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot for null value', () => {
    const newProps = {
      ...props,
      value: '',
    };

    const { container } = render(<Component {...newProps} />);

    expect(container).toMatchSnapshot();
  });

  it('should call change callback', () => {
    const { getByTestId } = render(<Component {...props} />);

    const dialogButton = getByTestId('dp-test').querySelector('button');
    fireEvent.click(dialogButton);

    const dialog = document.querySelector('[role=dialog]');
    const selectDate = getByText(dialog, '13');
    fireEvent.click(selectDate);

    const okButton = getByText(dialog, 'OK');
    fireEvent.click(okButton);

    expect(props.onChange).toHaveBeenCalledWith(
      new Date('2019-08-13'),
      '13 Aug 2019',
    );
  });
});
