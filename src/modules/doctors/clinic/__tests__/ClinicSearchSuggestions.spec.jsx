/* eslint-disable react/prop-types */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import withIntl from '../../../../i18n/withIntlProvider';
import withTheme from '../../../../themes/withThemeProvider';
import ClinicSearchSuggestions from '../ClinicSearchSuggestions';
import { logAction } from '../../../../helpers/firebase';

jest.mock('../../../../helpers/helpers', () => ({
  formatMessage: jest.fn((intl, id, defaultMessage) => defaultMessage),
}));

jest.mock(
  '../../../../uiComponents/Typography',
  () => ({ children, ...rest }) => <div {...rest}>{children}</div>,
);

jest.mock('../../../../helpers/firebase', () => ({
  logAction: jest.fn(),
}));

describe('ClinicSearchSuggestions Component', () => {
  const props = {
    onSearch: jest.fn(),
    open: false,
    areas: {
      area1: ['Central1', 'Central3'],
      area2: ['Central2'],
    },
    recentSearches: [{ keyword: 'HongKong', searchBy: 'Area' }],
    showAllClinics: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  const setUp = (componentProps = props) => {
    const Component = withIntl(withTheme(ClinicSearchSuggestions));
    return render(<Component {...componentProps} />);
  };

  it('should match snapshot', () => {
    const { container } = setUp();

    expect(container).toMatchSnapshot();
  });

  it('should call onSearch callback on menu item selection', () => {
    const { getByText } = setUp();

    const menuItem = getByText('Central1');
    fireEvent.click(menuItem);

    expect(props.onSearch).toHaveBeenCalledTimes(1);
    expect(props.onSearch).toHaveBeenCalledWith('Central1', 'district');
  });

  it('should not render the recent searches suggestion when recent searches are empty', () => {
    const { container } = setUp({
      ...props,
      recentSearches: [],
    });

    expect(container).toMatchSnapshot();
  });

  describe('recent search selection', () => {
    it('should call on search with keyword and search by', () => {
      const { getByText } = setUp();

      const menuItem = getByText('HongKong (Area)');
      fireEvent.click(menuItem);

      expect(props.onSearch).toHaveBeenCalledTimes(1);
      expect(props.onSearch).toHaveBeenCalledWith('HongKong', 'Area');
    });

    it('should call on search with keyword only', () => {
      const { getByText } = setUp({
        ...props,
        recentSearches: [{ keyword: 'HongKong', searchBy: '' }],
      });

      const menuItem = getByText('HongKong');
      fireEvent.click(menuItem);

      expect(props.onSearch).toHaveBeenCalledTimes(1);
      expect(props.onSearch).toHaveBeenCalledWith('HongKong', '');
    });
  });

  describe('firebase log actions', () => {
    it('should call firebase when click on search area suggestion', () => {
      const { getAllByTestId } = setUp();

      fireEvent.click(getAllByTestId('search-by-area')[0]);

      expect(logAction).toHaveBeenCalled();
    });

    it('should call firebase when click on search district suggestion', () => {
      const { getAllByTestId } = setUp();

      fireEvent.click(getAllByTestId('search-by-district')[0]);

      expect(logAction).toHaveBeenCalled();
    });
  });
});
