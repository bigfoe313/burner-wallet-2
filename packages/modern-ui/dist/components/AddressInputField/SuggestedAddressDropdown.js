import React, { useState, useEffect } from 'react';
import { withBurner } from '@burner-wallet/ui-core';
import styled from 'styled-components';
import Popup from '../Popup';
import AddressInputAccount from './AddressInputAccount';
const DropdownContainer = styled.div `
  background: #eeeeee;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
  border: solid 1px #dbdbdb;
  border-top: none;
`;
const SuggestionContainer = styled.div `
  &:hover {
    background: #e1deff;
  }
`;
const SuggestedAddressDropdown = ({ search, anchor, pluginData, onSelect }) => {
    const [accounts, setAccounts] = useState([]);
    useEffect(() => {
        let canceled = false;
        Promise.all(pluginData.accountSearches.map(searchFn => searchFn(search)))
            .then((_accounts) => {
            if (!canceled) {
                const flattenedAccounts = Array.prototype.concat(..._accounts);
                setAccounts(flattenedAccounts);
            }
        });
        return () => {
            canceled = true;
        };
    }, [search]);
    if (accounts.length === 0) {
        return null;
    }
    return (React.createElement(Popup, { anchor: anchor },
        React.createElement(DropdownContainer, null, accounts.map((account) => (React.createElement(SuggestionContainer, { key: account.address, onMouseDown: () => onSelect(account) },
            React.createElement(AddressInputAccount, { account: account })))))));
};
export default withBurner(SuggestedAddressDropdown);
//# sourceMappingURL=SuggestedAddressDropdown.js.map