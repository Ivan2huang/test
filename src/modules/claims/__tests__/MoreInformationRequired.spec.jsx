import React from 'react';
import { render } from '@testing-library/react';

import MoreInformationRequired from '../MoreInformationRequired';
import withIntl from '../../../i18n/withIntlProvider';

jest.mock('../../../helpers/helpers', () => ({
  formatMessage: jest.fn((intl, id, defaultMessage) => defaultMessage),
  isEmpty: jest.fn(),
}));

describe('MoreInformationRequired Component', () => {
  const props = {
    status: 'REQUEST FOR INFORMATION',
  };

  const setUp = (componentProps = props) => {
    const Component = withIntl(MoreInformationRequired);

    return render(<Component {...componentProps} />);
  };

  it('should match snapshot for REQUEST FOR INFORMATION status', () => {
    const { container } = setUp();

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot for others status', () => {
    const newProps = {
      ...props,
      status: 'PROCESSING',
    };

    const { container } = setUp(newProps);

    expect(container).toMatchSnapshot();
  });
});
