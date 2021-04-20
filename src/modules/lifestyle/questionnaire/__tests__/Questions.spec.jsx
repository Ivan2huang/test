/* eslint-disable react/prop-types,no-undef */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { reduxForm } from 'redux-form';

import Questions from '../Questions';
import withRedux from '../../../../redux/withReduxProvider';
import withIntl from '../../../../i18n/withIntlProvider';
import { logAction } from '../../../../helpers/firebase';

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
  '../../../../utils/renderDropdown',
  () => ({ input: { onChange }, ...rest }) => (
    <div>
      RenderDropdown Component
      <span>{mockPropsCapture(rest)}</span>
      <input type="select" onClick={onChange} />
    </div>
  ),
);

jest.mock(
  '../../../../utils/renderRadioGroup',
  () => ({ input: { onChange }, ...rest }) => (
    <div>
      RenderRadioGroup Component
      <span>{mockPropsCapture(rest)}</span>
      <input type="radio" onClick={onChange} />
    </div>
  ),
);

jest.mock(
  '../renderCustomCheckboxGroup',
  () => ({ input: { onChange }, ...rest }) => (
    <div>
      RenderCustomCheckboxGroup Component
      <span>{mockPropsCapture(rest)}</span>
      <input type="checkbox" onClick={onChange} />
    </div>
  ),
);

jest.mock('../../../../helpers/helpers', () => ({
  formatMessage: (intl, id, defaultMessage) => defaultMessage,
}));

jest.mock('../../../../helpers/firebase', () => ({
  logAction: jest.fn(),
}));

