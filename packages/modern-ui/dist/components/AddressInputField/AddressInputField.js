import React, { Fragment, useState, useRef } from 'react';
import styled from 'styled-components';
import AddressInputAccount from './AddressInputAccount';
import SuggestedAddressDropdown from './SuggestedAddressDropdown';
import { SCAN_QR_DATAURI_WHITE } from '../../lib';
const ADDRESS_REGEX = /^(0x)?[0-9a-f]{40}$/i;
const ButtonClear = styled.button `
  font-size: 32px;
  color: var(--color-primary);
  background: transparent;
  border: 0px;
  outline: none;
`;
const StyledWrapper = styled.div `
  display: flex;
  flex-direction: row;
  align-items: baseline;
  position: relative;
  background-color: #ffffff;
  height: 62px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 4px;
  border: solid 1px rgb(204, 204, 204);
  border-radius: 4px;
  align-items: center;

  &:hover {
    box-shadow: 0px 2px 6px rgba(0,0,0,0.3);
  }

  &:focus {
    border-color: #000;
  }
`;
const StyledInput = styled.input `
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  color: rgb(63, 61, 75);
  font-family: "Source Sans Pro", -apple-system, sans-serif;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1;
  padding: 16px;
  outline: none;
  border: 0;
  flex: 1;
`;
const ScanButton = styled.button `
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 4px;
  height: 2rem;
  min-width: 2rem;
  margin: 0px 8px;
  border: none;
  border-radius: 4px;
  background-color: #1AAA9B;
  background-image: url("${SCAN_QR_DATAURI_WHITE}");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 70%;
  padding: 0;
  transition: all 0.15s ease;
  color: white;
  outline: none;
`;
const AddressInputField = ({ value, account, onChange, scan, disabled }) => {
    const [focused, setFocused] = useState(false);
    const anchor = useRef(null);
    let _account = account;
    if (!account && ADDRESS_REGEX.test(value)) {
        _account = { address: value };
    }
    return (React.createElement(StyledWrapper, { ref: anchor }, _account ? (React.createElement(Fragment, null,
        React.createElement(AddressInputAccount, { account: _account }),
        React.createElement(ButtonClear, { onClick: () => onChange('', null) }, '\u00D7'))) : (React.createElement(Fragment, null,
        React.createElement(StyledInput, { value: value, onChange: (e) => onChange(e.target.value, null), disabled: disabled, onFocus: () => setFocused(true), onBlur: () => setFocused(false), spellCheck: false }),
        scan && (React.createElement(ScanButton, { onClick: scan })),
        focused && anchor.current && (React.createElement(SuggestedAddressDropdown, { search: value, anchor: anchor.current, onSelect: (account) => {
                onChange(account.address, account);
                setFocused(false);
            } }))))));
};
export default AddressInputField;
//# sourceMappingURL=AddressInputField.js.map