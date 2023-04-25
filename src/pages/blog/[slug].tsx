import { Post } from "@/model";
import { getPostList } from "@/utils/posts";
import { Box, Container } from "@mui/material";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import * as React from "react";
import rehypeAutolinkHeadings from "rehype-autolink-headings/lib";
import rehypeDocument from "rehype-document";
import rehypeFormat from "rehype-format";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify/lib";
import remarkParse from "remark-parse/lib";
import remarkPrism from "remark-prism";
import remarkRehype from "remark-rehype/lib";
import remarkToc from "remark-toc";
import { unified } from "unified";
import Script from "next/script";
import { SEO } from "@/components/common/seo";
import { defaultThumbnailUrl } from "@/constants/path";

export interface BlogDetailPageProps {
  post: Post;
}

export default function BlogDetailPage({ post }: BlogDetailPageProps) {
  if (!post) return null;
  return (
    <Box>
      <SEO
        data={{
          title: "NextJs Tips | Steven Tran",
          description:
            "Step by step tips to build some simple features using NextJs",
          url: `${process.env.HOST_URL}/blog/${post.slug}` || "",
          thumbnailUrl: post.thumbnailUrl || defaultThumbnailUrl,
        }}
      />
      <Container>
        <div dangerouslySetInnerHTML={{ __html: post.htmlContent || "" }}></div>
      </Container>
      <Script src="/prism.js" strategy="afterInteractive"></Script>
    </Box>
  );
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

  const file = await unified()
    .use(remarkParse)
    .use(remarkToc)
    .use(remarkPrism, { plugins: ["line-numbers"] })
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, { behavior: "wrap" })
    .use(rehypeDocument, { title: "Blog details page" })
    .use(rehypeFormat)
    .use(rehypeStringify)
    .process(post.mdContent || "");

  post.htmlContent = file.toString();

  return {
    props: {
      post,
    },
  };
};
