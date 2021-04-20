/* eslint-disable react/prop-types,react/button-has-type */
import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';

import ClinicSearch from '../ClinicSearch';
import withIntl from '../../../../i18n/withIntlProvider';
import withTheme from '../../../../themes/withThemeProvider';
import { getRecentSearch, saveRecentSearch } from '../helper';
import { logAction } from '../../../../helpers/firebase';

jest.mock('../../../../helpers/helpers', () => ({
  formatMessage: jest.fn((intl, id, defaultMessage) => defaultMessage),
}));

jest.mock('../helper', () => ({
  getRecentSearch: jest.fn(),
  saveRecentSearch: jest.fn(),
}));

jest.mock('../../../../helpers/firebase', () => ({
  logAction: jest.fn(),
}));

jest.mock(
  '../../../../uiComponents/Typography',
  () => ({ children, ...rest }) => <div {...rest}>{children}</div>,
);

jest.mock(
  '../ClinicSearchSuggestions',
  () => ({ open, areas, onSearch, children, showAllClinics }) => (
    <>
      <div data-testid="popup-suggestions" data-open={open} data-areas={areas}>
        Clinic Search Suggestions
      </div>
      <button data-testid="show-all-clinics" onClick={() => showAllClinics()}>
        Show all clinics
      </button>
      <button
        data-testid="popup-suggestion-item"
        onClick={() => onSearch('Central1', 'district')}
      >
        Suggestion
      </button>
      {children}
    </>
  ),
);

describe('ClinicSearch Component', () => {
  let props;

  const setUp = (componentProps = props) => {
    const Component = withIntl(withTheme(ClinicSearch));
    return render(<Component {...componentProps} />);
  };

  beforeEach(() => {
    props = {
      searchClinic: jest.fn(),
      areas: {
        area1: ['Central1', 'Central3'],
        area2: ['Central2'],
      },
      resetMap: jest.fn(),
      open: false,
      setOpen: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
    logAction.mockClear();
  });

  it('should match snapshot', () => {
    const { container } = setUp();

    expect(container).toMatchSnapshot();
  });

  it('should search clinics and save recent searches with search keyword when clicked on search', () => {
    const { getByTestId } = setUp();

    const searchField = getByTestId('search-bar-field').querySelector('input');
    const searchButton = getByTestId('btn-clinic-search');

    const searchText = 'test';
    fireEvent.change(searchField, { target: { value: searchText } });

    fireEvent.click(searchButton);

    expect(props.searchClinic).toHaveBeenCalledTimes(1);
    expect(props.searchClinic).toHaveBeenCalledWith(searchText, undefined);
    expect(getRecentSearch).toHaveBeenCalledTimes(2);
    expect(saveRecentSearch).toHaveBeenCalledWith('test', undefined);
  });

  it('should handle search when search text is empty', () => {
    const { getByTestId } = setUp();

    const searchField = getByTestId('search-bar-field').querySelector('input');
    const searchButton = getByTestId('btn-clinic-search');

    const searchText = '   ';
    fireEvent.change(searchField, { target: { value: searchText } });

    fireEvent.click(searchButton);

    expect(props.searchClinic).toHaveBeenCalledTimes(1);
    expect(props.searchClinic).toHaveBeenCalledWith(
      searchText.trim(),
      undefined,
    );
    expect(getRecentSearch).toHaveBeenCalledTimes(1);
    expect(saveRecentSearch).not.toHaveBeenCalled();
  });

  it('should handle search when search contain empty spaces', () => {
    const { getByTestId } = setUp();

    const searchField = getByTestId('search-bar-field').querySelector('input');
    const searchButton = getByTestId('btn-clinic-search');

    const searchText = '   test  ';
    fireEvent.change(searchField, { target: { value: searchText } });

    fireEvent.click(searchButton);

    expect(props.searchClinic).toHaveBeenCalledTimes(1);
    expect(props.searchClinic).toHaveBeenCalledWith(
      searchText.trim(),
      undefined,
    );
    expect(getRecentSearch).toHaveBeenCalledTimes(2);
    expect(saveRecentSearch).toHaveBeenCalledWith('test', undefined);
  });

  it('should call searchClinic with search keyword when pressed enter key', () => {
    const { getByTestId } = setUp();

    const searchField = getByTestId('search-bar-field').querySelector('input');

    const searchText = 'test';
    fireEvent.change(searchField, { target: { value: searchText } });

    fireEvent.keyPress(searchField, {
      key: 'Enter',
      code: 13,
      charCode: 13,
    });

    expect(props.searchClinic).toHaveBeenCalledTimes(1);
    expect(props.searchClinic).toHaveBeenCalledWith(searchText, undefined);
  });

  it('should not call searchClinic with search keyword when pressed any key other than enter key', () => {
    const { getByTestId } = setUp();

    const searchField = getByTestId('search-bar-field').querySelector('input');

    const searchText = 'test';
    fireEvent.change(searchField, { target: { value: searchText } });

    fireEvent.keyPress(searchField, {
      key: 'a',
      code: 97,
      charCode: 97,
    });

    expect(props.searchClinic).toHaveBeenCalledTimes(0);
  });

  it('should open suggestion popup on input focus', () => {
    const { getByTestId } = setUp();

    const searchField = getByTestId('search-bar-field').querySelector('input');
    fireEvent.focus(searchField);

    expect(props.setOpen).toHaveBeenCalledWith(true);
  });

  it('should call searchClinic and close suggestion pop up on any suggestion click', () => {
    const { getByTestId } = setUp();

    const searchField = getByTestId('search-bar-field').querySelector('input');
    const button = getByTestId('popup-suggestion-item');
    const popper = getByTestId('popup-suggestions');
    fireEvent.click(button);
    const open = popper.getAttribute('data-open');

    expect(open).toBe('false');
    expect(searchField.value).toBe('Central1');
    expect(props.searchClinic).toHaveBeenCalledTimes(1);
    expect(props.searchClinic).toHaveBeenCalledWith('Central1', 'district');
  });

  it('should close suggestion pop up when clicked outside', () => {
    const { getByTestId } = setUp();

    const searchField = getByTestId('search-bar-field').querySelector('input');
    fireEvent.focus(searchField);
    const popper = getByTestId('popup-suggestions');
    act(() => {
      document.querySelector('body').click();
    });
    const open = popper.getAttribute('data-open');

    expect(open).toBe('false');
  });

  it('should loose search field focus after keying text and on press enter', () => {
    const { getByTestId } = setUp();

    const searchField = getByTestId('search-bar-field').querySelector('input');

    const searchText = 'test';
    fireEvent.change(searchField, { target: { value: searchText } });
    fireEvent.keyPress(searchField, {
      key: 'Enter',
      code: 13,
      charCode: 13,
    });

    expect(document.activeElement).not.toEqual(searchField);
  });

  it('should handle show all clinics when show all clinics clicked', () => {
    const { getByTestId } = setUp();

    const searchField = getByTestId('search-bar-field').querySelector('input');
    const button = getByTestId('show-all-clinics');
    const popper = getByTestId('popup-suggestions');
    fireEvent.click(button);
    const open = popper.getAttribute('data-open');

    expect(open).toBe('false');
    expect(searchField.value).toBe('');
    expect(props.resetMap).toHaveBeenCalledTimes(1);
  });

  it('should not call firebase when search change without empty value', () => {
    const { getByTestId } = setUp();

    fireEvent.change(getByTestId('search-bar-field').querySelector('input'), {
      target: {
        value: '',
      },
    });

    expect(logAction).not.toHaveBeenCalled();
  });
});
