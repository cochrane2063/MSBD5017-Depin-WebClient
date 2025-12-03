

export const downloadWireguardConfig = (privateKey: string, publicKey: string, localCIDR: string, dns: string, peerIp: string, peerPort: string, allowedIPs: string) => {
    const content = `[Interface]`+'\n'+
                    `PrivateKey = ${privateKey}`+'\n'+
                    `Address = ${localCIDR}`+'\n'+
                    `DNS = ${dns}`+'\n'+
                    '\n'+
                    `[Peer]`+'\n'+
                    `PublicKey = ${publicKey}`+'\n'+
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

