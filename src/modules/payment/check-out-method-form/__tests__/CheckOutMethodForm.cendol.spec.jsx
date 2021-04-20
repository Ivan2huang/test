import React from 'react';
import { render } from '@testing-library/react';
import CheckOutMethodForm from '../CheckOutMethodForm.cendol';
import withIntl from '../../../../i18n/withIntlProvider';

// eslint-disable-next-line react/prop-types
jest.mock('../CheckOutMethodForm', () => props => {
  return (
    <div>
      CheckOutMethodForm
      {JSON.stringify(props)}
    </div>
  );
});

describe('CheckOutMethodForm Component', () => {
  const Component = withIntl(CheckOutMethodForm);
  it('should match to snapshot when showDisclaimer is true', () => {
    const { container } = render(
      <Component showDisclaimer addNewCardLabel="Save and Pay now" />,
    );

    expect(container).toMatchSnapshot();
  });
});
