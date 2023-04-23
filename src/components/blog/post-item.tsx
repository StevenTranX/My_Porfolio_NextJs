import { Post } from "@/model";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { format } from "date-fns";

export interface PostItemProps {
  post: Post;
}

export default function PostItem({ post }: PostItemProps) {
  return (
    <Box>
      <Typography variant="h5" fontWeight="bold">
        {post.title}
      </Typography>

      <Stack direction="row" my={2}>
        <Typography>
          {format(new Date(post.publishedDate), "dd MM yyyy")}
        </Typography>
        <Divider orientation="vertical" sx={{ mx: 2 }} flexItem />
        <Typography> {post.tagList.join(", ")}</Typography>
      </Stack>

      {/* <Typography variant="body1" my={2} sx={{ display: "flex" }}></Typography> */}
      <Typography variant="body2">{post.description}</Typography>
    </Box>
  );
}
