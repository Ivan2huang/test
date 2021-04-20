/* eslint-disable react/prop-types,no-undef */
import React from 'react';
import { reduxForm } from 'redux-form';
import { render, fireEvent } from '@testing-library/react';
import { within } from '@testing-library/dom';

import AboutMe from '../AboutMe';
import withRedux from '../../../../redux/withReduxProvider';
import withIntl from '../../../../i18n/withIntlProvider';

jest.mock(
  '../../../../uiComponents/GridItem',
  () => ({ columns, children }) => (
    <div data-xs={columns.xs} data-sm={columns.sm} data-md={columns.md}>
      <span>GridItem Component</span>
      <div>{children}</div>
    </div>
  ),
);

jest.mock('../../../../uiComponents/Grid', () => ({ children }) => (
  <div>
    <span>Grid Component</span>
    <div>{children}</div>
  </div>
));

jest.mock(
  '../../../../uiComponents/Typography',
  () => ({ children, ...rest }) => (
    <div {...rest}>
      {children}
      (Typography)
    </div>
  ),
);

jest.mock('../../../../utils/renderNumberInput', () => props => (
  <div>
    RenderNumberInput Component
    <span>{mockPropsCapture(props)}</span>
  </div>
));

jest.mock('../../../../helpers/helpers', () => ({
  formatMessage: (intl, id, defaultMessage) => defaultMessage,
}));

describe('AboutMe Component', () => {
  const props = {};
  const setUp = (componentProps = props) => {
    const Component = withIntl(
      withRedux(
        reduxForm({
          form: 'form',
        })(AboutMe),
      ),
    );
    return render(<Component {...componentProps} fieldChange={jest.fn()} />);
  };

  it('should match snapshot', () => {
    const { container } = setUp();

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot with specific units', () => {
    const { container } = setUp({
      data: {
        heightUnit: 'Cm',
        weightUnit: 'Kg',
        waistUnit: 'In',
      },
    });

    expect(container).toMatchSnapshot();
  });

  it('should clear BMI data when unit changed', () => {
    const { container } = setUp();

    const changeUnitValue = (id, label) => {
      const element = container.querySelector(`#select-${id}`);
      fireEvent.click(element);
      const { getByText } = within(document.getElementById(`menu-${id}`));
      const item = getByText(label);
      fireEvent.click(item);
    };

    changeUnitValue('dropdown-height-unit', 'FT, IN');
    expect(container).toMatchSnapshot();

    changeUnitValue('dropdown-weight-unit', 'LB');
    expect(container).toMatchSnapshot();

    changeUnitValue('dropdown-waist-circumfercence-unit', 'IN');
    expect(container).toMatchSnapshot();
  });
});
