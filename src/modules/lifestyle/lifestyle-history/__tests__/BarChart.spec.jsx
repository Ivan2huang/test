import React from 'react';
import { render } from '@testing-library/react';

import BarChart, { callbacks } from '../BarChart';
import withTheme from '../../../../themes/withThemeProvider';
import withIntl from '../../../../i18n/withIntlProvider';

describe('BarChart Component', () => {
  const props = {
    data: [
      { score: 28.0, createdOn: '2019-10-14T04:51:09.298368' },
      { score: 36.0, createdOn: '2019-10-14T04:50:28.768909' },
      { score: 36.0, createdOn: '2019-10-11T05:09:46.455599' },
      { score: 41.0, createdOn: '2019-10-11T05:05:11.182433' },
    ],
  };

  it('should match snapshot', () => {
    const Component = withTheme(withIntl(BarChart));
    const { container } = render(<Component {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('should provide undefined for custom title of tooltip', () => {
    const { title } = callbacks;

    expect(title()).toBeUndefined();
  });

  it('should provide score as value for custom label of tooltip', () => {
    const toolTipItem = {
      value: 12,
    };

    const { label } = callbacks;

    expect(label(toolTipItem)).toBe(12);
  });
});
