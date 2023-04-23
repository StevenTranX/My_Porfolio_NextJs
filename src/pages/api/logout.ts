// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import httpProxy, { ProxyResCallback } from "http-proxy";
import Cookies from "cookies";

type Data = {
  message: string;
};

export const config = {
  api: {
    bodyParser: false,
  },
};

const proxy = httpProxy.createProxyServer();

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST")
    return res.status(404).json({ message: "method not supported" });

  const cookies = new Cookies(req, res);
  cookies.set("access_token");
  // Không cần set value, nó sẽ tự động xóa cho mình, không cần config

  res.status(200).json({ message: "logout successfully" });

  // res.status(200).json({ name: "PATH - Match all here" });
}
