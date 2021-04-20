import React from 'react';

import { mapDispatchToProps } from '../HomeContainer';

jest.mock('../../me/action', () => ({
  getMemberProfile: jest.fn(() => ({
    type: 'GET_MEMBER_PROFILE',
    payload: {},
  })),
}));

jest.mock('../Home', () => props => <div {...props}>Home Component</div>);

describe('Home Container', () => {
  it('should dispatch get member profile', () => {
    const dispatch = jest.fn();
    const expected = {
      type: 'GET_MEMBER_PROFILE',
      payload: {},
    };
    const dispatchMapToProps = mapDispatchToProps(dispatch);
    dispatchMapToProps.getMemberProfile();

    expect(dispatch).toHaveBeenCalledWith(expected);
  });
});
