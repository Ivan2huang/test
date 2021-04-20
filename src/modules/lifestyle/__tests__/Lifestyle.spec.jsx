import React from 'react';
import { render } from '@testing-library/react';

import Lifestyle from '../Lifestyle';

jest.mock('../../../layouts/withLayoutProvider', () => Component => () => (
  <div>
    <header>Layout Header</header>
    <Component />
  </div>
));

jest.mock('../LifestyleLanding', () => () => <div>No Lifestyle Component</div>);
jest.mock('../LifestyleOverview', () => () => (
  <div>Lifestyle Landing Component</div>
));

describe('Lifestyle Component', () => {
  const props = {
    lifestyleDetails: { height: 160, weight: 40 },
    getLifestyleDetails: jest.fn(),
  };

  it('should match snapshot when lifestyle details are present', () => {
    const { container } = render(
      <Lifestyle {...props} lifestyleDetails={null} />,
    );

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot when loading data ', () => {
    const { container } = render(<Lifestyle {...props} loading />);

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot when there is no lifestyle details ', () => {
    const { container } = render(<Lifestyle {...props} />);

    expect(container).toMatchSnapshot();
  });
});
