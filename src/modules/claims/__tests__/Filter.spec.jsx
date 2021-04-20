import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import withIntl from '../../../i18n/withIntlProvider';
import withTheme from '../../../themes/withThemeProvider';
import Filter from '../Filter';
import { FILTER_CATEGORIES, FILTER_STATUSES } from '../constant';

const WrappedFilter = (Component, props) => () => {
  return (
    <div>
      <button data-testid="outside-click" type="button">
        Outside Click
      </button>
      <Component {...props} />
    </div>
  );
};

let props;
let Component;

beforeEach(() => {
  props = {
    options: {},
    mappers: {},
    appliedFilters: {},
    localizeOptionsKeyPrefix: 'claim.filter.options.statusCode.',
    filterClaims: jest.fn(),
  };
  Component = withIntl(withTheme(Filter));
});

describe('Filter Component', () => {
  it('should match the snapshot', () => {
    const { container } = render(<Component {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('should match the snapshot when there is mappers', () => {
    props.options = {
      statuses: [1, 2],
    };
    props.mappers = {
      statuses: {
        1: 'a',
        2: 'b',
      },
    };
    const { container } = render(<Component {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('should toggle dialogs filter', () => {
    const NewFilter = WrappedFilter(Component, props);
    const { getByTestId } = render(<NewFilter />);

    fireEvent.click(getByTestId('field-filter'));
    fireEvent.click(getByTestId('outside-click'));
  });

  it('should clear all selected filter', () => {
    props.options = {
      statuses: Object.values(FILTER_STATUSES),
      categoryCodes: Object.values(FILTER_CATEGORIES),
    };
    const { getByLabelText, getByTestId } = render(<Component {...props} />);

    const approvedCheckboxNode = getByLabelText(/Approved/i, {
      selector: 'input',
    });
    const rejectedCheckboxNode = getByLabelText(/Rejected/i, {
      selector: 'input',
    });

    fireEvent.click(approvedCheckboxNode);

    expect(approvedCheckboxNode.checked).toBe(true);

    fireEvent.click(getByTestId('btn-clear-all-filter'));

    expect(approvedCheckboxNode.checked).toBe(false);

    expect(rejectedCheckboxNode.checked).toBe(false);
  });

  it('should apply the filters when submit', () => {
    props.options = {
      statuses: Object.values(FILTER_STATUSES),
      categoryCodes: Object.values(FILTER_CATEGORIES),
    };
    const { getByLabelText, getByTestId } = render(<Component {...props} />);

    const approvedCheckboxNode = getByLabelText(/Approved/i, {
      selector: 'input',
    });
    const rejectedCheckboxNode = getByLabelText(/Rejected/i, {
      selector: 'input',
    });

    fireEvent.click(approvedCheckboxNode);
    fireEvent.click(rejectedCheckboxNode);
    // trigger toggle click on approved
    fireEvent.click(approvedCheckboxNode);

    fireEvent.click(getByTestId('btn-apply-filter'));

    expect(props.filterClaims).toHaveBeenCalledTimes(1);
    expect(props.filterClaims).toHaveBeenCalledWith({
      statuses: {
        REJECTED: true,
      },
    });

    fireEvent.click(rejectedCheckboxNode);

    expect(approvedCheckboxNode.checked).toBe(false);

    expect(rejectedCheckboxNode.checked).toBe(false);

    fireEvent.click(getByTestId('btn-apply-filter'));

    expect(props.filterClaims).toHaveBeenCalledTimes(2);
    expect(props.filterClaims).toHaveBeenCalledWith({});
  });
});
