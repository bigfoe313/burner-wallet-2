import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import Address from '../Address';
const Row = styled.div `
  border-top: 1px solid #f2f2f2;
  display: flex;
  justify-content: space-between;
  padding: 4px;
  height: 48px;

  &:first-child {
    border-top: none;
  }

  &:hover {
    background: rgba(181, 181, 181, .1);
    cursor: pointer;
  }
`;
const RightSide = styled.div `text-align: right;`;
const HistoryListRow = ({ event, account, navigateTo }) => {
    const { t } = useTranslation();
    let type;
    const asset = event.getAsset();
    if (!asset) {
        console.warn(`Could not find asset ${event.asset}`);
        return null;
    }
    switch (event.type) {
        case 'send':
            const didReceive = event.to.toLowerCase() === account.toLowerCase();
            return (React.createElement(Row, { onClick: () => navigateTo(`/receipt/${asset.id}/${event.tx}`) },
                React.createElement("div", null,
                    React.createElement("span", null,
                        React.createElement(Address, { address: didReceive ? event.from : event.to })),
                    React.createElement("div", null, didReceive ? t('Received funds') : t('Sent funds'))),
                React.createElement(RightSide, null,
                    React.createElement("div", { style: { color: didReceive ? '#28C081' : '#FD9D28' } },
                        didReceive ? '\u2199' : '\u2197',
                        asset.getDisplayValue(event.value)),
                    React.createElement("div", null, asset.name))));
        case 'exchange':
            type = 'Exchange';
            break;
        default:
            console.warn('Unknown event type', event.type);
    }
    return null;
};
export default HistoryListRow;
//# sourceMappingURL=HistoryListRow.js.map