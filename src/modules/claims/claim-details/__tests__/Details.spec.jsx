import React from 'react';
import { render } from '@testing-library/react';
import Details from '../Details';

jest.mock(
  '../../../../uiComponents/Typography',
  // eslint-disable-next-line react/prop-types
  () => ({ children, props }) => (
    <div {...props}>
      Typography Component
      {children}
    </div>
  ),
);

jest.mock('../../../../helpers/mui', () => ({
  useBreakpoint: jest.fn(() => 'xs'),
}));

describe('Details Component', () => {
  let details;
  beforeEach(() => {
    details = [
      {
        label: 'name',
        value: 'William Brown',
      },
    ];
  });

  it('should match the snapshot with header', () => {
    const { container } = render(
      <Details details={details} header="Dummy Header" />,
    );

    expect(container).toMatchSnapshot();
  });

  it('should match the snapshot without header', () => {
    const { container } = render(<Details details={details} />);

    expect(container).toMatchSnapshot();
  });
});
