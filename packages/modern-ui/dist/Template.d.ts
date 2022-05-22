import React from 'react';
export interface BurnerTheme {
    background: string;
    font: string;
    titleFont: string | null;
    accentColor: string;
    accentLight: string;
    accentDark: string;
    accentText: string;
    paperBackground: string;
    logo: string | null;
    pageMargin: string;
}
declare const Template: React.FC<{
    theme: any;
}>;
export default Template;
