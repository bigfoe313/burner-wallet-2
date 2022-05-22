import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { BurnerContext } from '@burner-wallet/ui-core';
interface MatchParams {
    asset: string;
    txHash: string;
    account: string;
}
declare const _default: React.ComponentType<Pick<RouteComponentProps<MatchParams, import("react-router").StaticContext, any> & BurnerContext, "location" | "history" | "match" | "staticContext">>;
export default _default;
