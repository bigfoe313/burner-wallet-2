import BalanceTab from './BalanceTab';
export default class BalancePlugin {
    initializePlugin(context) {
        context.addElement('home-tab', BalanceTab, { title: 'Cash' });
    }
}
//# sourceMappingURL=BalancePlugin.js.map