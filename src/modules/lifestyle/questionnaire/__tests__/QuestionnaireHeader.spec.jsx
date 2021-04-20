/* eslint-disable react/prop-types */
import React from 'react';
import { render } from '@testing-library/react';

import QuestionnaireHeader from '../QuestionnaireHeader';
import withIntl from '../../../../i18n/withIntlProvider';

jest.mock(
  '../../../../uiComponents/Typography',
  () => ({ children, ...rest }) => <div {...rest}>{children}</div>,
);

jest.mock('../../../../uiComponents/Grid', () => ({ children, ...rest }) => (
  <div {...rest}>
    Grid
    {children}
  </div>
));

jest.mock(
  '../../../../uiComponents/GridItem',
  () => ({ columns, children }) => (
    <div data-xs={columns.xs} data-sm={columns.sm} data-md={columns.md}>
      <span>GridItem Component</span>
      <div>{children}</div>
    </div>
  ),
);

jest.mock('../../../../helpers/helpers', () => ({
  formatMessage: (intl, id, defaultMessage) => defaultMessage,
}));

describe('QuestionnaireHeader Component', () => {
  const props = {};
  const setUp = (componentProps = props) => {
    const Component = withIntl(QuestionnaireHeader);
    return render(<Component {...componentProps} />);
  };

  it('should match snapshot', () => {
    const { container } = setUp();

    expect(container).toMatchSnapshot();
  });
});
