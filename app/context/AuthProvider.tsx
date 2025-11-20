import { createContext, useState } from "react";
import type { EIP6963ProviderDetail } from "~/Components/Metamask/EthereumProviderTypes";

export interface AccountInfo {
  providerWithInfo: EIP6963ProviderDetail;
  accounts: string[];
}

interface MyAuthState {
  auth: AccountInfo;
  setAuth: React.Dispatch<React.SetStateAction<AccountInfo>>
}


const AuthContext = createContext<MyAuthState>({
  auth: {
    providerWithInfo: {} as EIP6963ProviderDetail,
    accounts: []
  },
  setAuth: () => {}
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<AccountInfo>({ providerWithInfo: {} as EIP6963ProviderDetail, accounts: []});

  return <AuthContext.Provider value={{auth, setAuth}}>{children}</AuthContext.Provider>;
};

export default AuthContext;
