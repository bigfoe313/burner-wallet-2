import React, { useState } from 'react';
import { withBurner, DataProviders } from '@burner-wallet/ui-core';
import styled from 'styled-components';
import AddressInputField from '../../components/AddressInputField';
import AssetSelector from '../../components/AssetSelector';
import Button from '../../components/Button';
import Page from '../../components/Page';
const FormContainer = styled.div `
  flex-direction: column;
  flex: 1;
  display: flex;
  margin-bottom: 10px;
`;
const SendInstruction = styled.h2 `
  margin: 0;
  font-size: 14px;
`;
const AmountWrapper = styled.div `
  display: flex;
  align-items: center;
  flex-direction: column;
  flex: 1;
  text-align: center;
`;
const AmountInput = styled.input `
  display: flex;
  align-content: center;
  width: 100%;
  height: 100%;
  border: 0;
  outline: 0;
  font-size: 80px;;
  background: none;
  box-shadow: none !important;
  text-align: center;
  padding: 0;
  font-family: var(--main-font);
`;
const MaxButton = styled(Button) `
  text-align: center;
  border-radius: 100px;
  font-size: 18px;
  color: var(--color-primary);
  background: var(--color-tertiary);
  padding: 4px 16px;
  margin: 8px 0px;
  border: 0px;
  text-transform: uppercase;
  height: 32px;

  &:hover {
    background: #aef4ed;
  }

  &:focus {
    outline: none;
  }

  &:before {
    background: var(--color-tertiary);
  }
`;
const SendButton = styled(Button) `
  background: var(--color-primary);
  color: var(--color-tertiary);
  width: 100%;

  &:before {
    background: var(--color-primary);
    color: var(--color-tertiary);
  }

  &:disabled {
    opacity: 1;
    background: var(--color-disabled);
  }
`;
const TransferMessageInput = styled.input `
  background-color: transparent;
  outline: none;
  border: none;
  width: 100%;
  margin-left: 16px;
  text-align: right;
  font-size: 18px;
  transition: 0.15s ease-in-out;
  font-family: var(--main-font);
  padding: 16px;
  height: 3rem;
  border-radius: 2px;

  &:hover {
    background: white;
  }

  &:focus {
    background: hsla(0, 0%, 90%, 1);
    text-align: center;
  }
`;
const HowMuch = styled.h3 `
  margin: 8px 0 0;
  font-size: 16px;
`;
const Wrapper = styled.div `
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
`;
const MessageField = styled.div `
  display: flex;
`;
const { AccountBalance } = DataProviders;
const SendPage = ({ actions, assets, location, t }) => {
    const [to, setTo] = useState(location.state && location.state.to || '');
    const [account, setAccount] = useState(null);
    const [asset, setAsset] = useState(assets[0]);
    const [val, setVal] = useState({ value: '0', maxVal: null });
    const [message, setMessage] = useState('');
    const { value, maxVal } = val;
    const setValue = (value, maxVal = null) => setVal({ value, maxVal });
    const scan = () => actions.scanQRCode().then(result => setTo(result)).catch(() => null);
    const send = () => {
        const sendProps = {
            to,
            asset: asset.id,
            message: message.length > 0 ? message : null
        };
        if (maxVal) {
            sendProps.value = maxVal;
        }
        else {
            sendProps.ether = value;
        }
        actions.send(sendProps);
    };
    const canSend = to.length === 42 && to && parseFloat(value) > 0;
    return (React.createElement(Page, { title: t('Send') },
        React.createElement(AccountBalance, { asset: asset, render: (data) => {
                const exceedsBalance = !!data
                    && parseFloat(value) > parseFloat(data.displayMaximumSendableBalance);
                return (React.createElement(Wrapper, null,
                    React.createElement(FormContainer, null,
                        React.createElement("div", null,
                            React.createElement(SendInstruction, null, t('Send To')),
                            React.createElement(AddressInputField, { value: to, account: account, onChange: (_to, _account) => {
                                    setTo(_to);
                                    setAccount(_account);
                                }, scan: scan })),
                        React.createElement(AmountWrapper, null,
                            React.createElement(HowMuch, null, t('How much do you want to send?')),
                            React.createElement(AmountInput, { type: "number", placeholder: "0", value: value, onChange: (e) => setValue(e.target.value.replace(/^0+(?=\d)/, '')), min: "0" }),
                            React.createElement(MaxButton, { onClick: () => {
                                    if (data) {
                                        setValue(data.displayMaximumSendableBalance, data.maximumSendableBalance);
                                    }
                                } }, "Max"),
                            React.createElement(AssetSelector, { selected: asset, assets: assets, onChange: (newAsset) => setAsset(newAsset) })),
                        asset.supportsMessages() && (React.createElement(MessageField, null,
                            React.createElement("h3", null,
                                t('Note'),
                                ":"),
                            React.createElement(TransferMessageInput, { placeholder: "Optional", value: message, onChange: (e) => setMessage(e.target.value) })))),
                    React.createElement(SendButton, { onClick: () => send(), disabled: !canSend || exceedsBalance }, t('Send'))));
            } })));
};
export default withBurner(SendPage);
//# sourceMappingURL=SendPage.js.map