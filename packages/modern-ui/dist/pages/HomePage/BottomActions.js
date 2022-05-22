import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SCAN_QR_DATAURI } from '../../lib';
const ScanButton = styled.button `
  height: 72px;
  width: 72px;
  border-radius: 50%;
  border: none;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
  z-index: 20;
  outline: none;
  margin: -12px 0;

  background-image: url("${SCAN_QR_DATAURI}");
  background-size: 50%;
  background-repeat: no-repeat;
  background-position: center;
`;
const BottomButton = styled(Link) `
  display: flex;
  color: var(--color-primary);
  font-size: 18px;
  z-index: 10;
  text-decoration: none;
  height: 48px;
  align-items: center;
  flex: 1;
  justify-content: center;

  &:hover {
    background: #edfcfb;
  }
`;
const Bar = styled.div `
  display: flex;
  align-items: center;
  margin: 0 16px;

  box-shadow: rgba(0, 0, 0, 0.1) 0px 8px 16px;
  border: solid 1px rgb(238, 238, 238);
  border-radius: 8px;
  background: #fcfcfc;
`;
const BottomActions = ({ actions }) => {
    const { t } = useTranslation();
    return (React.createElement(Bar, null,
        React.createElement(BottomButton, { to: "/receive" }, t('Receive')),
        React.createElement(ScanButton, { onClick: actions.openDefaultQRScanner }),
        React.createElement(BottomButton, { to: "/send" }, t('Send'))));
};
export default BottomActions;
//# sourceMappingURL=BottomActions.js.map