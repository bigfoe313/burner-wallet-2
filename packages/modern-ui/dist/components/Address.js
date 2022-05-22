import React from 'react';
import { DataProviders } from '@burner-wallet/ui-core';
import styled from 'styled-components';
const AddressSegment = styled.span `
  display: inline-block;
  overflow: hidden;
  font-family: monospace;

  ${props => props.hidden && `
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 6em;
  `}
`;
const Address = ({ address }) => {
    return (React.createElement(DataProviders.AddressName, { address: address, render: (name) => name ? (React.createElement("span", null, name)) : (React.createElement("span", null,
            React.createElement(AddressSegment, { hidden: true }, address.substr(0, 34)),
            React.createElement(AddressSegment, null, address.substr(-8)))) }));
};
export default Address;
//# sourceMappingURL=Address.js.map