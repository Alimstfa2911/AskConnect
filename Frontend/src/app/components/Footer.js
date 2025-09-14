"use client";
import { Box, Container, Typography, Grid } from "@mui/material";
import {
  FaFacebook,
  FaGithub,
  FaGoogle,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

export default function Footer() {
  const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
  const Resources = ["Articles", "Blog", "Chart Sheet", "Docs"];
  const Plans = ["Paid memberships", "For students", "Business solutions"];
  const Community = ["Forums", "Events"];
  const Company = ["About", "Careers", "Affiliates"];

  return (
    <Box
      component="footer"
      sx={{ backgroundColor: "#111827", color: "#E5E7EB", pt: 8,mt: 6,
         // shadow at top to separate from content
        borderTop: "2px solid #374151"  }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6} justifyContent="space-between">
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
              Company
            </Typography>
            {Company.map((item, idx) => (
              <Typography key={idx} variant="body2" sx={{ mb: 0.5 }}>
                {item}
              </Typography>
            ))}
            <Box sx={{ display: "flex", mt: 2, gap: 1, fontSize: "20px" }}>
              <FaFacebook />
              <FaGoogle />
              <FaTwitter />
              <FaYoutube />
            </Box>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
              Resources
            </Typography>
            {Resources.map((item, idx) => (
              <Typography key={idx} variant="body2" sx={{ mb: 0.5 }}>
                {item}
              </Typography>
            ))}
            <Typography variant="h6" sx={{ fontWeight: "bold", mt: 3, mb: 1 }}>
              Support
            </Typography>
            <Typography variant="body2">Help Center</Typography>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
              Plans
            </Typography>
            {Plans.map((item, idx) => (
              <Typography key={idx} variant="body2" sx={{ mb: 0.5 }}>
                {item}
              </Typography>
            ))}
            <Typography variant="h6" sx={{ fontWeight: "bold", mt: 3, mb: 1 }}>
              Community
            </Typography>
            {Community.map((item, idx) => (
              <Typography key={idx} variant="body2" sx={{ mb: 0.5 }}>
                {item}
              </Typography>
            ))}
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
              Legal
            </Typography>
            {BottomFooter.map((item, idx) => (
              <Typography key={idx} variant="body2" sx={{ mb: 0.5 }}>
                {item}
              </Typography>
            ))}
            <Box sx={{ mt: 4, display: "flex", gap: 1, fontSize: "20px" }}>
              <FaLinkedin />
              <FaGithub />
              <FaInstagram />
              <SiLeetcode />
            </Box>
          </Grid>
        </Grid>

        <Box
          sx={{
            mt: 3,
            mb: 2,
            borderTop: "1px solid #374151",
            pt: 3,
            textAlign: "center",
            width: "100%",
          }}
        >
          <Typography variant="body2">
            © {new Date().getFullYear()} AskConnect. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
