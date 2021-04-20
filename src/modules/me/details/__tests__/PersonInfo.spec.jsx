/* eslint-disable react/prop-types */

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import PersonInfo from '../PersonInfo';
import withTheme from '../../../../themes/withThemeProvider';
import withIntl from '../../../../i18n/withIntlProvider';
import { navigateTo } from '../../../../helpers/helpers';

jest.mock('../../../../helpers/helpers', () => ({
  navigateTo: jest.fn(),
}));

jest.mock('../../../../helpers/mui', () => ({
  useBreakpoint: jest.fn(() => 'xs'),
}));

jest.mock(
  '../../../../uiComponents/Typography',
  () => ({ children, ...rest }) => <div {...rest}>{children}</div>,
);

describe('Person Info Component', () => {
  it('should display invited text below button', () => {
    const props = {
      fields: [],
      showInviteBtn: true,
      memberId: '2',
      isDisabled: true,
      buttonLabel: 'You have successfully invited him/her.',
    };
    const Component = withIntl(withTheme(PersonInfo));
    const { getByText } = render(<Component {...props} />);

    const Text = getByText(/You have successfully invited him\/her./);

    expect(Text).toBeDefined();
  });

  it('should display invalid message', () => {
    const props = {
      showInviteBtn: true,
      memberId: '2',
      isDisabled: true,
      buttonLabel: 'You have successfully invited him/her.',
      fields: [
        {
          label: 'Name',
          value: 'Bob Tan',
          editable: false,
          addable: false,
        },
      ],
    };
    const Component = withIntl(withTheme(PersonInfo));
    const { getByText } = render(<Component {...props} />);

    const Text = getByText(/You have successfully invited him\/her./);

    expect(Text).toBeDefined();
  });

  it('should match the snapshot', () => {
    const props = {
      showInviteBtn: true,
      memberId: '2',
      isDisabled: true,
      buttonLabel: 'You have successfully invited him/her.',
      fields: [
        {
          label: 'Name',
          value: 'Bob Tan',
          editable: false,
          addable: false,
        },
      ],
    };
    const Component = withIntl(withTheme(PersonInfo));
    const { container } = render(<Component {...props} />);
    expect(container).toMatchSnapshot();
  });

  it('should match the snapshot for dependent', () => {
    const props = {
      fullName: 'dummyUser',
      membershipNumber: '123',
      relationship: 'Spouse',
      hasLoggedIn: true,
      fields: [
        {
          label: 'Name',
          value: 'Bob Tan',
          editable: false,
          addable: false,
        },
      ],
    };
    const Component = withIntl(withTheme(PersonInfo));
    const { container } = render(<Component {...props} />);
    expect(container).toMatchSnapshot();
  });

  it('should navigate to invite page when invite button clicked', () => {
    const props = {
      memberId: '100',
      buttonLabel: 'Invite to Benefit',
      isDisabled: false,
      showInviteBtn: true,
      fields: [
        {
          label: 'Name',
          value: 'Bob Tan',
          editable: false,
          addable: false,
        },
      ],
    };

    const Component = withIntl(withTheme(PersonInfo));
    const { getByText } = render(<Component {...props} />);

    const InviteButton = getByText(/Invite to/);
    fireEvent.click(InviteButton, {});

    expect(navigateTo).toHaveBeenCalledWith('/me/details/invite', {
      memberId: '100',
    });
  });
});
