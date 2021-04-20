/* eslint-disable no-undef,react/prop-types */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import withTheme from '../../../../themes/withThemeProvider';
import withIntl from '../../../../i18n/withIntlProvider';

import ResultCard from '../ResultCard';

jest.mock(
  '../../../../uiComponents/Typography',
  () => ({ children, ...rest }) => (
    <div {...rest}>
      {children}
      (Typography)
    </div>
  ),
);

jest.mock(
  '../LifestyleResultTipsModal.jsx',
  () => ({ children, onClose, open, ...rest }) => (
    <div>
      <span>{`modal open:${open.toString()}`}</span>
      <button type="button" data-testid="btn-close" onClick={onClose}>
        close
      </button>
      <span>{mockPropsCapture(rest)}</span>
    </div>
  ),
);

jest.mock('../../../../helpers/helpers', () => ({
  onEnter: jest.fn((_, callback) => {
    callback();
  }),
  formatMessage: jest.fn((intl, id, defaultMessage) => defaultMessage),
}));

describe('ResultCard component', () => {
  const props = {
    id: 'test-card',
    color: 'red',
    CardIcon: <div>Card icon</div>,
    title: 'BMI',
    subTitle: 'Overweight',
    description: 'description of card',
    tips: [
      {
        topic: 'xyz',
        source: 'abc',
        text: 'test text',
        link: 'http://xyz.com',
      },
    ],
    lifestyleTipsErrorState: false,
    tipCategory: 'bmi',
  };
  const setup = (componentProps = props) => {
    const Component = withIntl(withTheme(ResultCard));
    return render(<Component {...componentProps} />);
  };

  it('should match snapshot', () => {
    const { container } = setup();

    expect(container).toMatchSnapshot();
  });

  it('should open the modal on click of card', () => {
    const { container, getByTestId } = setup();
    const card = getByTestId('card-BMI');

    fireEvent.click(card);

    expect(container).toMatchSnapshot();
  });

  it('should close the modal on click of close of modal', () => {
    const { container, getByTestId } = setup();
    const card = getByTestId('card-BMI');
    const closeBtn = getByTestId('btn-close');
    fireEvent.click(card);

    fireEvent.click(closeBtn);

    expect(container).toMatchSnapshot();
  });

  it('should open the modal on enter key press', () => {
    const { container, getByTestId } = setup();
    const card = getByTestId('card-BMI');

    fireEvent.keyPress(card, { key: 'Enter', code: 13, charCode: 13 });

    expect(container).toMatchSnapshot();
  });
});
