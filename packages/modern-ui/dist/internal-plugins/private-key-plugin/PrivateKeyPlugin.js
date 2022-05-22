import PrivateKeyPanel from './PrivateKeyPanel';
import translations from './translations.json';
export default class PrivateKeyPlugin {
    constructor() {
        this.id = 'private-key-internal';
    }
    initializePlugin(context) {
        context.addElement('advanced', PrivateKeyPanel);
        context.addTranslations(translations);
    }
}
//# sourceMappingURL=PrivateKeyPlugin.js.map