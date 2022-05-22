import React from 'react';
import { Asset } from '@burner-wallet/types';
interface BalancesProps {
    assets: Asset[];
    balances: string[];
}
declare const Balances: React.FC<BalancesProps>;
export default Balances;
