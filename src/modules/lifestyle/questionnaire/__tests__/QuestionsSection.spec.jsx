/* eslint-disable react/prop-types,no-undef */
import React from 'react';
import { render } from '@testing-library/react';

import QuestionSection from '../QuestionsSection';

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

jest.mock('../Questions', () => props => (
  <div>
    Questions Component
    <span>{mockPropsCapture(props)}</span>
  </div>
));

describe('QuestionSection Component', () => {
  const props = {
    title: 'Questions Section Title',
    imageUrl: 'test/image.png',
    questions: [
      {
        questionOrder: '1',
        questionId: 'choices_2.1',
        dependentQuestion: false,
        name: 'smokingBehaviour',
        type: 'radio',
        text:
          'What is your current cigarettes (including hand-rolled cigarettes) smoking behaviour?',
        section: 'choices',
        options: [
          {
            label: 'Non-smoker',
            value: 'NonSmoker',
          },
          {
            label: 'Ex-smoker',
            value: 'ExSmoker',
          },
          {
            label: 'Occasional smoker (less than one cigarette per day)',
            value: 'OccasionalSmoker',
          },
          {
            label: 'Daily smoker (at least one cigarette per day)',
            value: 'DailySmoker',
          },
        ],
      },
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
    ],
  };

  const setUp = (componentProps = props) => {
    return render(<QuestionSection {...componentProps} />);
  };

  it('should match snapshot', () => {
    const { container } = setUp();

    expect(container).toMatchSnapshot();
  });
});
