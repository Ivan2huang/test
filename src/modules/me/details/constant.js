import CONFIG from '../../../constants/config';
import {
  CATEGORY_SPOUSE,
  CATEGORY_CHILD,
} from '../../../helpers/relationships';

export const LOGGED_IN_MESSAGE = {
  id: 'me.tabs.myDetails.dependentAlreadyInvited',
  defaultMessage: 'You have successfully invited him/her.',
};

export const INVALID_MESSAGES = {
  [CATEGORY_SPOUSE]: [
    {
      id: 'me.tabs.myDetails.spouseDependentInvalidAgeRange',
      defaultMessage:
        'Your spouse must be {minSpouseAge} years old and above to access the dependent app and website for HSBC Benefits',
    },
    {
      minSpouseAge: CONFIG.minSpouseAge,
    },
  ],

  [CATEGORY_CHILD]: [
    {
      id: 'me.tabs.myDetails.childDependentInvalidAgeRange',
      defaultMessage:
        'Your child must be {minChildAge}-{maxChildAge} years old to access the dependent app and website for HSBC Benefits',
    },
    {
      minChildAge: CONFIG.minChildAge,
      maxChildAge: CONFIG.maxChildAge,
    },
  ],
};
