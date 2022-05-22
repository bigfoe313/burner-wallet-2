import React from 'react';
import { BurnerContext } from '@burner-wallet/types';
declare type HomeTabsProps = Pick<BurnerContext, 'pluginData'>;
declare const HomeTabs: React.FC<HomeTabsProps>;
export default HomeTabs;
