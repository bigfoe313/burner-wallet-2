import React, { useState } from 'react';
import { useBurner } from '@burner-wallet/ui-core';
import styled from 'styled-components';
import Address from '../../components/Address';
import Button from '../../components/Button';
import Page from '../../components/Page';
import LineItem from '../../components/LineItem';
const Toolbar = styled.div `
  display: flex;
  align-items: center;
`;
const ErrorMessage = styled.div `
  flex: 1;
  color: #b91919;
  font-size: 18px;
`;
const ConfirmPage = ({ history }) => {
    const { BurnerComponents, assets, actions, pluginData, t } = useBurner();
    const { PluginElements } = BurnerComponents;
    const [error, setError] = useState(null);
    const [sending, _setSending] = useState(false);
    const setSending = (isSending) => {
        _setSending(isSending);
        actions.setLoading(isSending ? 'Sending...' : null);
    };
    if (!history.location.state) {
        history.replace('/send');
        return null;
    }
    const { to, from, ether, value, asset: assetId, message, id } = history.location.state;
    const [asset] = assets.filter(a => a.id === assetId);
    const amount = ether || asset.getDisplayValue(value);
    const send = async () => {
        setSending(true);
        setError(null);
        try {
            actions.setLoading('Sending...');
            const receipt = await asset.send({ from, to, ether, value, message });
            actions.setLoading(null);
            const redirect = pluginData.sent({
                asset: assetId,
                from,
                to,
                ether: amount,
                message,
                receipt,
                hash: receipt.transactionHash,
                id,
            });
            history.push(redirect || `/receipt/${asset.id}/${receipt.transactionHash}`);
        }
        catch (err) {
            setError(`Error: ${err.message}`);
            setSending(false);
            console.error(err);
        }
    };
    return (React.createElement(Page, { title: t('Confirm') },
        React.createElement(PluginElements, { position: "confirm-top", tx: history.location.state }),
        React.createElement(LineItem, { name: t('From') },
            React.createElement(Address, { address: from })),
        React.createElement(LineItem, { name: t('To') },
            React.createElement(Address, { address: to })),
        React.createElement(LineItem, { name: t('Amount'), value: `${amount} ${asset.name}` }),
        message && React.createElement(LineItem, { name: t('Note'), value: message }),
        React.createElement(PluginElements, { position: "confirm-middle", tx: history.location.state }),
        React.createElement(Toolbar, null,
            React.createElement(ErrorMessage, null, error),
            React.createElement(Button, { disabled: sending, onClick: () => history.goBack() }, t('Cancel')),
            React.createElement(Button, { disabled: sending, onClick: send }, t('Send'))),
        React.createElement(PluginElements, { position: "confirm-bottom", tx: history.location.state })));
};
export default ConfirmPage;
//# sourceMappingURL=ConfirmPage.js.map