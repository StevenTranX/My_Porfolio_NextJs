import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import * as React from "react";
import avatarSmall from "../../images/avatarSmall.jpg";

export function HeroSection() {
  return (
    <Box component="section" pt={{ md: 18, xs: 4 }} pb={{ md: 9, xs: 7 }}>
      <Container>
        <Stack
          spacing={4}
          direction={{ md: "row", xs: "column-reverse" }}
          alignItems={{ md: "flex-start", xs: "center" }}
          textAlign={{ xs: "center", md: "left" }}
        >
          <Box>
            <Typography
              mb={{ md: 5, xs: 3.5 }}
              fontWeight="bold"
              component="h1"
              variant="h3"
            >
              Hi, I am John, <br /> Creative Technologist
            </Typography>
            <Typography mb={{ md: 5, xs: 3.5 }} variant="body1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consequatur, laboriosam? Earum error sed a eaque iste et, facilis
              eveniet dolor veniam enim, unde placeat iure blanditiis fugiat
              rerum optio. Vero.
            </Typography>
            <Button size="large" variant="contained">
              Download Resume
            </Button>
          </Box>
          <Box
            sx={{
              minWidth: "240px",
              boxShadow: "-20px 11px",
              borderRadius: "50%",
              color: "secondary.light",
            }}
          >
            <Image src={avatarSmall} alt="avatar" />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
