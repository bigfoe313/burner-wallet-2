import React from 'react';
import { Link } from 'react-router-dom';
import { withBurner, DataProviders } from '@burner-wallet/ui-core';
import styled from 'styled-components';
import Page from '../../components/Page';
import HistoryList from '../../components/HistoryList';
import AppButton from './AppButton';
import BottomActions from './BottomActions';
import HomeTabs from './HomeTabs';
const PageContainer = styled(Page) `
  margin-bottom: 100px;
`;
const BottomActionsContainer = styled.div `
  position: fixed;
  bottom: 32px;
  left: 0;
  right: 0;
`;
const ViewAllButton = styled(Link) `
  background: #f2f2f2;
  border-radius: 30px;
  display: flex;
  align-items: center;
  color: #555;
  padding: 8px 12px;
  text-decoration: none;

  &:after {
    content: '\\203A';
    margin-left: 10px;
  }
`;
const ActivityHeader = styled.div `
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 8px 0 4px;
`;
const SubHeading = styled.h2 `
  font-size: var(--l2-fs);
  line-height: var(--l2-lh);
  font-weight: var(--l2-weight);
  margin: 8px 0 4px;
  color: #222222;

  ${props => props.line && `border-bottom: solid 1px #f2f2f2;`}
`;
const { PluginElements, PluginButtons } = DataProviders;
const HomePage = ({ defaultAccount, actions, pluginData, t }) => {
    return (React.createElement(PageContainer, null,
        React.createElement(PluginElements, { position: 'home-top' }),
        React.createElement(HomeTabs, { pluginData: pluginData }),
        React.createElement(PluginElements, { position: 'home-middle' }),
        React.createElement(ActivityHeader, null,
            React.createElement(SubHeading, null, t('Recent activity')),
            React.createElement(ViewAllButton, { to: '/activity' }, t('View all'))),
        React.createElement(HistoryList, { account: defaultAccount, limit: 3, navigateTo: actions.navigateTo }),
        React.createElement(PluginButtons, { position: "apps", component: AppButton },
            React.createElement(SubHeading, { line: true }, t('Apps'))),
        React.createElement(AppButton, { title: t('Settings'), to: "/advanced" }),
        React.createElement(BottomActionsContainer, null,
            React.createElement(BottomActions, { actions: actions }))));
};
export default withBurner(HomePage);
//# sourceMappingURL=HomePage.js.map