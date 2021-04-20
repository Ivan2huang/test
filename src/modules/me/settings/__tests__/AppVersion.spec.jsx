import React from 'react';
import { render } from '@testing-library/react';

import withIntl from '../../../../i18n/withIntlProvider';
import AppVersion from '../AppVersion';
import CONFIG from '../../../../constants/config';

jest.mock('../../../../constants/config', () => ({
  appVersionName: '1.0.0',
  environment: 'uat',
  defaultLanguage: 'en',
}));

jest.mock('../../../../helpers/helpers', () => ({
  formatMessage: jest.fn((intl, id, message) => message),
  isEmpty: jest.fn(
    obj => Object.entries(obj).length === 0 && obj.constructor === Object,
  ),
}));

describe('App version', () => {
  const setUp = () => {
    const Component = withIntl(AppVersion);
    return render(<Component />);
  };
  it('should match snapshot for UAT environment', () => {
    const { container } = setUp();

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot for no environment variable', () => {
    CONFIG.environment = '';
    const { container } = setUp();

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot for PRODUCTION environment', () => {
    CONFIG.environment = 'PRODUCTION';
    const { container } = setUp();

    expect(container).toMatchSnapshot();
  });
});
