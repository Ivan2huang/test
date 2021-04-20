import React from 'react';
import { render } from '@testing-library/react';
import withTheme from '../../../../themes/withThemeProvider';

import LifestyleScoreChart from '../LifestyleScoreChart';

describe('LifestyleScoreChart component', () => {
  const setUp = healthScore => {
    const Component = withTheme(LifestyleScoreChart);
    return render(<Component healthScore={healthScore} />);
  };

  it('should match snapshot for health score from 0 to 25', () => {
    const { container } = setUp(20);

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot for health score from 26 to 75', () => {
    const { container } = setUp(40);

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot for health score from 76 to 100', () => {
    const { container } = setUp(80);

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot for health score beyond range 0 to 100', () => {
    const { container } = setUp(101);

    expect(container).toMatchSnapshot();
  });
});
