import { Box, Card, Typography } from "@mui/material";
import SearchBar from "./components/SearchBar";
import RecentDiscussions from "./components/RecentDiscussions";

export default function HomePage() {
  return (
    <Box sx={{ width: "100%", minHeight: "100vh", color: "white", px: 3, py: 6 }}>
      <Box textAlign="center">
        <Typography variant="h3" fontWeight="bold" sx={{ mb: 2 }}>
          Empower your knowledge with{" "}
          <span style={{ color: "#38bdf8" }}>AskConnect</span>
        </Typography>
        <Typography
          variant="body1"
          sx={{ maxWidth: 700, mx: "auto", color: "#9ca3af",mb: 4, mt:4 }}
        >
          Ask, answer, like, and dislike with community.
        </Typography>
      </Box>

      <SearchBar />

      <Card
        sx={{
          p: 3,
          mt: 5,
          bgcolor: "#111827",
          borderRadius: 3,
          boxShadow: "0 0 20px rgba(255,255,255,0.1)",
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ mb: 2, color: "#38bdf8" }}
        >
          Recent Discussions
        </Typography>

        <RecentDiscussions />
      </Card>
    </Box>
  );
}