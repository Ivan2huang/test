import React from 'react';
import { render } from '@testing-library/react';

import Questionnaire from '../../pages/lifestyle/questionnaire';

jest.mock('../../layouts/withLayoutProvider', () => Component => () => (
  <div>
    <header>Layout Header</header>
    <Component />
  </div>
));

jest.mock('../../modules/lifestyle/questionnaire', () => ({
  QuestionnaireContainer: () => <div>QuestionnaireContainer Component</div>,
}));

describe('Questionnaire Page', () => {
  it('should match snapshot', () => {
    const { container } = render(<Questionnaire />);
    expect(container).toMatchSnapshot();
  });
});
