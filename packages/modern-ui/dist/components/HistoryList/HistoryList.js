import React from 'react';
import { DataProviders } from '@burner-wallet/ui-core';
import HistoryListRow from './HistoryListRow';
const { History } = DataProviders;
const HistoryList = ({ account, limit, navigateTo }) => {
    return (React.createElement(History, { account: account, render: (events) => {
            if (events.length === 0) {
                return (React.createElement("div", null, "No recent activity"));
            }
            return events
                .slice(0, limit)
                .map((event) => (React.createElement(HistoryListRow, { key: event.id, event: event, account: account, navigateTo: navigateTo })));
        } }));
};
HistoryList.defaultProps = {
    limit: 100,
};
export default HistoryList;
//# sourceMappingURL=HistoryList.js.map