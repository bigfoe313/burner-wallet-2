import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
const buttonStyles = `
  display: block;
  line-height: 1.5;
  border-radius: 4px;
  text-decoration: none;
  padding: 8px 16px;
  text-align: center;
  font-size: 16px;
  min-height: 48px;
  align-items: center;
  display: flex;
  justify-content: center;
  border: none;
  color: white;
  outline: none;

  &:active {
    background: #3e30bb;
  }
`;
const StandardButton = styled.button `
  ${buttonStyles}
  color: ${props => props.color || props.theme.accentText};
  background: ${props => props.background || props.theme.accentColor};

  &:active {
    background: ${props => props.theme.accentDark};
  }

  &:disabled {
    background: ${props => props.theme.accentLight};
  }
`;
const LinkButton = styled(Link) `
  ${buttonStyles}
  color: ${props => props.color || props.theme.accentText};
  background: ${props => props.background || props.theme.accentColor};

  &:active {
    background: ${props => props.theme.accentDark};
  }

  &:disabled {
    background: ${props => props.theme.accentLight};
  }
`;
const Button = ({ to, ...props }) => {
    return to ? (React.createElement(LinkButton, Object.assign({ to: to }, props))) : (React.createElement(StandardButton, Object.assign({}, props)));
};
export default Button;
//# sourceMappingURL=Button.js.map