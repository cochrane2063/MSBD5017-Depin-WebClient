import { Box, Card, CardContent, Typography, Link, Button, Avatar, Stack } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function About() {
  const repo = "https://github.com/cochrane2063/MSBD5017-Depin-WebClient";

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
    </Box>
  );
}
// ...existing code...