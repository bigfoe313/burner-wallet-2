import React from 'react';
import styled from 'styled-components';
import { withBurner } from '@burner-wallet/ui-core';
import QRCode from 'qrcode.react';
import Clipboard from '../../components/Clipboard';
import Button from '../../components/Button';
import Page from '../../components/Page';
const QRContainer = styled.div `
  width: 80%;
  margin: auto;
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;

  & svg {
    flex: 1;
    width: initial;
    height: initial;
  }
`;
const AddressInputContainer = styled.div `
  display: flex;
  background-color: white;
  border: 1px;
  border-color: grey;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 4px;
  margin: 8px 0;
  align-items: center;
`;
const CopyButton = styled(Button) `
  height: 38px;
  margin: 4px;
`;
const StyledInput = styled.input `
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  padding: 16px 0 16px 16px;
  font-family: sans-serif;
  font-size: 1rem;
  min-width: 0;
  background: transparent;
  border: none;
  flex: 1;
`;
const ReceivePage = ({ defaultAccount, t }) => {
    return (React.createElement(Page, { title: t("Your Address") },
        React.createElement("div", null,
            t('Scan this code with another wallet to receive tokens'),
            "."),
        React.createElement(QRContainer, null,
            React.createElement(QRCode, { value: defaultAccount, renderAs: "svg" })),
        React.createElement(AddressInputContainer, null,
            React.createElement(StyledInput, { readOnly: true, value: defaultAccount, onClick: (e) => e.target.setSelectionRange(0, 42) }),
            React.createElement(Clipboard, { text: defaultAccount }, isCopied => (React.createElement(CopyButton, { disabled: isCopied }, "Copy")))),
        React.createElement(Button, { disabled: true }, "Create Request")));
};
export default withBurner(ReceivePage);
//# sourceMappingURL=ReceivePage.js.map