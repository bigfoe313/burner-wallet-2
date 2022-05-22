/// <reference types="react" />
import BurnerUICore, { Page } from '@burner-wallet/ui-core';
export default class ModernUI extends BurnerUICore {
    constructor(props: any);
    getPages(): Page[];
    getInternalPlugins(): (import("./internal-plugins/balance-plugin").default | import("./internal-plugins/private-key-plugin").default)[];
    burnerComponents(): import("@burner-wallet/ui-core").BurnerUIComponents;
    content(): JSX.Element;
}
