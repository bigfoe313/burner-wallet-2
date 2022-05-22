import { ReactNode } from 'react';
import { BurnerPluginContext, Plugin } from '@burner-wallet/types';
interface OnboardingPluginOptions {
    alwaysShowSkip?: boolean;
    showArrowButtons?: boolean;
    mobileOnly?: boolean;
}
export default class OnboardingPlugin implements Plugin {
    slides: ReactNode[];
    alwaysShowSkip: boolean;
    showArrowButtons: boolean;
    mobileOnly: boolean;
    constructor(slides: ReactNode[], { alwaysShowSkip, showArrowButtons, mobileOnly, }?: OnboardingPluginOptions);
    initializePlugin(pluginContext: BurnerPluginContext): void;
    complete(): void;
}
export {};
