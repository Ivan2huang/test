import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render } from '@testing-library/react';
import WellnessNewsletterModalContainer from '../WellnessNewsletterModalContainer';

// eslint-disable-next-line react/prop-types
jest.mock('../WellnessNewsletterModal', () => ({ props }) => (
  <div {...props}>WellnessNewsletterModal Component</div>
));

const mockStore = configureStore([]);

const state = {
  me: {
    member: {
      profile: {
        preferredLocale: 'en-HK',
      },
    },
  },
  legalContents: {
    newsLetter: {
      content: {
        'en-HK': 'en-HK',
        'zh-HK': 'zh-HK',
      },
    },
  },
};

describe('WellnessNewsletterModalContainer', () => {
  let store;
  const getNewsLetter = jest.fn();

  beforeEach(() => {
    store = mockStore(state);
  });

  it('should match snapshot when open', () => {
    const { container } = render(
      <Provider store={store}>
        <WellnessNewsletterModalContainer open getNewsLetter={getNewsLetter} />
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot when close', () => {
    const { container } = render(
      <Provider store={store}>
        <WellnessNewsletterModalContainer
          open={false}
          getNewsLetter={getNewsLetter}
        />
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });
});
