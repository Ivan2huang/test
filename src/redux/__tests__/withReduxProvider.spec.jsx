import React from 'react';
import { render } from '@testing-library/react';

import withRedux from '../withReduxProvider';

describe('WithReduxProvider', () => {
  it('should match snapshot', () => {
    const props = {
      router: {
        location: {
          pathname: '/login',
        },
      },
    };

    const component = () => <div {...props}>Redux</div>;
    const Redux = withRedux(component);
    const { container } = render(<Redux env="development" {...props} />);
    expect(container).toMatchSnapshot();
  });

  it('should get initial props', async () => {
    const component = () => <div>Redux</div>;
    component.getInitialProps = () => Promise.resolve({ test: 'test' });
    const Redux = withRedux(component);

    const actual = await Redux.getInitialProps({
      ctx: {},
    });

    expect(actual).toBeDefined();
    expect(actual.initialProps.test).toEqual('test');
  });
});
