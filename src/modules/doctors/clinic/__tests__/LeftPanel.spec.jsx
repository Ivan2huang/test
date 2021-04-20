import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import LeftPanel from '../LeftPanel';
import withIntl from '../../../../i18n/withIntlProvider';
import withTheme from '../../../../themes/withThemeProvider';

jest.mock('../ClinicListViewContainer', () => () => (
  <div>Clinic List View Container</div>
));
jest.mock('../ClinicDetailViewContainer', () => () => (
  <div>Clinic Details View Container</div>
));
jest.mock('../ClinicSearchContainer', () => () => (
  <div>Clinic search Container</div>
));
jest.mock('../ClinicFilterContainer', () => () => (
  <div>Clinic Filter Container</div>
));

describe('LeftPanel Component', () => {
  const defaultProps = {
    view: 'map',
    toggleView: jest.fn(),
  };
  const Component = withTheme(withIntl(LeftPanel));

  it('should match the snapshot', () => {
    const { container } = render(<Component {...defaultProps} />);

    expect(container).toMatchSnapshot();
  });

  it('should be able to toggle the view  when change view clicked', () => {
    const { container, getByTestId, rerender } = render(
      <Component {...defaultProps} />,
    );

    const changeView = getByTestId('btn-toggle-view');
    fireEvent.click(changeView);
    expect(defaultProps.toggleView).toHaveBeenCalledTimes(1);
    const newProps = {
      ...defaultProps,
      view: 'list',
    };
    rerender(<Component {...newProps} />);
    expect(container).toMatchSnapshot();
  });
});
