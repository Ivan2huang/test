import React from 'react';
import { render } from '@testing-library/react';

import createProductTableColumnDefs from '../ProductTableColumnDefs';

jest.mock(
  '../../../../uiComponents/Typography',
  // eslint-disable-next-line react/prop-types
  () => ({ children, ...rest }) => (
    <div {...rest}>
      {children}
      (Typography)
    </div>
  ),
);

const formatMessage = jest.fn(({ defaultMessage }, value) => {
  if (!value) {
    return defaultMessage;
  }

  return defaultMessage.replace(/\{.*?\}/g, match => {
    return value[match.split(/{|}/g).join('')];
  });
});

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

const awaitCreateProductTableColumnDefs = createProductTableColumnDefs({
  formatMessage,
});
const defsOutpatient = awaitCreateProductTableColumnDefs(
  'Outpatient',
  labelsWithoutFreeChoice,
  false,
);

const defsOutpatientWithUnlimitedCheckpointes = awaitCreateProductTableColumnDefs(
  'Outpatient',
  labelsWithoutFreeChoice,
  true,
);

const defsHospitalSurgical = awaitCreateProductTableColumnDefs(
  'HospitalSurgical',
  labelsWithoutFreeChoice,
  false,
);
const defWellnessFlexibleSpending = awaitCreateProductTableColumnDefs(
  'WellnessFlexibleSpending',
  labelsWithFreeChoice,
  false,
);

describe('ProductTableColumnsDefinition', () => {
  const row = {
    name: 'test name',
    metaText: 'meta text',
    panelVisit: 'panel visit',
    nonPanelVisit: 'non panel visit',
    checkpointVisits: {
      limit: 5,
      balance: 4,
    },
    description: 'description',
  };

  it('should provide the respective column value', () => {
    const expected = [
      {
        name: 'Service',
        pivotColumn: true,
        template: expect.anything(),
      },
      {
        name: 'Panel doctor 100% coverage',
        template: expect.anything(),
      },
      {
        name: 'Non panel doctor 80% reimbursement',
        template: expect.anything(),
      },
      {
        name: 'Checkpoint visits per year¹',
        template: expect.anything(),
      },
    ];
    expect(defsOutpatient).toEqual(expected);
  });

  it('should provide the template text for service column ', () => {
    const { container } = render(defsOutpatient[0].template(row));
    expect(container).toMatchSnapshot();
  });

  it('should provide the template text for panel doctor column ', () => {
    expect(defsOutpatient[1].template(row)).toBe('panel visit');
  });

  it('should provide the template text for non panel doctor column ', () => {
    expect(defsOutpatient[2].template(row)).toBe('non panel visit');
  });
  it('should provide the template text for free choice doctor column ', () => {
    expect(defWellnessFlexibleSpending[2].template(row)).toBe(
      'non panel visit',
    );
  });

  it('should provide the empty text for checkpoints when checkpoint is empty', () => {
    expect(
      defsOutpatient[3].template({
        checkpointVisits: null,
      }),
    ).toBe('');
  });

  it('should provide the template text for checkpoints', () => {
    expect(defsOutpatient[3].template(row)).toBe('4 out of 5 left');
  });

  it('should provide the template text for checkpoints with unlimited checkpoints', () => {
    expect(defsOutpatientWithUnlimitedCheckpointes[3].template(row)).toBe(
      'Unlimited',
    );
  });

  it('should provide the template text for description', () => {
    expect(defsHospitalSurgical[1].template(row)).toBe('description');
  });

  it('should provide template text for description column when description is null', () => {
    expect(
      defsHospitalSurgical[1].template({
        ...row,
        description: null,
      }),
    ).toMatchSnapshot();
  });

  it('should provide empty string if description is not present', () => {
    const data = {
      name: 'test name',
      metaText: 'meta text',
      panelVisit: 'panel visit',
      nonPanelVisit: 'non panel visit',
      checkpointVisits: {
        limit: 5,
        balance: 4,
      },
    };
    expect(defsHospitalSurgical[1].template(data)).toBe('');
  });
});
