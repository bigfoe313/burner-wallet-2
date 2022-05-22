import React, { Component } from 'react';
import { BrowserRouter, HashRouter, MemoryRouter } from 'react-router-dom';
import './i18n';
import dataProviders from './data-providers';
import BurnerProvider from './BurnerProvider';
import BurnerRouter from './BurnerRouter';
import Plugins from './Plugins';
const routers = {
    browser: BrowserRouter,
    hash: HashRouter,
    memory: MemoryRouter,
};
const REQUIRED_PAGES = ['/', '/confirm', '/pk'];
export default class BurnerUICore extends Component {
    constructor(props) {
        super(props);
        const internalPlugins = this.getInternalPlugins();
        const _plugins = props.plugins ? [...internalPlugins, ...props.plugins] : internalPlugins;
        this.plugins = new Plugins(_plugins, this);
        this.state = {
            pluginData: this.plugins.getData(),
        };
        this._burnerComponents = {
            ...dataProviders,
            ...this.burnerComponents(),
        };
    }
    getInternalPlugins() {
        return [];
    }
    componentDidMount() {
        this.plugins.onDataChange(pluginData => this.setState({ pluginData }));
        const loader = document.querySelector('#loader');
        if (loader) {
            loader.parentNode.removeChild(loader);
        }
    }
    getCore() {
        return this.props.core;
    }
    getAssets() {
        return this.props.core.getAssets();
    }
    router() {
        return (React.createElement(BurnerRouter, { pluginData: this.state.pluginData, pages: this.getPages() }));
    }
    render() {
        const Router = routers[this.props.router];
        return (React.createElement(Router, null,
            React.createElement(BurnerProvider, { core: this.props.core, pluginData: this.state.pluginData, burnerComponents: this._burnerComponents }, this.content())));
    }
}
BurnerUICore.defaultProps = {
    plugins: [],
    router: 'browser',
};
//# sourceMappingURL=BurnerUICore.js.map