import type { EIP1193Provider } from './EthereumProviderTypes';
import { Buffer } from 'buffer';

// code from https://docs.metamask.io/wallet/how-to/sign-data/#use-personal_sign

export const signMessage = async (provider: EIP1193Provider,userAccount: string) => {
    try {
        // For historical reasons, you must submit the message to sign in hex-encoded UTF-8.
        // This uses a Node.js-style buffer shim in the browser.

        const publicKey = await provider.request({
            method: 'eth_getEncryptionPublicKey',
            params: [userAccount],
        })
         
        // const bytes = new TextEncoder().encode(String(publicKey));
        // const msg = '0x' + Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
        const msg = `0x${Buffer.from(String(publicKey), "utf8").toString("hex")}`
        const sign = await provider.request({
            method: "personal_sign",
            params: [msg, userAccount],
        })

        console.log("Encoded Public Key: ", msg);

        return { publicKey, sign };
    } catch (err) {
        console.error(err)
    }
}
