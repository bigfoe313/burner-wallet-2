import React from 'react';
import styled from 'styled-components';
import { withBurner, DataProviders } from '@burner-wallet/ui-core';
import Address from '../../components/Address';
import Button from '../../components/Button';
import Page from '../../components/Page';
import LineItem from '../../components/LineItem';
const { TransactionDetails } = DataProviders;
const BigEmoji = styled.div `
  font-size: 106px;
`;
const formatDate = (timestamp) => (new Date(timestamp * 1000)).toLocaleString();
const ReceiptPage = ({ match, defaultAccount, assets, t }) => (React.createElement(Page, { title: t('Transaction Receipt') },
    React.createElement(TransactionDetails, { asset: match.params.asset, txHash: match.params.txHash, render: (tx) => {
            if (!tx) {
                return (React.createElement("section", null,
                    React.createElement(BigEmoji, null, "\uD83D\uDD0E"),
                    React.createElement("div", null, "Transaction not found..."),
                    React.createElement("div", null, "The transaction may still be propogating")));
            }
            const [asset] = assets.filter((_asset) => _asset.id === tx.asset);
            const amtValue = asset
                ? `${asset.getDisplayValue(tx.value)} ${asset.name}`
                : `${tx.displayValue} (unknown asset)`;
            const date = formatDate(tx.timestamp);
            const isSent = defaultAccount.toLowerCase() === tx.from.toLowerCase();
            return (React.createElement("section", null,
                React.createElement("div", null,
                    React.createElement(LineItem, { name: t('From'), value: React.createElement(Address, { address: tx.from }) }),
                    React.createElement(LineItem, { name: t('To'), value: React.createElement(Address, { address: tx.to }) }),
                    React.createElement(LineItem, { name: t('Date'), value: date })),
                React.createElement("div", null,
                    React.createElement("h2", null, isSent ? t('Sent') : t('Received')),
                    React.createElement("div", null, amtValue)),
                tx.message && (React.createElement("div", null,
                    React.createElement("h2", null, t('Note')),
                    React.createElement("div", null, tx.message)))));
        } }),
    React.createElement(Button, { to: "/" }, t('Back'))));
export default withBurner(ReceiptPage);
//# sourceMappingURL=ReceiptPage.js.map