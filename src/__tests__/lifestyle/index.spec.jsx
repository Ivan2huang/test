import React from 'react';
import { render } from '@testing-library/react';

import Lifestyle from '../../pages/lifestyle';

jest.mock('../../modules/lifestyle', () => ({
  LifestyleContainer: props => <div {...props}>Dummy Lifestyle Container</div>,
}));

describe('Lifestyle Page', () => {
  it('should match snapshot', () => {
    const { container } = render(<Lifestyle />);
    expect(container).toMatchSnapshot();
  });
});
