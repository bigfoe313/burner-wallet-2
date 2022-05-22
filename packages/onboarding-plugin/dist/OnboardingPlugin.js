import OnboardingPage from './ui/OnboardingPage';
const STORAGE_KEY = 'burner-onboarding-complete';
const isTouchDevice = () => {
    const prefixes = ['', '-webkit-', '-moz-', '-o-', '-ms-', ''];
    const mq = (query) => window.matchMedia(query).matches;
    if ('ontouchstart' in window ||
        (window.DocumentTouch && document instanceof DocumentTouch)) {
        return true;
    }
    return mq(['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join(''));
};
export default class OnboardingPlugin {
    constructor(slides, { alwaysShowSkip = false, showArrowButtons = true, mobileOnly = false, } = {}) {
        this.slides = slides;
        this.alwaysShowSkip = alwaysShowSkip;
        this.showArrowButtons = showArrowButtons;
        this.mobileOnly = mobileOnly;
    }
    initializePlugin(pluginContext) {
        pluginContext.addPage('/welcome', OnboardingPage);
        pluginContext.onStartup((ctx) => {
            if (this.mobileOnly && !isTouchDevice()) {
                return;
            }
            const onboardingComplete = window.localStorage.getItem(STORAGE_KEY) === 'true';
            if (!onboardingComplete) {
                ctx.actions.navigateTo('/welcome');
            }
        });
    }
    complete() {
        window.localStorage.setItem(STORAGE_KEY, 'true');
    }
}
//# sourceMappingURL=OnboardingPlugin.js.map