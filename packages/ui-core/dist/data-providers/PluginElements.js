import React, { Fragment } from 'react';
import { useBurner } from '../BurnerProvider';
const PluginElements = ({ position, ...props }) => {
    const { pluginData } = useBurner();
    const elements = pluginData.elements[position];
    if (!elements || elements.length === 0) {
        return null;
    }
    return (React.createElement(Fragment, null, elements.map(({ Component, plugin }, i) => (React.createElement(Component, Object.assign({ key: i, plugin: plugin }, props))))));
};
export default PluginElements;
//# sourceMappingURL=PluginElements.js.map