import React from 'react';
import { PluginPageContext } from '@burner-wallet/types';
interface MatchParams {
    address: string;
    amount: string;
    message: string;
}
declare const RedirectToSend: React.FC<PluginPageContext<MatchParams>>;
export default RedirectToSend;
