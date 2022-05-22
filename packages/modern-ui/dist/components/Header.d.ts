import React from 'react';
import { BurnerContext } from '@burner-wallet/ui-core';
interface HeaderProps extends BurnerContext {
    title?: string;
}
declare const _default: React.ComponentType<Pick<HeaderProps, "title">>;
export default _default;
