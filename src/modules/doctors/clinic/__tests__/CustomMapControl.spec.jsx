import React from 'react';
import { render } from '@testing-library/react';
import { MAP } from 'react-google-maps/lib/constants';

import PropTypes from 'prop-types';
import CustomMapControl from '../CustomMapControl';

describe('CustomMapControl component', () => {
  it('should render the external component', () => {
    class Component extends React.Component {
      getChildContext() {
        return {
          [MAP]: {
            controls: [[]],
          },
        };
      }

      render() {
        // eslint-disable-next-line react/prop-types,react/destructuring-assignment
        return <div>{this.props.children}</div>;
      }
    }
    Component.childContextTypes = {
      [MAP]: PropTypes.shape({}),
    };
    const { container } = render(
      <Component>
        <CustomMapControl position={0}>
          <div>Dummy</div>
        </CustomMapControl>
      </Component>,
    );

    expect(container).toMatchSnapshot();
  });
});
