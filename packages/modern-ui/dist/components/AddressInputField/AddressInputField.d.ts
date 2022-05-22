import React from 'react';
import { Account } from '@burner-wallet/types';
interface AddressInputFieldProps {
    value: string;
    account?: Account | null;
    onChange: (address: string, account: Account | null) => void;
    scan?: () => any;
    disabled?: boolean;
}
declare const AddressInputField: React.FC<AddressInputFieldProps>;
export default AddressInputField;
