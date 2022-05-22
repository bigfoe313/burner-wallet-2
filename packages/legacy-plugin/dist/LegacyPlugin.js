import RedirectToSend from './ui/RedirectToSend';
import base64url from 'base64url';
import { bytesToHex } from './lib';
const PK_REGEX = /\/pk#(0x[0-9a-f]{64})$/i;
const COMPRESSED_REGEX = /\/pk#(\w{43})$/;
export default class LinksPlugin {
    initializePlugin(pluginContext) {
        pluginContext.addPage('/:address(0x[0-9a-f]{40});:amount([\d\.]+);:message', RedirectToSend);
        pluginContext.onQRScanned((qr, ctx) => {
            if (PK_REGEX.test(qr)) {
                const pk = PK_REGEX.exec(qr)[1];
                ctx.actions.safeSetPK(pk);
                return true;
            }
            if (COMPRESSED_REGEX.test(qr)) {
                const compressedPk = COMPRESSED_REGEX.exec(qr)[1];
                const pk = bytesToHex(base64url.toBuffer(compressedPk));
                ctx.actions.safeSetPK(pk);
                return true;
            }
        });
    }
}
//# sourceMappingURL=LegacyPlugin.js.map