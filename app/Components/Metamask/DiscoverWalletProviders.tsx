// ...existing code...
import React, { useState } from "react";
import { useSyncProviders } from "./useSyncProviders";
import useAuth from "~/hooks/useAuth";
import type { EIP6963ProviderDetail } from "./EthereumProviderTypes";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Avatar,
  Typography,
  Button,
  Stack,
  CircularProgress,
  Alert,
} from "@mui/material";

const shortAddress = (addr: string) =>
  addr.length > 12 ? `${addr.slice(0, 6)}...${addr.slice(-6)}` : addr;

export const DiscoverWalletProviders: React.FC = () => {
  const providers = useSyncProviders();
  const { auth, setAuth } = useAuth();
  const [loadingUuid, setLoadingUuid] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleConnect = async (providerWithInfo: EIP6963ProviderDetail) => {
    setError(null);
    setLoadingUuid(providerWithInfo.info.uuid);
    try {
      const accounts = await providerWithInfo.provider.request({
        method: "eth_requestAccounts",
      });

      if (Array.isArray(accounts) && accounts.length > 0 && typeof accounts[0] === "string") {
        setAuth({ providerWithInfo, accounts });
      } else {
        setError("No accounts returned from wallet.");
      }
    } catch (err: any) {
      console.error(err);
      setError(err?.message ?? String(err));
    } finally {
      setLoadingUuid(null);
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Wallets Detected
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {providers.length === 0 ? (
        <Alert severity="info">There are no announced providers.</Alert>
      ) : (
        <Grid container spacing={2}>
          {providers.map((p) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={p.info.uuid}>
              <Card variant="outlined">
                <CardContent>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar src={p.info.icon} alt={p.info.name} />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle1">{p.info.name}</Typography>
                    </Box>
                    <Box>
                      <Button
                        variant="contained"
                        onClick={() => handleConnect(p)}
                        disabled={!!loadingUuid}
                        startIcon={loadingUuid === p.info.uuid ? <CircularProgress size={18} /> : null}
                        aria-label={`Connect to ${p.info.name}`}
                      >
                        {loadingUuid === p.info.uuid ? "Connecting" : "Connect"}
                      </Button>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          {auth?.accounts?.length > 0 ? "Wallet Selected" : "No Wallet Selected"}
        </Typography>

        {auth?.accounts?.length > 0 && auth.providerWithInfo && (
          <Card variant="outlined">
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar src={auth.providerWithInfo.info.icon} alt={auth.providerWithInfo.info.name} />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle1">{auth.providerWithInfo.info.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {shortAddress(auth.accounts[0])}
                  </Typography>
                </Box>
                <Button
                  variant="outlined"
                  onClick={() => setAuth({ providerWithInfo: { ...auth.providerWithInfo }, accounts: [] })}
                  aria-label="Disconnect wallet"
                >
                  Disconnect
                </Button>
              </Stack>
            </CardContent>
          </Card>
        )}
      </Box>
    </Box>
  );
};

export default DiscoverWalletProviders;
// ...existing code...