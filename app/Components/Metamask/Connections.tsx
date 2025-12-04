import type { EIP1193Provider } from './EthereumProviderTypes';
import { Buffer } from 'buffer';

// code from https://docs.metamask.io/wallet/how-to/sign-data/#use-personal_sign

export const getPublicKey = async (provider: EIP1193Provider, userAccount: string) => {
    const publicKey = await provider.request({
        method: 'eth_getEncryptionPublicKey',
        params: [userAccount],
    })
    return publicKey;
}

export const signMessage = async (message: string,provider: EIP1193Provider,userAccount: string) => {
    try {
        // For historical reasons, you must submit the message to sign in hex-encoded UTF-8.
        // This uses a Node.js-style buffer shim in the browser.
         
        const msg = `0x${Buffer.from(message, "utf8").toString("hex")}`
        const sig = await provider.request({
            method: "personal_sign",
            params: [msg, userAccount],
        })

        return sig;
    } catch (err) {
        console.error(err)
    }
}
