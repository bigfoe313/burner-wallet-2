import React, { Fragment } from 'react';
import { useBurner } from '../BurnerProvider';
const PluginButtons = ({ position, component, children, ...props }) => {
    const { pluginData, BurnerComponents } = useBurner();
    const elements = pluginData.buttons[position];
    if (!elements || elements.length === 0) {
        return null;
    }
    const Component = component || BurnerComponents.Button;
    return (React.createElement(Fragment, null,
        children,
        elements.map(({ title, path, options }, i) => (React.createElement(Component, Object.assign({ key: path || i, title: title, to: path }, options, props))))));
};
export default PluginButtons;
//# sourceMappingURL=PluginButtons.js.map