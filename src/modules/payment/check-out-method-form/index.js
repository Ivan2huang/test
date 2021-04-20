import DefaultCheckOutMethodForm from './CheckOutMethodForm';
import CendolCheckOutMethodForm from './CheckOutMethodForm.cendol';
import CONFIG from '../../../constants/config';

const containers = {
  cendol: CendolCheckOutMethodForm,
  balboa: DefaultCheckOutMethodForm,
};

const container = containers[CONFIG.themeCode] || DefaultCheckOutMethodForm;

export default container;
