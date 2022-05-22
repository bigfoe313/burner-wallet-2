import React from 'react';
interface PrivateKeyProps {
    onImport: (pk: string) => void;
}
declare const ImportPK: React.FC<PrivateKeyProps>;
export default ImportPK;
