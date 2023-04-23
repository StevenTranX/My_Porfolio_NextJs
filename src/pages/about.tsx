import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

const Header = dynamic(() => import("@/components/common/header"), {
  ssr: false,
});

export interface AboutPageProps {}

export default function AboutPage(props: AboutPageProps) {
  //* Demo dữ liệu tĩnh bên phía server ( header ...) và dynamic dữ liệu bên phía client
  //* Nhớ config { shallow : true} để không trigger hàm getStaticProps - chỉ muốn xử lý ở client thôi không đụng tới server

  const router = useRouter();
  const [postList, setPostList] = useState([]);
  const page = router?.query?.page;
  useEffect(() => {
    if (!page) return;
    (async () => {
      const response = await fetch(
        `https://js-post-api.herokuapp.com/api/posts?_page=${page}`
      );
      const data = await response.json();
      setPostList(data.data);
      // useSWR()
    })();
  }, [page]);
  const handleNextClick = () => {
    router.push(
      {
        pathname: "/about",
        query: {
          page: (Number(page) || 1) + 1,
        },
      },
      undefined,
      { shallow: true }
      // shallow = true là trigger update bên client thôi, không trigger getStatic props
    );
  };
  return (
    <Box>
      <Typography component="h1" variant="h3" color="primary.main">
        About Page
      </Typography>

      <Header />

      <ul className="post-list">
        {postList.map((post: any) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>

      <button onClick={handleNextClick}>Next Page</button>
    </Box>
  );
}

export async function getStaticProps() {
  console.log("get static props");
  return {
    props: {},
  };
}
