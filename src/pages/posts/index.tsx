import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import {
  GetStaticPaths,
  GetStaticPathsContext,
  GetStaticProps,
  GetStaticPropsContext,
} from "next";

const inter = Inter({ subsets: ["latin"] });

interface PropsData {
  posts: any[];
}

const url = "https://js-post-api.herokuapp.com/api/posts?_page=1";
export default function Home2({ posts }: PropsData) {
  const handleBtnClick = () => {
    console.log("clicked");
  };
  return (
    <div>
      <Head>
        <title>Coffee Location</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.heroImage}>
          <Image
            src="/static/hero-image.png"
            alt="banner-img"
            width={700}
            height={400}
          ></Image>
        </div>
        {posts && posts.map((post) => <div key={post.id}>{post.title}</div>)}
      </main>
    </div>
  );
}

// export const getStaticPaths: GetStaticPaths = async (
//   context: GetStaticPathsContext
// ) => {
//   const postId = context.params.id;
//   const response = await fetch(
//     `https://js-post-api.herokuapp.com/api/posts/${postId}`
//   );
//   return {};
// };

export const getStaticProps: GetStaticProps<PropsData> = async (
  context: GetStaticPropsContext
) => {
  const response = await fetch(url);
  const data = await response.json();

  return {
    props: {
      posts: data.data,
    },
  };
};
