import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Asset } from '@burner-wallet/types';
import { BurnerContext } from '@burner-wallet/ui-core';
export declare const getAllBalances: (assets: Asset[], account: string) => Promise<string[]>;
declare const _default: React.ComponentType<Pick<BurnerContext & RouteComponentProps<{}, import("react-router").StaticContext, any>, "location" | "history" | "match" | "staticContext">>;
export default _default;
