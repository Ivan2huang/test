import React from 'react';

import ME_LIST from '../meList';

jest.mock('../settings', () => ({
  Settings: <div>Settings Component</div>,
}));
jest.mock('../details/Details', () => <div>Details Component</div>);

describe('MeList Constants', () => {
  it('should match the snapshot', () => {
    expect(ME_LIST({ isTerminated: true })).toMatchSnapshot();
  });
  it('should match the snapshot for terminated employee', () => {
    expect(ME_LIST({ isTerminated: false })).toMatchSnapshot();
  });
});
