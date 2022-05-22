import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { BurnerContext } from '@burner-wallet/ui-core';
declare type SendPageProps = BurnerContext & RouteComponentProps<{
    to?: string;
}>;
declare const _default: React.ComponentType<Pick<SendPageProps, "location" | "history" | "match" | "staticContext">>;
export default _default;
