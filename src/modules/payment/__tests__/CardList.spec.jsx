import React from 'react';
import { render } from '@testing-library/react';
import CardList from '../CardList';

let props;

beforeEach(() => {
  props = {
    cards: [
      {
        id: '1',
        card: {
          maskedCreditCardNumber: '0008',
        },
      },
      {
        id: '2',
        card: {
          maskedCreditCardNumber: '0009',
        },
      },
    ],
    selectedCardId: '',
    onCardChanged: jest.fn(),
  };
});

describe('CardList Component', () => {
  it('should match snapshot', () => {
    const { container } = render(<CardList {...props} />);

    expect(container).toMatchSnapshot();
  });
});
