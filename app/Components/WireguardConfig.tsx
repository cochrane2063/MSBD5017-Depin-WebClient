// import { utils } from 'noble-ed25519';
import nacl from "tweetnacl";

function bytesToBase64(bytes: Uint8Array) {
  let binary = '';
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

function base64ToBytes(base64: string): Uint8Array {
  // support URL-safe base64
  base64 = base64.replace(/-/g, "+").replace(/_/g, "/");
  // pad to multiple of 4
  const pad = base64.length % 4;
  if (pad) base64 += "=".repeat(4 - pad);

  const binary = atob(base64);
  const len = binary.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

const generateWireGuardPrivateKey = () => {
    // const privateKeyBytes = utils.randomPrivateKey();
    // const privateKeyBase64 = bytesToBase64(privateKeyBytes);
    const privateKey = nacl.randomBytes(32);

    return bytesToBase64(privateKey);
}

const getWireguardPublicKey = (privateKey: string) => {
    const privateKeyBytes = base64ToBytes(privateKey);
    const publicKey = nacl.scalarMult.base(privateKeyBytes);
    return bytesToBase64(publicKey);
}

export const generateWireguardKeyPair = () => {    
    const privatekey = generateWireGuardPrivateKey();
    const publicKey = getWireguardPublicKey(privatekey);
    return { privatekey, publicKey };
}

export const downloadWireguardConfig = async (clientPrivateKey: string, serverPubcliKey: string ,localCIDR: string, dns: string, peerIp: string, peerPort: string, allowedIPs: string) => {

    const content = `[Interface]`+'\n'+
                    `PrivateKey = ${clientPrivateKey}`+'\n'+
                    `Address = ${localCIDR}`+'\n'+
                    `DNS = ${dns}`+'\n'+
                    '\n'+
                    `[Peer]`+'\n'+
                    `PublicKey = ${serverPubcliKey}`+'\n'+
                    `AllowedIPs = ${allowedIPs}`+'\n'+
                    `Endpoint = ${peerIp}:${peerPort}`;
                        
    const blob = new Blob([content], { type: 'text/plain' });
    const fileUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = peerIp + '.conf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(fileUrl);
}

