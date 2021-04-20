import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Dropdown from '../Dropdown';

describe('Dropdown UI Component', () => {
  let props;

  beforeEach(() => {
    props = {
      label: 'test label',
      items: [
        { id: '1', name: 'test1' },
        { id: '2', name: 'test2' },
        { id: '3', name: 'test3' },
      ],
      displayProperty: 'name',
      valueProperty: 'id',
      value: '1',
      testId: 'test-dropdown',
      onChange: jest.fn(),
      onBlur: jest.fn(),
    };
  });

  it('should match snapshot', () => {
    const { container } = render(<Dropdown {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot for disabled dropdown', () => {
    const { container } = render(<Dropdown {...props} disabled />);

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot for loading dropdown', () => {
    const { container } = render(<Dropdown {...props} loading />);

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot for non group menu items', () => {
    const { container } = render(<Dropdown {...props} />);

    const dropdown = container.querySelector('#select-test-dropdown');
    fireEvent.click(dropdown);

    expect(document.querySelector('ul')).toMatchSnapshot();
  });

  it('should match snapshot for group menu items', () => {
    props.valueProperty = 'claimId';
    props.value = 'MO-GP';
    props.items = {
      Outpatient: [
        {
          claimId: 'MO-GP',
          claimName: 'General Medical Practitioner',
        },
      ],
      Wellness: [
        {
          claimId: 'GH-MS',
          claimName: 'Dental Care',
        },
        {
          claimId: 'MO-GS',
          claimName: 'General Medical Practitioner',
        },
      ],
    };
    const { container } = render(<Dropdown {...props} group />);

    const dropdown = container.querySelector('#select-test-dropdown');
    fireEvent.click(dropdown);

    expect(document.querySelector('ul')).toMatchSnapshot();
  });

  it('should match snapshot for error', () => {
    const newProps = {
      ...props,
      error: true,
      errorMessage: 'Invalid value',
    };

    const { container } = render(<Dropdown {...newProps} />);

    expect(container).toMatchSnapshot();
  });

  it('should call onChange callback on click of menu item', () => {
    const { container, getByText } = render(<Dropdown {...props} />);
    const dropdown = container.querySelector('#select-test-dropdown');

    fireEvent.click(dropdown);
    const item = getByText('test3');
    fireEvent.click(item);

    expect(props.onChange).toHaveBeenCalled();
  });

  it('should call onBlur callback on blur', () => {
    const { container } = render(<Dropdown {...props} />);

    const dropdown = container.querySelector('#select-test-dropdown');
    fireEvent.blur(dropdown);

    expect(props.onBlur).toHaveBeenCalled();
  });
});
