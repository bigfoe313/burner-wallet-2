import React from 'react';
import Page from '../../components/Page';
import { DataProviders } from '@burner-wallet/ui-core';
const { PluginElements } = DataProviders;
const AdvancedPage = () => {
    return (React.createElement(Page, { title: "Advanced" },
        React.createElement(PluginElements, { position: 'advanced' })));
};
export default AdvancedPage;
//# sourceMappingURL=AdvancedPage.js.map