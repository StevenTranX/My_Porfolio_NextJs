```js
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string,
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: "John Doe" });
}
```

Ở trên là đoạn mã để cài đặt 1 cái API server trong nextJS

Tuy nhiên ở đây ra có 1 vài vấn đề

Nếu như app của chúng ta cần gọi đến hàng chục hàng trăm sản phẩm thì ta phải viết bấy nhiêu trang -> không ổn

Để khắc phục được vấn đề này, ta sẽ nghĩ đến `proxy server` -> `http-proxy`
