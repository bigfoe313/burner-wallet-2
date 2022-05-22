import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../../components/Button';
const StyledWrapper = styled.div `
  display: flex;
  margin: 8px 0;
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
  transition: all 1s;
`;
const StyledButton = styled(Button) `
  flex: 1;
  transition: all 1s;
`;
const ImportPK = ({ onImport }) => {
    const [showField, setShowField] = useState(false);
    const [pk, setPk] = useState('');
    return (React.createElement(StyledWrapper, null,
        React.createElement(StyledInput, { value: pk, onChange: (e) => setPk(e.target.value), style: showField ? undefined : { width: '0', padding: '0' } }),
        React.createElement(StyledButton, { onClick: showField ? () => onImport(pk) : () => setShowField(true), disabled: showField && pk.length < 64 }, "Import")));
};
export default ImportPK;
//# sourceMappingURL=ImportPK.js.map