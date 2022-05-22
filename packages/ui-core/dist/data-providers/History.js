import React, { useState, useEffect, Fragment } from 'react';
import { useBurner } from '../BurnerProvider';
const History = ({ account, render }) => {
    const { actions, defaultAccount } = useBurner();
    const [events, setEvents] = useState([]);
    const _account = account || defaultAccount;
    useEffect(() => {
        const _events = actions.getHistoryEvents({ account: _account });
        setEvents(_events);
        const onHistoryEventCallback = (event) => {
            if (event.to.toLowerCase() === _account.toLowerCase()
                || event.from.toLowerCase() === _account.toLowerCase()) {
                _events.unshift(event);
                setEvents(Array.from(_events));
            }
        };
        actions.onHistoryEvent(onHistoryEventCallback);
        return () => {
            actions.removeHistoryEventListener(onHistoryEventCallback);
        };
    }, [_account]);
    return (React.createElement(Fragment, null, render(events)));
};
export default History;
//# sourceMappingURL=History.js.map