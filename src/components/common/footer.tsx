import * as React from "react";
import { Box } from "@mui/system";
import { Icon, Stack, Typography } from "@mui/material";
import { Facebook, Instagram, Twitter, LinkedIn } from "@mui/icons-material";

export interface FooterProps {}

export default function Footer(props: FooterProps) {
  const socialLinks = [
    {
      icon: Facebook,
      url: "https://google.com",
    },
    {
      icon: Instagram,
      url: "",
    },
    {
      icon: Twitter,
      url: "",
    },
    {
      icon: LinkedIn,
      url: "",
    },
  ];
  return (
    <Box component="footer" py={2} textAlign="center">
      <Stack direction="row" justifyContent="center">
        {socialLinks.map((item, idx) => (
          <Box
            key={idx}
            component="a"
            p={2}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon component={item.icon} sx={{ fontSize: 40 }} />
          </Box>
        ))}
      </Stack>
      <Typography>
        Copyright ©{new Date().getFullYear()} All rights reserved
      </Typography>
    </Box>
  );
}
