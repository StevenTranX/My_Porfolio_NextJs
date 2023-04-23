import Cookies from "cookies";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import httpProxy from "http-proxy";
import { resolve } from "path";

// type Data = {
//   name: string
// }

export const config = {
  api: {
    bodyParser: false,
  },
};

const proxy = httpProxy.createProxyServer();

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  // don't send cookies to API server
  return new Promise((resolve) => {
    //convert cookies to header Authorization
    const cookies = new Cookies(req, res);
    if (cookies.get("access_token")) {
      const accessToken = cookies.get("access_token");
      req.headers.authorization = `Bearer ${accessToken}`;
    }
    req.headers.cookie = "";

    proxy.web(req, res, {
      target: process.env.API_URL,
      // target : đường dẫn chung
      changeOrigin: true,
      // changeOrigin : thay đổi đường dẫn phía sau /api/....
      selfHandleResponse: false,
      // Khi proxy nhận res từ api server thì trả kết quả về client luôn, không cần dòng status(200) ở dưới nữa
    });
    proxy.once("proxyRes", () => {
      resolve(true);
    });
  });

  // res.status(200).json({ name: "PATH - Match all here" });
}
