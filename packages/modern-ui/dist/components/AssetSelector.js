import React from 'react';
import { DataProviders, useBurner } from '@burner-wallet/ui-core';
import styled from 'styled-components';
import Dropdown from './Dropdown';
const { Assets, AccountBalance } = DataProviders;
const AssetElementWrapper = styled.div `
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Balance = styled.div `
  margin-left: 8px;
`;
const AssetElement = ({ item }) => (React.createElement(AssetElementWrapper, null,
    React.createElement("div", null, item.name),
    React.createElement(AccountBalance, { asset: item, render: (data) => data && (React.createElement(Balance, null, data.usdBalance ? `$${data.usdBalance}` : data.displayBalance)) })));
const AssetSelector = ({ selected, assets, onChange, network, disabled }) => {
    const { assets: _assets } = useBurner();
    let filteredAssets = assets || _assets;
    if (network) {
        filteredAssets = filteredAssets.filter((asset) => asset.network === network);
    }
    return (React.createElement(Dropdown, { options: filteredAssets, selected: selected, onChange: onChange, disabled: disabled, itemComponent: AssetElement }));
};
export default AssetSelector;
//# sourceMappingURL=AssetSelector.js.map