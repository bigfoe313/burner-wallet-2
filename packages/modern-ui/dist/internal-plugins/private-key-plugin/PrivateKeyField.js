import React, { useState } from 'react';
import styled from 'styled-components';
import Clipboard from '../../components/Clipboard';
import Button from '../../components/Button';
const StyledWrapper = styled.div `
  & {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    position: relative;
  }
`;
const StyledInput = styled.input `
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: none;

  background-color: white;
  padding: 16px;
  width: 100%;
  height: 3rem;
  border: 1px;
  border-color: grey;
  border-radius: 1px;
  font-family: sans-serif;
  font-size: 1rem;
  outline: none;
`;
const ButtonContainer = styled.div `
  margin-right: 8px;
  display: flex;
  position: absolute;
  right: 0px;
`;
const PrivateKeyField = ({ privateKey }) => {
    const [visibleKey, setVisibleKey] = useState(false);
    return (React.createElement(StyledWrapper, null,
        React.createElement(StyledInput, { readOnly: true, value: privateKey, type: visibleKey ? 'text' : 'password', onFocus: () => setVisibleKey(true), onBlur: () => setVisibleKey(false) }),
        React.createElement(ButtonContainer, null,
            React.createElement(Clipboard, { text: privateKey }, (isCopied) => (React.createElement(Button, null, !isCopied ? 'Copy' : 'Copied!'))))));
};
export default PrivateKeyField;
//# sourceMappingURL=PrivateKeyField.js.map