describe('Questions Component', () => {
  const props = {
    questions: [
      {
        questionOrder: '2',
        questionId: 'choices_2.2',
        dependentQuestion: false,
        name: 'alcoholConsumptionFrequency',
        type: 'radio',
        text:
          'How often you have a drink containing alcohol? 12.5 grams of alcohol per drink - Beer - 12oz (355ml), Wine - 5 oz (148ml), Spirits - 1.5 oz (44ml).',
        section: 'choices',
        options: [
          {
            label: 'Never',
            value: 'Never',
          },
          {
            label: 'Monthly or less',
            value: 'MonthlyOrLess',
          },
          {
            label: '2 - 4 times a month',
            value: 'TwoToFourTimesAMonth',
          },
          {
            label: '2 - 3 times a week',
            value: 'TwoToThreeTimesAWeek',
          },
          {
            label: '4 or more times a week',
            value: 'FourOrMoreTimesAWeek',
          },
        ],
      },
      {
        questionOrder: '4',
        questionId: 'choices_2.3',
        dependentQuestion: false,
        name: 'exerciseFrequency',
        type: 'singleSelect',
        titleLabel: 'Frequency',
        selectFieldLabel: 'Frequency',
        text:
          'During the last 7 days, how many days did you walk 10 minutes or more at a time or do at least moderate physical activities that made you breathe somewhat harder than normal?',
        section: 'choices',
        options: [
          {
            label: '0 days',
            value: '0',
          },
          {
            label: '1 day',
            value: '1',
          },
          {
            label: '2 days',
            value: '2',
          },
          {
            label: '3 days',
            value: '3',
          },
          {
            label: '4 days',
            value: '4',
          },
          {
            label: '5 days',
            value: '5',
          },
          {
            label: '6 days',
            value: '6',
          },
          {
            label: '7 days',
            value: '7',
          },
        ],
      },
      {
        questionOrder: '6',
        questionId: 'choices_2.4',
        dependentQuestion: false,
        name: 'temptingFoodItems',
        text:
          'Do you find any of these foods tempting (that is, do you want to eat more of them than you think you should)?',
        section: 'choices',
        titleLabel: 'Food',
        type: 'multiselect',
        selectFieldLabel: 'Select Food',
        hasDefaultValue: true,
        buttonLabel: 'Select food',
        options: [
          {
            value: 'Chocolate',
            label: 'Chocolate',
          },
          {
            value: 'PotatoChips',
            label: 'Potato chips',
          },
          {
            value: 'FrenchFries',
            label: 'French fries',
          },
          {
            value: 'Cakes',
            label: 'Cakes',
          },
          {
            value: 'IceCream',
            label: 'Ice cream',
          },
          {
            value: 'BreadOrToast',
            label: 'Bread or toast',
          },
          {
            value: 'SugaryDrinks',
            label: 'Sugary drinks',
          },
          {
            value: 'CookiesOrBiscuits',
            label: 'Cookies or biscuits',
          },
          {
            value: 'DessertsOrSweets',
            label: 'Desserts or sweets',
          },
          {
            value: 'BubbleTea',
            label: 'Bubble tea',
          },
          {
            value: 'Pastries',
            label: 'Pastries',
          },
          {
            value: 'InstantNoodles',
            label: 'Instant noodles',
          },
          {
            value: 'FriedFood',
            label: 'Fried food',
          },
          {
            value: 'Other',
            label: 'Other',
          },
          {
            value: 'NoneTempting',
            label: "I don't find any food tempting",
            hasInversion: true,
          },
        ],
      },
      {
        questionOrder: '7',
        questionId: 'choices_2.5',
        dependentQuestion: false,
        name: 'testSingle',
        text:
          'Do you find any of these foods tempting (that is, do you want to eat more of them than you think you should)?',
        section: 'choices',
        titleLabel: 'Food',
        type: 'singleSelect',
        selectFieldLabel: 'Select Food',
        hasDefaultValue: true,
        buttonLabel: 'Select food',
        options: [
          {
            value: 'Chocolate',
            label: 'Chocolate',
          },
          {
            value: 'PotatoChips',
            label: 'Potato chips',
          },
          {
            value: 'FrenchFries',
            label: 'French fries',
          },
          {
            value: 'Cakes',
            label: 'Cakes',
          },
          {
            value: 'IceCream',
            label: 'Ice cream',
          },
          {
            value: 'BreadOrToast',
            label: 'Bread or toast',
          },
          {
            value: 'SugaryDrinks',
            label: 'Sugary drinks',
          },
          {
            value: 'CookiesOrBiscuits',
            label: 'Cookies or biscuits',
          },
          {
            value: 'DessertsOrSweets',
            label: 'Desserts or sweets',
          },
          {
            value: 'BubbleTea',
            label: 'Bubble tea',
          },
          {
            value: 'Pastries',
            label: 'Pastries',
          },
          {
            value: 'InstantNoodles',
            label: 'Instant noodles',
          },
          {
            value: 'FriedFood',
            label: 'Fried food',
          },
          {
            value: 'Other',
            label: 'Other',
          },
          {
            value: 'NoneTempting',
            label: "I don't find any food tempting",
            hasInversion: true,
          },
        ],
      },
    ],
  };

  const setUp = (componentProps = props) => {
    const Component = withIntl(
      withRedux(
        reduxForm({
          form: 'form',
        })(Questions),
      ),
    );
    return render(<Component {...componentProps} />);
  };

  beforeEach(() => {
    logAction.mockClear();
  });

  it('should match snapshot', () => {
    const { container } = setUp();

    expect(container).toMatchSnapshot();
  });

  it('should call logAction when change alcoholConsumptionFrequency answer', () => {
    const { container } = setUp();
    const radioButton = container.querySelector(
      "[data-id='alcoholConsumptionFrequency'] [type='radio']",
    );
    fireEvent.click(radioButton);
    expect(logAction).toHaveBeenCalledWith({
      category: 'Health Questionnaire',
      action: 'Drink frequency question',
    });
  });

  it('should not call logAction when change testSingle answer', () => {
    const { container } = setUp();
    const radioButton = container.querySelector(
      "[data-id='testSingle'] [type='select']",
    );
    fireEvent.click(radioButton);
    expect(logAction).not.toHaveBeenCalled();
  });
});
