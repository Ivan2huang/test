import { connect } from 'react-redux';

import NewsLetter from './NewsLetter';
import { getNewsLetter } from './action';

export const mapStateToProps = ({ legalContents }) => ({
  newsLetter: legalContents.newsLetter.content,
});

export const mapDispatchToProps = dispatch => ({
  getNewsLetter: () => dispatch(getNewsLetter()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewsLetter);
