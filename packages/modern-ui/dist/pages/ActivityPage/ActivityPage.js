import React from 'react';
import { withBurner } from '@burner-wallet/ui-core';
import Page from '../../components/Page';
import HistoryList from '../../components/HistoryList';
const ActivityPage = ({ defaultAccount, actions }) => {
    return (React.createElement(Page, { title: "Recent Activity" },
        React.createElement(HistoryList, { account: defaultAccount, navigateTo: actions.navigateTo })));
};
export default withBurner(ActivityPage);
//# sourceMappingURL=ActivityPage.js.map