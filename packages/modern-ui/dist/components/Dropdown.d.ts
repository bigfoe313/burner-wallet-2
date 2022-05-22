import { ComponentType, ReactElement } from 'react';
export interface ItemComponentProps<T> {
    item: T;
}
interface DropdownProps<T> {
    options: T[];
    selected: T | null;
    onChange: (newSelection: T) => void;
    itemComponent: ComponentType<ItemComponentProps<T>>;
    disabled?: boolean;
}
declare type DropdownType = <T = string>(props: DropdownProps<T>) => ReactElement<DropdownProps<T>>;
declare const Dropdown: DropdownType;
export default Dropdown;
