/* eslint-disable no-undef,react/prop-types */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Error from '../Error';
import withIntl from '../../../../i18n/withIntlProvider';
import withTheme from '../../../../themes/withThemeProvider';

jest.mock('../../../loader/Loader', () => ({ loading, children }) => {
  return (
    <div>
      {loading.toString()}
      {children}
    </div>
  );
});

jest.mock(
  '../../../../uiComponents/Typography',
  () => ({ children, ...rest }) => (
    <div>
      Typography Component
      <span>{mockPropsCapture(rest)}</span>
      {children}
    </div>
  ),
);

jest.mock('../../../../helpers/helpers', () => ({
  navigateTo: jest.fn(),
  formatMessage: (intl, key, defaultValue) => defaultValue,
}));

describe('Error Component', () => {
  let props;
  beforeEach(() => {
    props = {
      children: <div>children</div>,
      isAnalyzing: false,
      isError: false,
      onTryAgain: jest.fn(),
    };
  });

  const Component = withIntl(withTheme(Error));

  it('should match snapshot with children', () => {
    const { container } = render(<Component {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot with empty content', () => {
    props.isAnalyzing = true;
    props.isError = true;
    const { container } = render(<Component {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot with analyzing loading', () => {
    props.isAnalyzing = true;
    const { container } = render(<Component {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot with error content', () => {
    props.isError = true;
    const { container, getByTestId } = render(<Component {...props} />);

    expect(container).toMatchSnapshot();

    fireEvent.click(getByTestId('btn-tryAgain'));

    expect(props.onTryAgain).toHaveBeenCalled();
  });
});
