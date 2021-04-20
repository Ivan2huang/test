import SvgIcon from '@material-ui/core/SvgIcon';
import React from 'react';
import * as PropTypes from 'prop-types';
import colors from '../../themes/colors';
import { ICON_SIZE } from '../../themes/theme';

const Settings = ({ width, height, ...rest }) => (
  <SvgIcon style={{ width, height }} {...rest}>
    <path
      d="M21.8347 9.32267C21.6107 8.49867 21.28 7.69867 20.8453 6.94133L21.7587 4.78933L19.2107 2.24L17.0587 3.15333C16.3 2.72 15.5013 2.388 14.676 2.164L13.8027 0H10.1973L9.32267 2.16533C8.49867 2.388 7.69867 2.72 6.94133 3.15333L4.78933 2.24L2.24 4.78933L3.15333 6.94133C2.72 7.69867 2.388 8.49867 2.16533 9.32267L0 10.1973V13.8013L2.16533 14.676C2.388 15.5013 2.72 16.3 3.15467 17.0587L2.24 19.2107L4.78933 21.76L6.94133 20.8467C7.7 21.2813 8.49867 21.612 9.324 21.836L10.1973 24H13.8013L14.676 21.836C15.5 21.612 16.3 21.2813 17.0587 20.8467L19.2107 21.76L21.76 19.2107L20.8467 17.0587C21.2813 16.3 21.612 15.5013 21.836 14.676L24 13.8027V10.1973L21.8347 9.32267ZM21.236 13.1933L20.4987 13.4907L20.2907 14.2587C20.1027 14.952 19.8227 15.6267 19.4573 16.264L19.064 16.9533L19.3733 17.684L19.8653 18.8427L18.8427 19.8653L17.6853 19.3733L16.9547 19.0627L16.2653 19.4573C15.628 19.8213 14.9533 20.1027 14.2587 20.2907L13.492 20.4987L13.1947 21.2347L12.7227 22.4H11.2773L10.8067 21.236L10.5093 20.5L9.74133 20.292C9.04667 20.104 8.37333 19.8227 7.736 19.4587L7.04667 19.064L6.31467 19.3733L5.15733 19.8653L4.13467 18.8427L4.62667 17.6853L4.93733 16.9547L4.54267 16.2653C4.17867 15.628 3.89733 14.9533 3.70933 14.2587L3.50133 13.492L2.764 13.1933L1.6 12.7227V11.2773L2.764 10.8067L3.5 10.5093L3.708 9.74267C3.896 9.048 4.17733 8.37333 4.54133 7.736L4.936 7.04667L4.62667 6.316L4.13467 5.15733L5.15733 4.13467L6.316 4.62667L7.04667 4.93733L7.736 4.54267C8.37333 4.17867 9.048 3.89867 9.74267 3.70933L10.5093 3.50133L10.8067 2.76533L11.2773 1.6H12.724L13.1947 2.764L13.492 3.5L14.2587 3.708C14.9533 3.896 15.628 4.17733 16.2653 4.54133L16.9547 4.936L17.6853 4.62533L18.844 4.13333L19.8667 5.156L19.3733 6.316L19.0627 7.04667L19.4573 7.736C19.8213 8.372 20.1013 9.04667 20.2907 9.74133L20.4987 10.508L21.236 10.8053L22.4 11.2773V12.7227L21.236 13.1933ZM12 6.4C10.504 6.4 9.09733 6.98267 8.04 8.04C6.98267 9.09733 6.4 10.504 6.4 12C6.4 13.496 6.98267 14.9027 8.04 15.96C9.09733 17.0173 10.504 17.6 12 17.6C13.496 17.6 14.9013 17.0173 15.96 15.96C17.0187 14.9027 17.6 13.496 17.6 12C17.6 10.504 17.0173 9.09733 15.96 8.04C14.9027 6.98267 13.496 6.4 12 6.4ZM14.828 14.828C14.048 15.6093 13.024 16 12 16C10.976 16 9.952 15.6093 9.17067 14.828C7.60933 13.2667 7.60933 10.7333 9.17067 9.172C9.952 8.39067 10.976 8 12 8C13.024 8 14.048 8.39067 14.828 9.172C16.3907 10.7333 16.3907 13.2667 14.828 14.828Z"
      fill={colors.icon || colors.mediumEmphasis}
    />
  </SvgIcon>
);

Settings.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};

Settings.defaultProps = {
  width: ICON_SIZE,
  height: ICON_SIZE,
};

export default Settings;
