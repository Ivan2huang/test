/* eslint-disable global-require */

import { MAP_CONTROL_POSITIONS } from '../mapConfig';

describe('MapConfig', () => {
  beforeEach(() => {
    process.env = Object.assign(process.env, {
      GOOGLE_MAP_API_KEY: 'test-google-map-key',
    });
  });

  it('should match snapshot', () => {
    const mapConfig = require('../mapConfig').default;
    expect(mapConfig).toMatchSnapshot();
  });

  it('should return the icon position', () => {
    global.window = Object.create(window);
    Object.defineProperty(window, 'google', {
      value: {
        maps: {
          ControlPosition: {
            TOP_RIGHT: 3,
          },
        },
      },
    });

    expect(MAP_CONTROL_POSITIONS.myLocationIcon).toEqual(3);
  });
});
