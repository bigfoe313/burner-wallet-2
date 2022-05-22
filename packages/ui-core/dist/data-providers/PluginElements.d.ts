import React from 'react';
import { PluginElementsProps } from '@burner-wallet/types';
declare type ModifiedPluginElementsProps = Pick<PluginElementsProps, 'position'>;
declare const PluginElements: React.FC<ModifiedPluginElementsProps>;
export default PluginElements;
