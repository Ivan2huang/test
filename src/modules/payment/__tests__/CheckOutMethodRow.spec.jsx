import React from 'react';

import { render } from '@testing-library/react';

import VisaCard from '../../../icons/VisaCard';
import CheckOutMethodRow from '../CheckOutMethodRow';

jest.mock('../../../icons/VisaCard', () => <div>Dummy VisaCard Icon</div>);

const props = {
  icon: VisaCard,
  mt: 10,
  label: 'Row',
  amount: '100',
};

describe('CheckOutMethodRow Component', () => {
  it('should match the snapshot', () => {
    const { container } = render(<CheckOutMethodRow {...props} />);

    expect(container).toMatchSnapshot();
  });
});
