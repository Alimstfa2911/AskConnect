"use client";

import { useContext, useEffect, useState } from "react";
import { Box, Typography, Card, Avatar } from "@mui/material";
import { PROFILE } from "../graphql/queries";
import { useQuery } from "@apollo/client/react";
import { AuthContext } from "../context/AuthContext";
import UserTable from "../admin/dashboard/components/UserTable";
import QuestionsTable from "../admin/dashboard/components/QuestionTable";

export default function ProfilePage() {
  const { user, loadingUser } = useContext(AuthContext);
  const [profile, setProfile] = useState({});

  const { loading, error, data } = useQuery(PROFILE);

  useEffect(() => {
    if (!loading && data?.profile) {
      setProfile(data.profile);
    }
  }, [loading, data]);

  if (loadingUser || loading)
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <Typography>Loading...</Typography>
      </Box>
    );

  if (error)
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <Typography color="error">{error.message}</Typography>
      </Box>
    );

  const upperSectionHeight = 400; // fixed height for profile + Q/A

  return (
    <Box sx={{ width: "100%", px: { xs: 2, md: 4 }, mt: 5 }}>
      {/* Upper Section: User Profile + Questions/Answers */}
      <Box
        sx={{
          display: "flex",
          gap: 4,
          flexWrap: { xs: "wrap", md: "nowrap" },
          mb: 4,
        }}
      >
        {/* Left: Profile */}
        <Card
          sx={{
            flex: "0 0 300px",
            p: 3,
            boxShadow: 4,
            borderRadius: 3,
            textAlign: "center",
            bgcolor: "#1f2937",
            color: "#facc15",
            height: upperSectionHeight,
          }}
        >
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Profile
          </Typography>
          <Avatar
            src={profile?.avatar || "../public/images/profile.jpg"}
            alt={profile?.name}
            sx={{ width: 100, height: 100, mx: "auto", mb: 2 }}
          />
          <Typography variant="h6">
            <strong>Name:</strong> {profile?.name}
          </Typography>
          <Typography variant="body2">
            <strong>Email:</strong> {profile?.email}
          </Typography>
          <Typography variant="body2">
            <strong>Role:</strong> {profile?.role || "user"}
          </Typography>
        </Card>

        {/* Right: Questions & Answers */}
        <Box
          flex={1}
          display="flex"
          flexDirection="column"
          gap={2}
          height={upperSectionHeight}
        >
          {/* Questions */}
          <Card
            sx={{
              flex: 1,
              p: 2,
              boxShadow: 3,
              borderRadius: 3,
              overflowY: "auto",
            }}
          >
            <Typography variant="h6" gutterBottom>
              📝 Questions Asked
            </Typography>
            {profile?.questions?.length > 0 ? (
              profile.questions.map((q) => (
                <Typography key={q.id} sx={{ mb: 1 }}>
                  📝 {q.title}
                </Typography>
              ))
            ) : (
              <Typography>No questions asked yet</Typography>
            )}
          </Card>

          {/* Answers */}
          <Card
            sx={{
              flex: 1,
              p: 2,
              boxShadow: 3,
              borderRadius: 3,
              overflowY: "auto",
            }}
          >
            <Typography variant="h6" gutterBottom>
              💬 Answers Given
            </Typography>
            {profile?.answers?.length > 0 ? (
              profile.answers.map((a) => (
                <Typography key={a.id} sx={{ mb: 1 }}>
                  💬 {a.text} (on: {a.question.title})
                </Typography>
              ))
            ) : (
              <Typography>No answers given yet</Typography>
            )}
          </Card>
        </Box>
      </Box>

      {/* Lower Section: Admin Panel (visible only to admins) */}
      {profile?.role === "admin" && (
        <Box display="flex" flexDirection="column" gap={4}>
          <Card sx={{ p: 2, boxShadow: 3, borderRadius: 3 }}>
            <Typography variant="h6" gutterBottom>
              👑 Admin Panel - Users
            </Typography>
            <UserTable />
          </Card>
          <Card sx={{ p: 2, boxShadow: 3, borderRadius: 3 }}>
            <Typography variant="h6" gutterBottom>
              All Questions
            </Typography>
            <QuestionsTable />
          </Card>
        </Box>
      )}
    </Box>
  );
}
