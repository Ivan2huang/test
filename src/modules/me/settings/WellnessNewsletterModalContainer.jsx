import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import WellnessNewsletterModal from './WellnessNewsletterModal';
import { getNewsLetter as getNewsLetterAction } from '../../legal/newsletter/action';

const mapStateToProps = ({ me, legalContents: { newsLetter } }) => {
  const {
    member: { profile },
  } = me;
  const { preferredLocale } = profile;
  const { content } = newsLetter;

  return {
    content: content[preferredLocale],
  };
};

const mapDispatchToProps = {
  getNewsLetter: getNewsLetterAction,
};

const WellnessNewsletterModalContainer = ({
  getNewsLetter,
  open,
  ...props
}) => {
  useEffect(() => {
    if (open) {
      getNewsLetter();
    }
  }, [open]);

  return <WellnessNewsletterModal open={open} {...props} />;
};

WellnessNewsletterModalContainer.propTypes = {
  getNewsLetter: PropTypes.func.isRequired,
  content: PropTypes.string,
  open: PropTypes.bool,
};

WellnessNewsletterModalContainer.defaultProps = {
  content: '',
  open: false,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WellnessNewsletterModalContainer);
