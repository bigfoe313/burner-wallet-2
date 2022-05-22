import React, { useState } from 'react';
import styled from 'styled-components';
const Container = styled.div `margin: 12px 0;`;
const TabContainer = styled.div `display: flex;`;
const TabButton = styled.button `
  border-radius: 30px;
  display: flex;
  font-size: 16px;
  align-items: center;
  color: var(--color-primary);
  padding: 8px 12px;
  border: 1px solid var(--color-primary);
  outline: none;
  margin: 0 4px;
  transition: 0.15s ease-in-out;

  &:hover {
    background: #e0faf8;
  }

  &:disabled {
    background: var(--color-primary);
    color: var(--color-tertiary);
  }

  &:first-child {
    margin-left: 0px;
  }
`;
const HomeTabs = ({ pluginData }) => {
    const [tab, setTab] = useState(0);
    const pluginTabs = pluginData.elements['home-tab'];
    const { Component: TabComponent, plugin: tabPlugin } = pluginTabs[tab];
    return (React.createElement(Container, null,
        pluginTabs.length > 1 && (React.createElement(TabContainer, null, pluginTabs.map(({ options }, i) => (React.createElement(TabButton, { key: options.title, onClick: () => setTab(i), disabled: tab === i }, options.title))))),
        React.createElement(TabComponent, { plugin: tabPlugin })));
};
export default HomeTabs;
//# sourceMappingURL=HomeTabs.js.map