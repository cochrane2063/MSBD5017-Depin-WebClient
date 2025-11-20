import { NavLink, Link } from "react-router";
import { Grid } from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
            <nav>
              <Grid container spacing={2}>
                  <Grid size={4}>
                    <NavLink to="/" end>Home</NavLink>
                  </Grid>
                  <Grid size={4}>
                    <NavLink to="/wallets">Wallets</NavLink>
                  </Grid>
                  <Grid size={4}>
                    <NavLink to="/about">About</NavLink>
                  </Grid>
              </Grid>
            </nav>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
