import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import ClinicConsultationTypeFilter from '../ClinicConsultationTypeFilter';
import withIntl from '../../../../i18n/withIntlProvider';
import withTheme from '../../../../themes/withThemeProvider';

jest.mock('../../../../helpers/helpers', () => ({
  formatMessage: jest.fn((intl, id, defaultMessage) => defaultMessage),
  sentenceCase: jest.fn(message => message),
  isEmpty: jest.fn(
    obj => Object.entries(obj).length === 0 && obj.constructor === Object,
  ),
}));

describe('ClinicConsultationTypeFilter', () => {
  const props = {
    consultationTypes: ['consultation type1', 'consultation type2'],
    open: true,
    onChange: jest.fn(),
    filters: {},
    onApply: jest.fn(),
    onClearAll: jest.fn(),
  };
  it('should match snapshot', () => {
    const Component = withTheme(withIntl(ClinicConsultationTypeFilter));

    const { container } = render(<Component {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot when filter popup is closed', () => {
    const Component = withIntl(withTheme(ClinicConsultationTypeFilter));

    const { container } = render(<Component {...props} open={false} />);

    expect(container).toMatchSnapshot();
  });

  it('should call onChange when filter is selected', () => {
    const Component = withIntl(withTheme(ClinicConsultationTypeFilter));
    const { getByTestId } = render(<Component {...props} />);
    const filterCheckbox = getByTestId('checkbox-filter-0').querySelector(
      'input',
    );

    fireEvent.click(filterCheckbox);

    expect(props.onChange).toHaveBeenCalled();
    expect(props.onChange).toHaveBeenCalledWith(
      true,
      props.consultationTypes[0],
    );
  });

  it('should match snapshot when filter is already selected', () => {
    const Component = withIntl(withTheme(ClinicConsultationTypeFilter));

    const { container } = render(
      <Component
        {...props}
        open={false}
        filters={{ 'consultation type1': true }}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it('should call onApply when apply is click', () => {
    const Component = withIntl(withTheme(ClinicConsultationTypeFilter));
    const { getByTestId } = render(<Component {...props} />);
    const applyBtn = getByTestId('btn-apply-filter');

    fireEvent.click(applyBtn);

    expect(props.onApply).toHaveBeenCalledTimes(1);
  });

  it('should call onClear when clearAll is click', () => {
    const Component = withIntl(withTheme(ClinicConsultationTypeFilter));
    const { getByTestId } = render(<Component {...props} />);
    const clearbtn = getByTestId('btn-clear-all-filter');

    fireEvent.click(clearbtn);

    expect(props.onClearAll).toHaveBeenCalledTimes(1);
  });
});
