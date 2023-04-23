import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import { Container, Stack } from "@mui/material";
import { Box } from "@mui/system";
import Link from "next/link";
import * as React from "react";

export interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <Stack minHeight="100vh">
      <Header></Header>

      <Box component="main" flexGrow={1}>
        {children}
      </Box>
      <Footer></Footer>
    </Stack>
  );
}
