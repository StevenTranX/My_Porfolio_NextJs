import { Post } from "@/model";
import { getPostList } from "@/utils/posts";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import * as React from "react";

export interface BlogDetailPageProps {
  post: Post;
}

export default function BlogDetailPage({ post }: BlogDetailPageProps) {
  if (!post) return null;
  return <div>{post.mdContent}</div>;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const postList = await getPostList();
  return {
    paths: postList.map((post: Post) => ({ params: { slug: post.slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<BlogDetailPageProps> = async (
  context: GetStaticPropsContext
) => {
  const postList = await getPostList();
  const post = postList.find((x) => x.slug === context.params?.slug);
  if (!post) return { notFound: true };

  return {
    props: {
      post,
    },
  };
};
