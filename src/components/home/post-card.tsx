import { Post } from "@/model";
import { Card, CardContent } from "@mui/material";
import PostItem from "../blog/post-item";

export interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  if (!post) return null;

  return (
    <Card>
      <CardContent>
        <PostItem post={post} />
      </CardContent>
    </Card>
  );
}
