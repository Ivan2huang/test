import renderCheckboxGroup from '../../../utils/renderCheckboxGroup';

const renderCustomCheckboxGroup = props => {
  const { input, ...rest } = props;
  const { onChange, ...inputProps } = input;

  const handleOnChange = (selectedValues, selectedValue) => {
    const { items } = props;
    const inverseValues = items
      .filter(item => item.hasInversion)
      .map(item => item.value);

    const values = inverseValues.includes(selectedValue)
      ? selectedValues.filter(value => inverseValues.includes(value))
      : selectedValues.filter(value => !inverseValues.includes(value));

    onChange(values);
  };

  return renderCheckboxGroup({
    ...rest,
    input: {
      onChange: handleOnChange,
      ...inputProps,
    },
  });
};

export default renderCustomCheckboxGroup;
