import React from 'react';
import { PluginButtonProps } from '@burner-wallet/types';
interface AppButtonProps extends PluginButtonProps {
    description?: string;
    logo?: string;
}
declare const AppButton: React.FC<AppButtonProps>;
export default AppButton;
