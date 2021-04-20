/* eslint-disable react/prop-types */
import React from 'react';
import { render } from '@testing-library/react';

import FAQs from '../FAQs';
import withIntl from '../../../../i18n/withIntlProvider';
import withThemeProvider from '../../../../themes/withThemeProvider';

jest.mock(
  '../../../../uiComponents/Typography',
  () => ({ children, props }) => (
    <div {...props}>
      Typography Component
      {children}
    </div>
  ),
);

describe('FAQs Component', () => {
  const props = {
    faqs: [
      {
        name: 'Coverage',
        content: 'Where can i find the doctor list?',
      },
      {
        name: 'Claims Status',
        content: 'What is the claim turnaround time?',
      },
    ],
  };
  it('should match snapshot', () => {
    const Component = withIntl(withThemeProvider(FAQs));
    const { container } = render(<Component {...props} />);

    expect(container).toMatchSnapshot();
  });
});
