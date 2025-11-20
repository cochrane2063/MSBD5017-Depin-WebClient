import { useState, type SetStateAction } from 'react';
import { useSyncProviders } from './useSyncProviders';
import useAuth from '~/hooks/useAuth';
// code from https://metamask.io/news/how-to-implement-eip-6963-support-in-your-web3-dapp

import type {
  EIP6963ProviderDetail
} from "./EthereumProviderTypes";

export const DiscoverWalletProviders = () => {
  const providers = useSyncProviders();
  const { auth, setAuth } = useAuth();

  const handleConnect = async (providerWithInfo: EIP6963ProviderDetail) => {
    const accounts = await providerWithInfo.provider.request({ method: 'eth_requestAccounts' }).catch(console.error);

    if (Array.isArray(accounts) && accounts.length > 0 && accounts[0]) {
      setAuth({providerWithInfo: providerWithInfo, accounts: accounts});
    }
  };

  return (
    <>
      <h2>Wallets Detected:</h2>
      <div>
        {providers.length > 0 ? (
          providers.map((provider) => {
            return (
              <button key={provider.info.uuid} onClick={() => handleConnect(provider)}>
                <img src={provider.info.icon} alt={provider.info.name} />
                <div>{provider.info.name}</div>
              </button>
            );
          })
        ) : (
          <div>There are no announced providers.</div>
        )}
      </div>
      <hr />
      <h2>{auth.accounts.length > 0 ? 'Wallet Selected' : 'No Wallet Selected'}</h2>
      {auth.accounts.length > 0 && (
        <div>
          <img src={auth.providerWithInfo!.info.icon} alt={auth.providerWithInfo!.info.name} />
          <div>{auth.providerWithInfo!.info.name}</div>
          <div>({auth.accounts[0]})</div>
        </div>
      )}
    </>
  );
};