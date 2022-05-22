import React from 'react';
import styled from 'styled-components';
import { DataProviders } from '@burner-wallet/ui-core';
import options from '../../options';
import BalanceItem from './BalanceItem';
const { AccountBalance } = DataProviders;
const Row = styled.section `
  padding: 16px 0;
  margin: 0 -16px;
  overflow-x: scroll;
  display: flex;
`;
const Scroll = styled.div `
  padding: 0 16px;
  display: flex;

  ${() => options.balanceStyle === 'stack' && `
    flex-direction: column;
    flex: 1;
  `}
`;
const BalanceRow = ({ defaultAccount, assets }) => (React.createElement(Row, null,
    React.createElement(Scroll, null, assets.map((asset) => (React.createElement(AccountBalance, { key: asset.id, asset: asset.id, account: defaultAccount, render: (data) => (React.createElement(BalanceItem, { asset: asset, balance: data && data.balance, growthRate: (data && data.growthRate) || '0' })) }))))));
export default BalanceRow;
//# sourceMappingURL=BalanceTab.js.map