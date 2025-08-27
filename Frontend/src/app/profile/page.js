"use client";
import { Box, Typography, CircularProgress, Card, CardContent } from "@mui/material";
import { PROFILE } from "../graphql/queries";
import { useQuery } from "@apollo/client/react";

export default function ProfilePage() {
  const { loading, error, data } = useQuery(PROFILE);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error.message}</Typography>;

  return (
    <Box display="flex" gap={4} flexWrap="wrap">
      {/* Left column: User info */}
      <Box flex="1 1 250px">
        <Card>
          <CardContent sx={{ textAlign: "center" }}>
            { <h1>Profile</h1> }
            <img
              src={data.profile.avatar || "/profile.jpg"}
              alt="user_profile"
              width={100}
              style={{ borderRadius: "50%", marginBottom: 10 }}
            />
            <Typography variant="h5"><strong>Name : </strong>{data.profile.name}</Typography>
            <Typography variant="body2"><strong>Email : </strong>{data.profile.email}</Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Right column: Questions & Answers */}
      <Box flex="2 1 600px" display="flex" flexDirection="column" gap={2}>
        {/* Questions Card */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              📝 Questions Asked
            </Typography>
            {data.profile.questions && data.profile.questions.length > 0 ? (
              data.profile.questions.map((q) => (
                <Typography key={q.id}>📝 {q.title}</Typography>
              ))
            ) : (
              <Typography>No questions asked yet</Typography>
            )}
          </CardContent>
        </Card>

        {/* Answers Card */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              💬 Answers Given
            </Typography>
            {data.profile.answers && data.profile.answers.length > 0 ? (
              data.profile.answers.map((a) => (
                <Typography key={a.id}>
                  💬 {a.text} (on: {a.question.title})
                </Typography>
              ))
            ) : (
              <Typography>No answers given yet</Typography>
            )}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
