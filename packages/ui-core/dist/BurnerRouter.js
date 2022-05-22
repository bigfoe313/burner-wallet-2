import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
const BurnerRouter = ({ pages, pluginData }) => (React.createElement(Switch, null,
    pages.map(({ path, component, exact }) => (React.createElement(Route, { path: path, component: component, key: JSON.stringify(path), exact: exact || path === '/' }))),
    pluginData.pages.map(({ path, Component }) => (React.createElement(Route, { path: path, key: JSON.stringify(path), component: Component }))),
    React.createElement(Redirect, { to: "/" })));
export default BurnerRouter;
//# sourceMappingURL=BurnerRouter.js.map