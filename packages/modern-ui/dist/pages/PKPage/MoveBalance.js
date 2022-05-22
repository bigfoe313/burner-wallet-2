import React, { useState } from 'react';
import { isAllZero } from '../../lib';
import Button from '../../components/Button';
import Balances from './Balances';
const MoveBalance = ({ assets, currentAddress, newAddress, currentBalances, newBalances, onMoveToCurrent, onMoveToNew, discardOld, cancel }) => {
    const [pending, setPending] = useState(false);
    const newEmpty = isAllZero(newBalances);
    const runAndWait = (func) => async () => {
        setPending(true);
        await func();
        setPending(false);
    };
    return (React.createElement("div", null,
        React.createElement("div", null,
            React.createElement("div", null, "New Account"),
            React.createElement("div", null, newAddress),
            React.createElement(Balances, { assets: assets, balances: newBalances })),
        React.createElement("div", null,
            React.createElement("div", null, "Existing Account"),
            React.createElement("div", null, currentAddress),
            React.createElement(Balances, { assets: assets, balances: currentBalances })),
        React.createElement("div", null,
            React.createElement(Button, { onClick: cancel, disabled: pending }, "Cancel"),
            React.createElement(Button, { onClick: runAndWait(onMoveToNew), disabled: pending },
                "Move funds to new account (",
                newAddress.substr(0, 8),
                ")"),
            newEmpty ? null : (React.createElement(Button, { onClick: runAndWait(onMoveToCurrent), disabled: pending },
                "Move funds to existing account (",
                currentAddress.substr(0, 8),
                ")")),
            React.createElement(Button, { onClick: runAndWait(discardOld), disabled: pending },
                "Discard funds and switch accounts (",
                newAddress.substr(0, 8),
                ")"))));
};
export default MoveBalance;
//# sourceMappingURL=MoveBalance.js.map