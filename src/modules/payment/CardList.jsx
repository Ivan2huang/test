import React from 'react';
import PropTypes from 'prop-types';

import Radio from '@material-ui/core/Radio';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { maskingCreditCardNumber } from './util';
import { ADD_NEW_CARD } from './constants';
import { cardType } from '../../types';

const CardList = ({ cards, selectedCardId, onCardChanged }) => {
  return (
    <FormControl component="fieldset">
      <RadioGroup
        name="select-card"
        value={`${selectedCardId}`}
        onChange={onCardChanged}
        data-testid="instruments-group"
      >
        {cards.map(
          item =>
            item.card && (
              <FormControlLabel
                key={`${item.id}`}
                value={`${item.id}`}
                control={<Radio color="secondary" />}
                label={
                  item.id !== ADD_NEW_CARD
                    ? maskingCreditCardNumber(item.card.maskedCreditCardNumber)
                    : item.card.maskedCreditCardNumber
                }
              />
            ),
        )}
      </RadioGroup>
    </FormControl>
  );
};

CardList.propTypes = {
  cards: PropTypes.arrayOf(cardType).isRequired,
  selectedCardId: PropTypes.string.isRequired,
  onCardChanged: PropTypes.func.isRequired,
};

export default CardList;
