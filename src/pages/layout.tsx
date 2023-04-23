import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import { Stack } from "@mui/material";
import { Box } from "@mui/system";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Stack>
          <Header></Header>
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/blog">
            <a>Blog</a>
          </Link>
          <Link href="/works">
            <a>Works</a>
          </Link>
          <Box component="main">{children}</Box>
          <Footer></Footer>
        </Stack>
      </body>
    </html>
  );
}
