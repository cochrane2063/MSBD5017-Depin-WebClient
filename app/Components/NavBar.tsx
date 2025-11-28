import React from "react";
import { NavLink } from "react-router";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from "@mui/material/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginIcon from "@mui/icons-material/Login";
import { Typography, Menu, MenuItem, IconButton, Avatar, Tooltip } from "@mui/material";
import useAuth from "~/hooks/useAuth";
import { signMessage } from './Metamask/Connections';

export default function ButtonAppBar() {
  const { auth, setAuth } = useAuth();
  const account = auth?.accounts?.[0];
  const isAuthed = Boolean(account);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleOpen = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    if (setAuth) {
      setAuth({ providerWithInfo: undefined as any, accounts: [] } as any);
    }
    handleClose();
  };

  const register = async () => {
      const sig = await signMessage("H8zfXnSclIQ/wLy7GSt7GNqa1utAi4Uvr7Dg3p9vdHQ=",auth.providerWithInfo.provider, auth.accounts[0]);
      try {
        const res_string = sig;
      } catch (error) {
        console.error('Error:', error);
      }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ width: '100%', display: 'flex', gap: 2 }}>
          {}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Typography
              component={NavLink as any}
              to="/"
              end
              sx={{ color: 'inherit', textDecoration: 'none' }}
            >
              Home
            </Typography>

            <Typography
              component={NavLink as any}
              to="/about"
              sx={{ color: 'inherit', textDecoration: 'none' }}
            >
              About
            </Typography>
          </Box>

          {}
          <Box sx={{ flexGrow: 1 }} />

          {}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {}
            {!isAuthed && (
              <Button
                component={NavLink as any}
                to="/wallets"
                color="inherit"
                startIcon={<LoginIcon />}
                variant="text"
                size="small"
                sx={{ color: 'inherit' }}
              >
                Login
              </Button>
            )}

            {}
            {isAuthed && (
              <>
                <Tooltip title={account ? `Account: ${account}` : "Account"}>
                  <IconButton
                    size="small"
                    onClick={handleOpen}
                    sx={{ ml: 1, color: 'inherit' }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                  >
                    <Avatar sx={{ width: 32, height: 32 }} src={auth.providerWithInfo.info.icon} alt={auth.providerWithInfo.info.name}>
                    </Avatar>
                  </IconButton>
                </Tooltip>

                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <MenuItem onClick={register}>Register</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
