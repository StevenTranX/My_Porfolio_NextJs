import { GetStaticProps, GetStaticPropsContext } from "next";
import { Inter } from "next/font/google";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import MainLayout from "@/layout/main";
import RootLayout from "./layout";
import { FeatureWorks, HeroSection, RecentPosts } from "@/components/home";
import { SEO } from "@/components/common/seo";

const inter = Inter({ subsets: ["latin"] });

interface PropsData {
  posts: any[];
}

const url = "https://js-post-api.herokuapp.com/api/posts?_page=1";

export default function Home({ posts }: PropsData) {
  const router = useRouter();

  function goToDetailPage() {
    router.push({
      pathname: "/posts/[postId]",
      query: {
        postId: 123,
        ref: "social",
      },
    });
  }

  return (
    <>
      <SEO
        data={{
          title: "Trần Trọng Tín - Front End Developer",
          description:
            "Hi everybody, thank you for paying a visit to my website, this is a mini project built by NextJs and Typescript",
          url: "localhost:3000",
          thumbnailUrl: "",
        }}
      />
      <MainLayout>
        <HeroSection />;
        <RecentPosts />
        <FeatureWorks />
      </MainLayout>
    </>
  );
}

// export const getStaticProps: GetStaticProps<PropsData> = async (
//   context: GetStaticPropsContext
// ) => {
//   const response = await fetch(url);
//   const data = await response.json();

//   return {
//     props: {
//       posts: data.data,
//     },
//   };
// };
