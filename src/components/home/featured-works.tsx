import {
  Box,
  Container,
  Stack,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import Link from "next/link";
import * as React from "react";
import { PostCard } from "./post-card";
import { Post, Work } from "@/model";
import WorkList from "../work/work-list";

export interface FeatureWorksProps {}

const workList: Work[] = [
  {
    id: 1,
    title: "Designing Dashboard",
    createdAt: "1681470950923",
    updatedAt: "1681470950923",
    tagList: ["Dashboard"],
    shortDescription:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
    fullDescription: "",
    thumbnailUrl:
      "https://plus.unsplash.com/premium_photo-1675583054122-fde590d0932f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=480&q=80",
  },
  {
    id: 2,
    title: "Vibrant Portraits of 2023",
    createdAt: "1681470950923",
    updatedAt: "1681470950923",
    tagList: ["Illustration"],
    shortDescription:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
    fullDescription: "",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1424223022789-26fd8f34bba2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=480&q=80",
  },
  {
    id: 3,
    title: "365 Days of Malayalam type",
    createdAt: "1681470950923",
    updatedAt: "1681470950923",
    tagList: ["Typography"],
    shortDescription:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
    fullDescription: "",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1497015289639-54688650d173?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=480&q=80",
  },
];

export function FeatureWorks(props: FeatureWorksProps) {
  return (
    <Box component="section" pt={2} pb={4}>
      <Container>
        <Typography variant="h5">Featured Works</Typography>

        <WorkList workList={workList} />
      </Container>
    </Box>
  );
}
