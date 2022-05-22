import React, { ComponentType } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { WithTranslation } from 'react-i18next';
import BurnerCore from '@burner-wallet/core';
import { Diff, BurnerComponents, BurnerContext, BurnerPluginData } from '@burner-wallet/types';
export { BurnerContext } from '@burner-wallet/types';
interface BaseBurnerProviderProps {
    core: BurnerCore;
    pluginData: BurnerPluginData;
    children: React.ReactNode;
    burnerComponents: BurnerComponents;
}
declare type BurnerProviderProps = BaseBurnerProviderProps & WithTranslation & RouteComponentProps;
export declare const context: React.Context<BurnerContext>;
declare const _default: React.ComponentType<Pick<Pick<BurnerProviderProps, "core" | "pluginData" | "children" | "burnerComponents" | "i18n" | "tReady" | "t">, "core" | "pluginData" | "children" | "burnerComponents"> & import("react-i18next").WithTranslationProps>;
export default _default;
export declare function withBurner<P>(WrappedComponent: ComponentType<P>): ComponentType<Diff<P, BurnerContext>>;
export declare function useBurner(): BurnerContext;
export declare const SubProvider: React.FC<Partial<BurnerContext>>;
