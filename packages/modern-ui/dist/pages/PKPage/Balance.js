import React from 'react';
import styled from 'styled-components';
const Container = styled.div `
  display: inline-flex;
  margin: 8px;
  padding: 8px 16px 8px 8px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;
const AssetName = styled.div ``;
const Value = styled.div `
  margin-left: 8px;
  font-weight: 700;
`;
const Balance = ({ asset, balance }) => (React.createElement(Container, null,
    React.createElement(AssetName, null, asset.name),
    React.createElement(Value, null, asset.getDisplayValue(balance))));
export default Balance;
//# sourceMappingURL=Balance.js.map