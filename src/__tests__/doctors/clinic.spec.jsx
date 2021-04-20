import React from 'react';
import { render } from '@testing-library/react';

import Clinic from '../../pages/doctors/clinic';

jest.mock('../../layouts/withLayoutProvider', () => Component => () => (
  <div>
    <header>Layout Header</header>
    <Component />
  </div>
));

jest.mock('../../modules/doctors/clinic', () => ({
  Clinic: () => <div>Clinic Component</div>,
}));

describe('Clinic Page', () => {
  it('should match snapshot', () => {
    const { container } = render(<Clinic />);

    expect(container).toMatchSnapshot();
  });
});
