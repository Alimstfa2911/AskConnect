"use client";

import { useContext } from "react";
import { Box, Typography, Card, Avatar } from "@mui/material";
import { PROFILE } from "../graphql/queries";
import { useQuery } from "@apollo/client/react";
import { AuthContext } from "../context/AuthContext";
import UserTable from "../admin/dashboard/components/UserTable";
import QuestionsTable from "../admin/dashboard/components/QuestionTable";

export default function ProfilePage() {
  const { user } = useContext(AuthContext); // get logged-in user info
  const { loading, error, data } = useQuery(PROFILE);

  if (loading)
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

  const { profile } = data;
  console.log("User :", profile);

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 4,
        mt: 5,
        px: 2,
        justifyContent: "center",
      }}
    >
      {/* Left Column: User Info */}
      <Card
        sx={{
          flex: "1 1 250px",
          p: 3,
          boxShadow: 4,
          borderRadius: 3,
          textAlign: "center",
        }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Profile
        </Typography>
        <Avatar
          src={profile.avatar || "/profile.jpg"}
          alt={profile.name}
          sx={{ width: 100, height: 100, mx: "auto", mb: 2 }}
        />
        <Typography variant="h6">
          <strong>Name:</strong> {profile.name}
        </Typography>
        <Typography variant="body2">
          <strong>Email:</strong> {profile.email}
        </Typography>
        <Typography variant="body2">
          <strong>Role:</strong> {profile?.role || "user"}
        </Typography>
      </Card>

      {/* Right Column: Questions & Answers */}
      <Box flex="2 1 600px" display="flex" flexDirection="column" gap={3}>
        {/* Questions Card */}
        <Card sx={{ p: 2, boxShadow: 3, borderRadius: 3 }}>
          <Typography variant="h6" gutterBottom>
            📝 Questions Asked
          </Typography>
          {profile.questions && profile.questions.length > 0 ? (
            profile.questions.map((q) => (
              <Typography key={q.id} sx={{ mb: 1 }}>
                📝 {q.title}
              </Typography>
            ))
          ) : (
            <Typography>No questions asked yet</Typography>
          )}
        </Card>

        {/* Answers Card */}
        <Card sx={{ p: 2, boxShadow: 3, borderRadius: 3 }}>
          <Typography variant="h6" gutterBottom>
            💬 Answers Given
          </Typography>
          {profile.answers && profile.answers.length > 0 ? (
            profile.answers.map((a) => (
              <Typography key={a.id} sx={{ mb: 1 }}>
                💬 {a.text} (on: {a.question.title})
              </Typography>
            ))
          ) : (
            <Typography>No answers given yet</Typography>
          )}
        </Card>

        {/* Admin-only Section */}
        {profile?.role === "admin" && (
          <>
            <Card sx={{ p: 2, boxShadow: 3, borderRadius: 3 }}>
              <Typography variant="h6" gutterBottom>
                👑 Admin Panel - Users
              </Typography>
              <UserTable /> {/* show all users for admin */}
            </Card>
            <Card sx={{ mb: 3, p: 2 }}>
              <Typography variant="h6">All Questions</Typography>
              <QuestionsTable /> {/* New component */}
            </Card>
          </>
        )}
      </Box>
    </Box>
  );
}
