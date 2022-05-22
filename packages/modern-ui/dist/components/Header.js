import React from 'react';
import _styled from 'styled-components';
import { Route } from 'react-router-dom';
import { withBurner } from '@burner-wallet/ui-core';
import { SCAN_QR_DATAURI } from '../lib';
const styled = _styled;
const HeaderElement = styled.header `
  display: flex;
  height: 64px;
  align-items: center;
  justify-content: space-between;
  margin: 0 ${props => props.theme.pageMargin};
`;
const TitleContainer = styled.div `
  display: flex;
  flex-direction: column;

  ${props => props.theme.logo && `
    background-image: url(${props.theme.logo});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: 4px center;
    padding-left: 44px;
  `}
`;
const Title = styled.h1 `
  font-size: 24px;
  margin: 0;
`;
const Subtitle = styled.div `
  font-size: 12px;
`;
const RightSide = styled.div `
  display: flex;
  align-items: center;
`;
const HeaderAccount = styled.div `
  font-size: 14px;
  color: rgba(0, 0, 0, 0.7);
`;
const MiniQRButton = styled.button `
  background: url("${SCAN_QR_DATAURI}");
  background-size: contain;
  background-size: 75%;
  background-position: center;
  background-repeat: no-repeat;
  margin-left: 8px;
  height: 40px;
  width: 40px;
  outline: none;
`;
const Header = ({ defaultAccount, title, actions }) => (React.createElement(HeaderElement, null,
    React.createElement(TitleContainer, null,
        React.createElement(Title, null, title || 'Burner Wallet'),
        title && title !== 'Burner Wallet' && (React.createElement(Subtitle, null, "Powered by Burner Wallet"))),
    React.createElement(RightSide, null,
        React.createElement(HeaderAccount, { onClick: () => actions.navigateTo('/receive') }, defaultAccount.substr(2, 8)),
        React.createElement(Route, { exact: true, path: "/" }, ({ match }) => match ? null : (React.createElement(MiniQRButton, { onClick: actions.openDefaultQRScanner }))))));
export default withBurner(Header);
//# sourceMappingURL=Header.js.map