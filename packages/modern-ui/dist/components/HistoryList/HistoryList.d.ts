import React from 'react';
interface HistoryListProps {
    account: string;
    limit?: number;
    navigateTo: (path: string) => void;
}
declare const HistoryList: React.FC<HistoryListProps>;
export default HistoryList;
