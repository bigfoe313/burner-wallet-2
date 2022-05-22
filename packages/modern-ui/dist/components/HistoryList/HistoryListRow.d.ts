import React from 'react';
import { HistoryEvent } from '@burner-wallet/types';
interface HistoryListEventProps {
    event: HistoryEvent;
    account: string;
    navigateTo: (path: string) => void;
}
declare const HistoryListRow: React.FC<HistoryListEventProps>;
export default HistoryListRow;
