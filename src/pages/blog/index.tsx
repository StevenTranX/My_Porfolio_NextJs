import PostItem from "@/components/blog/post-item";
import MainLayout from "@/layout/main";
import { Post } from "@/model";
import { getPostList } from "@/utils/posts";
import { Box, Container, Divider } from "@mui/material";
import { GetStaticProps } from "next";
import Link from "next/link";

interface BlogListPageProps {
  posts: Post[];
}

export default function BlogListPage({ posts }: BlogListPageProps) {
  console.log(posts);
  return (
    <MainLayout>
      <Container>
        <Box component="ul" sx={{ listStyleType: "none", p: 0 }}>
          {posts &&
            posts.map((post) => (
              <li key={post.id}>
                <Link href={`/blog/${post.slug}`}>
                  <PostItem post={post}></PostItem>
                </Link>
                <Divider sx={{ my: 3 }} />
              </li>
            ))}
        </Box>
      </Container>
    </MainLayout>
  );
}

export const getStaticProps: GetStaticProps<BlogListPageProps> = async () => {
  // convert markdown into javascript objects

  const postList = await getPostList();

  return {
    props: {
      posts: postList,
    },
  };
};
