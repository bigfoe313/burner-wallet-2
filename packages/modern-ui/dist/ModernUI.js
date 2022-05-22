import React from 'react';
import BurnerUICore from '@burner-wallet/ui-core';
import burnerComponents from './components/burner-components';
import Header from './components/Header';
import Loading from './components/Loading';
import Scanner from './components/Scanner';
import Template from './Template';
import options from './options';
import internalPlugins from './internal-plugins';
import ActivityPage from './pages/ActivityPage';
import AdvancedPage from './pages/AdvancedPage';
import ConfirmPage from './pages/ConfirmPage';
import HomePage from './pages/HomePage';
import PKPage from './pages/PKPage';
import ReceiptPage from './pages/ReceiptPage';
import ReceivePage from './pages/ReceivePage';
import SendPage from './pages/SendPage';
export default class ModernUI extends BurnerUICore {
    constructor(props) {
        super(props);
        if (props.theme && props.theme.balanceStyle) {
            options.balanceStyle = props.theme.balanceStyle;
        }
    }
    getPages() {
        return [
            { path: '/', component: HomePage },
            { path: '/activity', component: ActivityPage },
            { path: '/pk', component: PKPage },
            { path: '/receive', component: ReceivePage },
            { path: '/send', component: SendPage },
            { path: '/confirm', component: ConfirmPage },
            { path: '/receipt/:asset/:txHash', component: ReceiptPage },
            { path: '/advanced', component: AdvancedPage },
        ];
    }
    getInternalPlugins() {
        return internalPlugins;
    }
    burnerComponents() {
        return burnerComponents;
    }
    content() {
        return (React.createElement(Template, { theme: this.props.theme },
            React.createElement(Scanner, null),
            React.createElement(Loading, null),
            React.createElement(Header, { title: this.props.title }),
            this.router()));
    }
}
//# sourceMappingURL=ModernUI.js.map