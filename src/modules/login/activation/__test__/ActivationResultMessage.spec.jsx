import React from 'react';
import { render } from '@testing-library/react';
import ActivationResultMessage from '../ActivationResultMessage';
import withIntl from '../../../../i18n/withIntlProvider';

describe('ActivationResultMessage Component', () => {
  const title = 'Success';
  const message = 'Congratulation';
  const defaultProps = {
    title,
    message,
  };

  const setUp = (props = defaultProps) => {
    const Component = withIntl(ActivationResultMessage);
    return render(<Component {...props} />);
  };

  it('should match snapshot', () => {
    const { container } = setUp();
    expect(container).toMatchSnapshot();
  });
});
