---
slug: convert-markdown-to-html
title: Authentication and Authorization in NextJs ?
author: Steven Trần
author_title: "Fresher Dev"
author_url: https://github.com/StevenTranX
author_image_url: https://github.com/StevenTranX
tags: [NextJs, NextJs testing]
publishedDate: "2023-04-22T10:00:00Z"
---

This is a short description to demonstrate step by step how we can implement Authentication with Cookie http-only in NextJs

<!-- truncate -->

# Authentication vs Authorization

Authentication : Who are you ?

Authorization : Are you allowed to do that ?

> Ví dụ mình là 1 nhân viên trong 1 công ty, khi mình vào công ty thì mình phải xuất trình thẻ, giấy tờ - Authentication

> Sau khi vào công ty, đã xác minh minh là ai rồi, thì những phòng ban mình có được phép vào trong đó không gọi là Authorization

## Lưu Token ở đâu

- Local Storage : Bị XSS attack -> Những trang không liên quan tới tài chính

- Cookies : Bị CSRF attack -> Liên quan tới tài chính tiền bạc, có độ bảo mật tốt hơn, bên client-side không bị lấy

Với NextJs -> lưu ở Cookies dạng HTTP-only

## Làm sao để ngăn chặn XSS ?

C1. Dùng sanitize - DOM-purify - Thư viện này sẽ hỗ trợ loại bỏ các thẻ script rồi mới render chuỗi html lên

C2. Dùng OTP - Yêu cầu người dùng phải gửi OTP từ điện thoại để xác thực

## Flow của việc lưu token ?

> Dùng NextJs để làm API proxy

1. Client gửi request - lúc này ta có thể giấu được domain ( lưu trong constant )
2. Client sẽ thông qua API proxy ( nextJs ), API proxy sẽ forward API lên server
3. Thành công, server trả về status 200 + token
4. Token này đi qua API proxy, API proxy này lưu token vào HTTP-only Cookies
5. Sau khi lưu xong, kiểm tra nếu trong cookies có accessToken thì đính kèm vào request.headers.authorization = `Bearer accessToken`

![NextJs Authentication Flow](./Capture.PNG)

## Vì sao lại là HTTP Cookies ? Bảo mật ntn so với cookies thường ?

Cookies thường có thể dùng Javascript để đọc và lấy nội dung ra - Ngược lại HTTP only Cookies thì không dùng được Javascript để đọc

Trong trường hợp user bị tấn công, hacker dùng javascript tấn công để lấy token, thì không lấy được token.

## Demo code của flow lưu token ?

### 0. Theo như flow ở trên thì ta sẽ dùng NextJs để làm API - PROXY

Muốn như vậy ta sẽ cài đặt thư viện http proxy để làm được việc này

Sau đó ta sẽ làm theo như trong doc

```bash
yarn add http-proxy
yarn add --dev @types/http-proxy

```

```js
var http = require("http"),
  httpProxy = require("http-proxy");
//import

let proxy = httpProxy.createProxyServer({});

// Viết hàm handler để xử lý cho gọn

export default function handler(req, res) {
  return new Promise((resolve) => {
    req.headers.cookies = "";

    proxy.web(req, res, {
      target: process.env.API_URL,
      // baseURL
      changeOrigin: true,
      // thay đổi đường dẫn phía sau
      selfHandleResponse: false,
      // có tự handle response này hay không hay là forward ?
    });
    proxy.once("proxyRes", () => {
      resolve(true);
    });
  });
}

var server = http.createServer(handler);
```

### 1. Đầu tiên ta phải fix lỗi API resolve but no response ở file [...path].ts

Lý do tại sao lại hiện lên lỗi này ? Vì trong hàm handler không trả về 1 cái response gì cả nên báo lỗi => nên return 1 cái promise

### 2. Xử lý ở file `login.ts`

> Theo như flow, thì đầu tiên ta sẽ check xem method có phải là post không, nếu không thì return lỗi 404 với message 'method not supported'

```js
if (req.method !== "POST")
  return res.status(404).json({ message: "method not supported" });
```

> Riêng với request login ta sẽ tự handle nên ta sẽ config `selfHandleResponse : true` và sẽ tự xử lý response với hàm handleLoginResponse

```ts
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST")
    return res.status(404).json({ message: "method not supported" });

  return new Promise((resolve) => {
    // don't send cookies to API server
    req.headers.cookie = "";

    const handleLoginResponse: ProxyResCallback = (proxyRes, req, res) => {

      });
    };

    proxy.once("proxyRes", handleLoginResponse);
    proxy.web(req, res, {
      target: process.env.API_URL,
      // target : đường dẫn chung
      changeOrigin: true,
      // changeOrigin : thay đổi đường dẫn phía sau /api/....
      selfHandleResponse: true,
      // Khi proxy nhận res từ api server thì trả kết quả về client luôn, không cần dòng ở dưới nữa
    });
  });

  // res.status(200).json({ name: "PATH - Match all here" });
}
```

> Vậy trong hàm handleLoginResponse này mình sẽ xử lý cái gì ?

```js - theo như document
const handleLoginResponse: ProxyResCallback = (proxyRes, req, res) => {
  let body = "";
  proxyRes("data", function (chunk) {
    // cộng chunk vào body
    body += chunk;
  });
  proxyRes.on("end", function () {
    // sau khi stream data về cho nextJs thì làm gì ?
    try {
    const {accessToken, expiredAt} = JSON.parse(body); // expected  1 cái object gồm accessToken và expiredAt

    // sau khi có Token rồi thì ta sẽ lưu vào http-only cookies

    ( res as NextApiResponse).status(200).json('login sucessfully')
  });
    } catch {
 ( res as NextApiResponse).status(500).json('something went wrong')
    }

};

```

> Xử lý lưu http cookies

```js

import Cookies from 'cookies'
proxyRes.on("end", function () {
    // sau khi stream data về cho nextJs thì làm gì ?
    try {
    const {accessToken, expiredAt} = JSON.parse(body); // expected  1 cái object gồm accessToken và expiredAt

    // sau khi có Token rồi thì ta sẽ lưu vào http-only cookies
    const cookies = new Cookies(req, res, { secure : process.env.NODE_ENV !== 'development'})
    cookies.set('access_token', accessToken, {
        httpOnly : true,
        sameSite : 'lax',
        expires : new Date(expiredAt)
    })


    ( res as NextApiResponse).status(200).json('login sucessfully')
    } catch {
 ( res as NextApiResponse).status(500).json('something went wrong')
    }
    resolve(true)
}

```

> Sau khi đã lưu được http-only cookies thì ta phải gán vào headers.authorization thì mới có quyền cho user

```ts [...path].ts
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
      // Khi proxy nhận res từ api server thì trả kết quả về client luôn, không cần dòng ở dưới nữa
    });
    proxy.once("proxyRes", () => {
      resolve(true);
    });
  });

  // res.status(200).json({ name: "PATH - Match all here" });
}
```

> handle logout như thế nào ?

1 tạo 1 file logout.ts

2. Cũng trong hàm handler đó, check method , set cookies rỗng

```js
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
```
