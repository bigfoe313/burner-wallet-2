import React from 'react';
import { Asset } from '@burner-wallet/types';
interface BalanceProps {
    asset: Asset;
    balance: string;
}
declare const Balance: React.FC<BalanceProps>;
export default Balance;
