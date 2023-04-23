import * as React from "react";
import { Box, Container, Stack, Link as MuiLink } from "@mui/material";
import { ROUTE_LIST } from "./routes";
import Link from "next/link";
import { useRouter } from "next/router";
import cn from "classnames";
export interface HeaderDesktopProps {}

export default function HeaderDesktop(props: HeaderDesktopProps) {
  const router = useRouter();

  return (
    <Box display={{ xs: "none", lg: "block" }} sx={{ py: 2 }}>
      <Container>
        <Stack direction="row" justifyContent="flex-end">
          {ROUTE_LIST.map((route) => (
            <Link legacyBehavior key={route.path} href={route.path} passHref>
              <MuiLink
                sx={{ ml: 2, fontWeight: "medium" }}
                className={cn({ active: router.pathname === route.path })}
              >
                {route.label}
              </MuiLink>
            </Link>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
