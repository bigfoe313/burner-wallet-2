import React, { Fragment } from 'react';
import styled from 'styled-components';
import { DataProviders } from '@burner-wallet/ui-core';
import Button from '../../components/Button';
import { randomHex } from '../../lib';
import ImportPK from './ImportPK';
import PrivateKeyField from './PrivateKeyField';
const AdvancedButton = styled(Button) `
  margin-top: 16px;
  width: 100%;
`;
const { AccountKeys } = DataProviders;
const PrivateKeyPanel = ({ actions, defaultAccount, t }) => {
    return (React.createElement("section", null,
        React.createElement("h2", null, "Private Key"),
        React.createElement(AccountKeys, { account: defaultAccount, render: (keys) => {
                if (keys) {
                    return (React.createElement(Fragment, null,
                        React.createElement(PrivateKeyField, { privateKey: keys.privateKey }),
                        React.createElement(ImportPK, { onImport: (newPk) => actions.safeSetPK(newPk) }),
                        React.createElement(AdvancedButton, { onClick: () => actions.safeSetPK(randomHex(64)) }, t('Burn Account'))));
                }
                if (actions.canCallSigner('writeKey', defaultAccount)) {
                    return (React.createElement(AdvancedButton, { onClick: () => actions.safeSetPK(randomHex(64)) }, t('Burn Account')));
                }
                return (React.createElement("div", null, "Private key unavailable while using a web3 browser such as Metamask"));
            } })));
};
export default PrivateKeyPanel;
//# sourceMappingURL=PrivateKeyPanel.js.map