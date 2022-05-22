import React from 'react';
import { Asset } from '@burner-wallet/types';
interface MoveBalanceProps {
    assets: Asset[];
    currentAddress: string;
    newAddress: string;
    currentBalances: string[];
    newBalances: string[];
    onMoveToCurrent: () => Promise<void>;
    onMoveToNew: () => Promise<void>;
    discardOld: () => Promise<void>;
    cancel: () => void;
}
declare const MoveBalance: React.FC<MoveBalanceProps>;
export default MoveBalance;
