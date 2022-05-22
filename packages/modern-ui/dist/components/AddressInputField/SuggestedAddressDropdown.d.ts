import React from 'react';
import { BurnerPluginData, Account } from '@burner-wallet/types';
interface SuggestedAddressProps {
    search: string;
    anchor: HTMLElement;
    onSelect: (account: Account) => void;
    pluginData: BurnerPluginData;
}
declare const _default: React.ComponentType<Pick<SuggestedAddressProps, "onSelect" | "search" | "anchor">>;
export default _default;
