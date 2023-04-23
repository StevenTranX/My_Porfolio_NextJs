import * as React from "react";
import Box from "@mui/material/Box";

export interface HeaderMobileProps {}

export default function HeaderMobile(props: HeaderMobileProps) {
  return <Box display={{ xs: "block", lg: "none" }}>Header Mobile</Box>;
}
