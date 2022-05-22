import React from 'react';
import { PluginButtonsProps } from '@burner-wallet/types';
declare type ModifiedPluginButtonsProps = Pick<PluginButtonsProps, 'position' | 'component'>;
declare const PluginButtons: React.FC<ModifiedPluginButtonsProps>;
export default PluginButtons;
