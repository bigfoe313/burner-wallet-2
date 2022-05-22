import React from 'react';
import { useTranslation } from 'react-i18next';
import { withBurner, SubProvider } from './BurnerProvider';
import i18n from './i18n';
const wrapComponent = (Component, plugin) => {
    const WrappedComponent = (props) => {
        const { t } = useTranslation(plugin.id);
        const InnerWrappedComponent = withBurner(Component);
        return (React.createElement(SubProvider, { t: t },
            React.createElement(InnerWrappedComponent, Object.assign({ plugin: plugin }, props))));
    };
    return WrappedComponent;
};
export const DEFAULT_PLUGIN_DATA = {
    pages: [],
    buttons: {},
    elements: {},
    accountSearches: [],
    tryHandleQR: () => false,
    sent: () => null,
    getAddressName: () => Promise.resolve(null),
    startup: () => null,
};
export default class Plugins {
    constructor(plugins, ui) {
        this.changeListeners = [];
        this.qrHandlers = [];
        this.startupListeners = [];
        this.sentHandlers = [];
        this.addressToNameResolvers = [];
        this.messageListeners = {};
        this.ui = ui;
        this.pluginData = {
            ...DEFAULT_PLUGIN_DATA,
            tryHandleQR: this.tryHandleQR.bind(this),
            sent: this.sent.bind(this),
            getAddressName: this.getAddressName.bind(this),
            startup: this.startup.bind(this),
        };
        plugins.forEach(plugin => plugin.initializePlugin(this.getPluginContext(plugin)));
    }
    onDataChange(listener) {
        this.changeListeners.push(listener);
    }
    getData() {
        return this.pluginData;
    }
    getPluginContext(plugin) {
        return {
            addElement: (position, Component, options) => this.addPluginElement(plugin, position, Component, options),
            onAccountSearch: (callback) => this.addAccountSearch(callback),
            onQRScanned: (callback) => void this.qrHandlers.push(callback),
            onSent: (callback) => void this.sentHandlers.push(callback),
            addPage: (path, Component) => this.addPluginPage(plugin, path, Component),
            addButton: (position, title, path, options) => this.addPluginButton(plugin, position, title, path, options),
            addHomeButton: (title, path, options) => this.addPluginButton(plugin, 'home', title, path, options),
            addAddressToNameResolver: (callback) => this.addressToNameResolvers.push(callback),
            addTranslations: (translations) => this.addTranslations(plugin, translations),
            getAssets: () => this.ui.getAssets(),
            getWeb3: (network, options) => this.ui.getCore().getWeb3(network, options),
            sendPluginMessage: (topic, ...message) => (this.messageListeners[topic] || []).map((listener) => listener(...message)),
            onPluginMessage: (topic, listener) => this.addMessageListener(topic, listener),
            onStartup: (listener) => void this.startupListeners.push(listener),
        };
    }
    setPluginData(newData) {
        this.pluginData = {
            ...this.pluginData,
            ...newData,
        };
        this.changeListeners.forEach(listener => listener(this.pluginData));
    }
    addPluginPage(plugin, path, Component) {
        const WrappedComponent = wrapComponent(Component, plugin);
        this.setPluginData({
            pages: [...this.pluginData.pages, { plugin, path, Component: WrappedComponent }],
        });
    }
    addPluginButton(plugin, position, title, path, options) {
        const existingButtons = this.pluginData.buttons[position] || [];
        const newButton = { plugin, title, path, options };
        this.setPluginData({
            buttons: {
                ...this.pluginData.buttons,
                [position]: [...existingButtons, newButton],
            },
        });
        let hasRemoved = false;
        const remove = () => {
            if (hasRemoved) {
                throw new Error('This button has already been removed');
            }
            this.setPluginData({
                buttons: {
                    ...this.pluginData.buttons,
                    [position]: this.pluginData.buttons[position]
                        .filter((button) => button !== newButton),
                },
            });
            hasRemoved = true;
        };
        return { remove };
    }
    addPluginElement(plugin, position, Component, options) {
        const WrappedComponent = wrapComponent(Component, plugin);
        const existingElements = this.pluginData.elements[position] || [];
        this.setPluginData({
            elements: {
                ...this.pluginData.elements,
                [position]: [...existingElements, { plugin, Component: WrappedComponent, options }],
            },
        });
    }
    addTranslations(plugin, translations) {
        if (!plugin.id) {
            throw new Error('Can not add translations without plugin ID');
        }
        Object.entries(translations)
            .forEach(([lang, resources]) => i18n.addResources(lang, plugin.id, resources));
    }
    addAccountSearch(callback) {
        this.setPluginData({
            accountSearches: [...this.pluginData.accountSearches, callback],
        });
    }
    addMessageListener(topic, callback) {
        this.messageListeners[topic] = [...(this.messageListeners[topic] || []), callback];
    }
    async getAddressName(address) {
        for (const resolver of this.addressToNameResolvers) {
            const name = await resolver(address);
            if (name) {
                return name;
            }
        }
        return null;
    }
    tryHandleQR(qr, context) {
        for (const handler of this.qrHandlers) {
            if (handler(qr, context)) {
                return true;
            }
        }
        return false;
    }
    startup(context) {
        for (const handler of this.startupListeners) {
            handler(context);
        }
    }
    sent(data) {
        let redirect = null;
        for (const listener of this.sentHandlers) {
            const response = listener(data);
            if (!redirect && response && response.length) {
                redirect = response;
            }
        }
        return redirect;
    }
}
//# sourceMappingURL=Plugins.js.map