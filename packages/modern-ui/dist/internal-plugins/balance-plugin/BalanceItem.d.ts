import React from 'react';
import { Asset } from '@burner-wallet/types';
interface BalanceItemProps {
    asset: Asset;
    balance?: string | null;
    growthRate: string;
}
declare const BalanceItem: React.FC<BalanceItemProps>;
export default BalanceItem;
