import React from 'react';
import { render } from '@testing-library/react';
import Router from 'next/router';
import Home from '../Home';
import { getCookie } from '../../../helpers/auth';

jest.mock('next/router', () => ({ push: jest.fn() }));

jest.mock('../../../helpers/auth', () => ({
  getCookie: jest.fn(),
}));

jest.mock('../../../helpers/logger');

describe('Home Page', () => {
  const props = {
    getMemberProfile: jest.fn(),
  };

  it('should match snapshot', () => {
    const { container } = render(<Home {...props} />);
    expect(container).toMatchSnapshot();
  });

  it('should redirect to Lifestyle page', () => {
    getCookie.mockReturnValue('clientId');
    render(<Home {...props} />);
    expect(Router.push).toHaveBeenCalledWith('/lifestyle?clientid=clientId');
  });
});
