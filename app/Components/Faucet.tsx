import React from "react";
import { Button, Box, Typography, Alert } from "@mui/material";
import useAuth from '~/hooks/useAuth';
import { Web3 } from 'web3';

const FAUCET_ADDRESS = "0xA86b97D7CF0c00cd0e82bBDCe9F06d689cFb12b5";

const FAUCET_ABI = [
  {
    inputs: [],
    name: "claim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export default function FaucetClaim() {
    const [status, setStatus] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState(false);
    const { auth } = useAuth();
    const account = auth?.accounts?.[0];
    const isAuthed = Boolean(account);

    const claimFaucet = async () => {
        if (!isAuthed) {
            setStatus("Please connect your wallet first.");
            return;
        }

        setLoading(true);
        setStatus("Preparing transaction...");
        try {
            const provider = auth.providerWithInfo.provider;
            const web3 = new Web3(provider);
            const contract = new web3.eth.Contract(FAUCET_ABI, FAUCET_ADDRESS);

            setStatus("Sending claim transaction...");
            const tx = await contract.methods.claim().send({ from: account });

            setStatus("Transaction Hash: " + tx.transactionHash + '\n' + "Claim confirmed. Check your balance.");
        } catch (err: any) {
            setStatus("Claim failed: " + (err?.message ?? String(err)));
        } finally {
            setLoading(false);
        }
    };

    return (
    <Box sx={{ fontFamily: "sans-serif", maxWidth: 640, margin: "24px auto", padding: "0 16px" }}>
        <Typography variant="h5" gutterBottom>
        CLR Faucet Claim
        </Typography>

        <Typography sx={{ mt: 1 }}>
        Network: <strong>Sepolia</strong>
        </Typography>

        <Typography sx={{ mt: 1 }}>
        Faucet: <code>{FAUCET_ADDRESS}</code>
        </Typography>

        <Typography sx={{ mt: 1 }}>
        Token: <code>0xf1664c17887767c8f58695846babb349ca61d2e9</code>
        </Typography>

        <Box sx={{ display: "flex", gap: 1, mt: 3 }}>

        <Button variant="outlined" onClick={claimFaucet} disabled={loading || !isAuthed}>
            {loading ? "Processing..." : "Claim CLR"}
        </Button>
        </Box>

        {account && (
        <Typography sx={{ mt: 2, fontSize: 13, color: "text.secondary" }}>
            Connected: {account}
        </Typography>
        )}

        {status && (
        <Alert severity="info" sx={{ mt: 2 }}>
            {status}
        </Alert>
        )}
    </Box>
    );
}