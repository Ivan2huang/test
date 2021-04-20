import 'jest-dom/extend-expect';
import '@testing-library/react/cleanup-after-each';

global.mockPropsCapture = props => {
  return Object.entries(props).map(([key, value]) => {
    let actualValue;
    switch (typeof value) {
      case 'string':
        actualValue = value;
        break;
      case 'function':
        actualValue = `function ${key}`;
        break;
      case 'object':
        actualValue = String(value);
        break;
      default:
        actualValue = value;
    }
    return `${key} = ${actualValue}`;
  });
};
