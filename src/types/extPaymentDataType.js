import { shape, bool, string } from 'prop-types';

export default shape({
  allowSaveAsset: bool,
  allowPayOptionWithoutWallet: bool,
  paymentFootnote: string,
  paymentInstructionSufficient: string,
  paymentInstructionInsufficient: string,
});
