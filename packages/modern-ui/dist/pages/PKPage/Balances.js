import React from 'react';
import Balance from './Balance';
const Balances = ({ assets, balances }) => {
    const nonEmptyBalances = assets
        .map((asset, i) => ({ asset, balance: balances[i] }))
        .filter(({ balance }) => balance !== '0');
    return (React.createElement("div", null, nonEmptyBalances.map(({ asset, balance }) => (React.createElement(Balance, { asset: asset, balance: balance, key: asset.id })))));
};
export default Balances;
//# sourceMappingURL=Balances.js.map