import React from 'react';
import { Page, BurnerPluginData } from '@burner-wallet/types';
interface BurnerRouterProps {
    pages: Page[];
    pluginData: BurnerPluginData;
}
declare const BurnerRouter: React.FC<BurnerRouterProps>;
export default BurnerRouter;
