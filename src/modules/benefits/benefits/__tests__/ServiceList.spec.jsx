/* eslint-disable react/prop-types */
import React from 'react';
import { render } from '@testing-library/react';

import ServiceList from '../ServiceList';
import withIntl from '../../../../i18n/withIntlProvider';
import withTheme from '../../../../themes/withThemeProvider';

jest.mock(
  '../../../../uiComponents/Typography',
  () => ({ children, ...rest }) => (
    <div {...rest}>
      {children}
      (Typography)
    </div>
  ),
);
jest.mock('../../../../helpers/helpers', () => ({
  formatMessage: jest.fn((intl, id, defaultMessage) => defaultMessage),
}));

const labelsWithoutFreeChoice = {
  panelLabel: '100% coverage',
  nonPanelLabel: '80% reimbursement',
  freeChoiceLabel: null,
};

const labelsWithFreeChoice = {
  panelLabel: null,
  nonPanelLabel: null,
  freeChoiceLabel: '80% reimbursement',
};

const emptyLabels = {
  panelLabel: '',
  nonPanelLabel: '',
  freeChoiceLabel: null,
};

describe('ServiceList Component', () => {
  const props = {
    services: [
      {
        name: 'General medical practitioner',
        metaText: 'Consultation inclusive of medications',
        annualLimit: null,
        checkpointVisits: { limit: 30, balance: 29 },
        coPayment: 50,
        description: '',
        forRelationship: null,
        nonPanelVisit: 'Up to $750 per visit',
        panelVisit: '$20 co-payment per visit',
      },
      {
        name: 'Surgeon fees',
        metaText: '',
        annualLimit: null,
        checkpointVisits: null,
        coPayment: null,
        description: 'Max limit per disability - Complex',
        forRelationship: null,
        nonPanelVisit: '$240,000',
        panelVisit: 'N/A',
      },
      {
        name: 'Surgeon fees',
        metaText: '',
        annualLimit: null,
        checkpointVisits: null,
        coPayment: null,
        description: 'Max limit per disability - Major',
        forRelationship: null,
        nonPanelVisit: '$96,000',
        panelVisit: 'N/A',
      },
      {
        name: 'Max Limit',
        metaText: '',
        annualLimit: null,
        checkpointVisits: null,
        coPayment: null,
        description: 'Consultation inclusive of medicine',
        forRelationship: null,
        nonPanelVisit: 'Up to $1,200 per visit',
        panelVisit: null,
      },
    ],
    labels: labelsWithoutFreeChoice,
    unlimitedCheckpoint: false,
  };

  it('should match snapshot', () => {
    const Component = withIntl(withTheme(ServiceList));
    const { container } = render(<Component {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot for unlimited checkpoints', () => {
    const Component = withIntl(withTheme(ServiceList));
    const { container } = render(
      <Component {...{ ...props, unlimitedCheckpoint: true }} />,
    );

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot for free choice doctor label', () => {
    const Component = withIntl(withTheme(ServiceList));
    const { container } = render(
      <Component {...{ ...props, labels: labelsWithFreeChoice }} />,
    );

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot when have data but labels', () => {
    const Component = withIntl(withTheme(ServiceList));
    const { container } = render(
      <Component {...{ ...props, labels: emptyLabels }} />,
    );

    expect(container).toMatchSnapshot();
  });
});
