/* eslint-disable react/prop-types */
import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';

import ClinicFilter from '../ClinicFilter';
import withIntl from '../../../../i18n/withIntlProvider';
import withTheme from '../../../../themes/withThemeProvider';

jest.mock('../../../../helpers/helpers', () => ({
  sentenceCase: jest.fn(text => text),
  formatMessage: jest.fn((intl, id, defaultMessage) => defaultMessage),
  isEmpty: jest.fn(
    obj => Object.entries(obj).length === 0 && obj.constructor === Object,
  ),
}));

jest.mock('../../../../helpers/firebase', () => ({
  logAction: jest.fn(),
}));

jest.mock(
  '../ClinicConsultationTypeFilter',
  () => ({
    open,
    onChange,
    consultationTypes,
    onApply,
    onClearAll,
    filters,
  }) => {
    return (
      <div data-testid="filters-list" data-open={open}>
        ClinicConsulationTypeFilter
        <span>
          open State:
          {`${open}`}
        </span>
        <div>
          filters:
          {Object.keys(filters)
            .filter(consultationType => filters[consultationType])
            .join(', ')}
        </div>
        {consultationTypes.map((consultationType, index) => (
          <button
            key={consultationType}
            data-testid={`change-filter-${index}`}
            type="button"
            onClick={() => onChange(true, consultationType)}
          >
            {consultationType}
          </button>
        ))}
        <button
          data-testid="btn-clear-filter"
          type="button"
          onClick={onClearAll}
        >
          clear
        </button>
        <button data-testid="btn-apply-filter" type="button" onClick={onApply}>
          apply
        </button>
      </div>
    );
  },
);

describe('Clinic Filter', () => {
  const props = {
    consultationTypes: ['consultationtype1', 'consultationtype2'],
    filterClinic: jest.fn(),
    appliedFilters: {},
    open: false,
    setOpen: jest.fn(),
    closeSearchPopup: jest.fn(),
  };
  it('should match snapshot', () => {
    const Component = withTheme(withIntl(ClinicFilter));

    const { container } = render(<Component {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('should list consultation types on open', () => {
    const Component = withTheme(withIntl(ClinicFilter));
    const { container } = render(<Component {...props} open />);

    expect(container).toMatchSnapshot();
  });

  it('should display label for filter field on filter change', () => {
    const Component = withTheme(withIntl(ClinicFilter));
    const { container, getByTestId } = render(<Component {...props} />);
    const changeFilter = getByTestId('change-filter-0');

    fireEvent.click(changeFilter);

    expect(container).toMatchSnapshot();
  });

  it('should close filter pop up when clicked outside', () => {
    const Component = withTheme(withIntl(ClinicFilter));
    render(<Component {...props} open />);

    act(() => {
      document.querySelector('body').click();
    });
    expect(props.setOpen).toHaveBeenCalledWith(false);
  });

  it('should apply filter and close popup when apply is clicked', () => {
    const Component = withTheme(withIntl(ClinicFilter));
    const { getByTestId, container } = render(<Component {...props} open />);
    const changeFilter = getByTestId('change-filter-0');
    fireEvent.click(changeFilter);
    const applyBtn = getByTestId('btn-apply-filter');

    fireEvent.click(applyBtn);

    expect(container).toMatchSnapshot();
    expect(props.filterClinic).toHaveBeenCalled();
    expect(props.filterClinic).toHaveBeenCalledWith({
      consultationtype1: true,
    });
    expect(props.setOpen).toHaveBeenCalledWith(false);
  });

  it('should do not apply filter and close popup when clicked outside', () => {
    const Component = withTheme(withIntl(ClinicFilter));
    const { getByTestId, container } = render(<Component {...props} open />);
    const changeFilter = getByTestId('change-filter-0');
    fireEvent.click(changeFilter);
    const filterField = getByTestId('field-filter');
    fireEvent.click(filterField);

    act(() => {
      document.querySelector('body').click();
    });
    expect(props.setOpen).toHaveBeenCalledWith(false);

    expect(container).toMatchSnapshot();
  });

  it('should clear all filter when clicked on clear all', () => {
    const Component = withTheme(withIntl(ClinicFilter));
    const { getByTestId, container } = render(<Component {...props} open />);
    const changeFilter = getByTestId('change-filter-0');
    fireEvent.click(changeFilter);
    const applyBtn = getByTestId('btn-apply-filter');
    fireEvent.click(applyBtn);
    const clearAllBtn = getByTestId('btn-clear-filter');

    fireEvent.click(clearAllBtn);

    expect(container).toMatchSnapshot();
    expect(props.filterClinic).toHaveBeenCalled();
    expect(props.filterClinic).toHaveBeenCalledWith({});
  });

  it('should display selected label when popup is opened', () => {
    const Component = withTheme(withIntl(ClinicFilter));
    const { getByTestId, container } = render(<Component {...props} open />);

    const changeFilter = getByTestId('change-filter-0');
    fireEvent.click(changeFilter);

    expect(container).toMatchSnapshot();
  });
});
