import { Box, Card, CardContent, Typography, Link, Button, Avatar, Stack } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import GetAppIcon from "@mui/icons-material/GetApp";

const WIREGUARD_COLOR = "#88171A";

function WireGuardLogo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="12" fill={WIREGUARD_COLOR} />
      <path d="M6 12c0-3.314 2.686-6 6-6s6 2.686 6 6-2.686 6-6 6S6 15.314 6 12z" fill="#fff" opacity="0.15" />
      <path d="M8.5 11.5c1-2 3-3 5-3s4 1 5 3" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function About() {
  const repo = "https://github.com/cochrane2063/MSBD5017-Depin-WebClient";
  const wireguard = "https://www.wireguard.com/install/";

  return (
    <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
      <Card sx={{ maxWidth: 800, width: "100%" }}>
        <CardContent>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
            <Avatar sx={{ bgcolor: "primary.main" }}>
              <GitHubIcon />
            </Avatar>
            <Typography variant="h5">Depin Web Client</Typography>
          </Stack>

          <Typography variant="body1" color="text.secondary" paragraph>
            Web client for the MSBD5017 Depin project.
          </Typography>

          <Typography variant="body2" paragraph>
            In case the website is down, you can run your own local instance by following the instructions in the GitHub repository.
          </Typography>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center">
            <Link href={repo} target="_blank" rel="noopener noreferrer" underline="none">
              <Button startIcon={<GitHubIcon />} variant="outlined">
                Open GitHub Repository
              </Button>
            </Link>
          </Stack>
        </CardContent>
      </Card>

      <Card
        sx={{
          width: 420,
          maxWidth: "100%",
          borderLeft: `6px solid ${WIREGUARD_COLOR}`,
          background: "linear-gradient(180deg, rgba(122,193,67,0.04), transparent 60%)",
        }}
      >
        <CardContent>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
            <Avatar sx={{ bgcolor: "transparent" }}>
              <WireGuardLogo />
            </Avatar>
            <Typography variant="h5" sx={{ color: WIREGUARD_COLOR, fontWeight: 700 }}>
              Download Wireguard Client
            </Typography>
          </Stack>

          <Typography variant="body1" color="text.secondary" paragraph>
            Wireguard client for the MSBD5017 Depin project.
          </Typography>

          <Typography variant="body2" color="text.secondary" paragraph>
            This project uses the Wireguard VPN protocol. You can download the Wireguard client from the official website.
          </Typography>

          <Stack direction="row" spacing={2} alignItems="center">
            <Link href={wireguard} target="_blank" rel="noopener noreferrer" underline="none">
              <Button
                startIcon={<GetAppIcon />}
                variant="contained"
                sx={{
                  bgcolor: WIREGUARD_COLOR,
                  "&:hover": { bgcolor: "#65a836" },
                }}
              >
                Download WireGuard
              </Button>
            </Link>

            <Button
              variant="outlined"
              href="https://www.wireguard.com/quickstart/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ borderColor: WIREGUARD_COLOR, color: WIREGUARD_COLOR }}
            >
              Quickstart Guide
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}