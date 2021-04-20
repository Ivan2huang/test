/* eslint-disable react/prop-types */

import { render } from '@testing-library/react';
import React from 'react';

import AccountLocked from '../AccountLocked';
import withIntl from '../../../../i18n/withIntlProvider';

jest.mock('../../../error/Error', () => props => (
  <div>
    <div>Error Component</div>
    <span>
      {Object.entries(props).map(([key, value]) => `${key} = ${value}`)}
    </span>
  </div>
));

describe('AccountLocked Component', () => {
  const props = {
    messsage: 'message',
  };
  const setUp = (componentProps = {}) => {
    const Component = withIntl(AccountLocked);
    return render(<Component {...componentProps} />);
  };

  it('should match the snapshot', () => {
    const { container } = setUp(props);

    expect(container).toMatchSnapshot();
  });
});
