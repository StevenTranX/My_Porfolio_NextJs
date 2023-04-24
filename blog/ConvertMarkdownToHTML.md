---
slug: convert-markdown-to-html
title: How to convert Markdown into Javascript Objects ?
author: Steven Trần
author_title: "Fresher Dev"
author_url: https://github.com/StevenTranX
author_image_url: https://github.com/StevenTranX
tags: [NextJs, NextJs testing]
image: https://images.ctfassets.net/c63hsprlvlya/IacLLeOBR5WCvdCPqKuff/6860b5cc464c4f54703a2befa3f706b4/nextjs3.webp
publishedDate: "2023-04-22T10:00:00Z"
---

This is a short description to demonstrate step by step how we can implement Converting MD to Javascript object, From that, we can parse those objects to NextJs Components

<!-- truncate -->

## Table of contents

# 1.Flow của việc render những file markdown ra thành file html

A. getStaticProps ()

         Khi mà ta lấy data từ prop trong components của file /blogs/index.tsx ta phải
            1. Read all markdown file in directory

```js[class="line-numbers"]
import matter from "gray-matter";
import { Post } from "@/model";

const BLOG_FOLDER = path.join(process.cwd(), "studyNextJs");
// để đường dẫn trong biến - process.cwd, cwd là current working directory -> Nghĩa là đường dẫn ở directory đang làm việc, folder là "blog"

export async function getPostList(): Promise<Post[]> {
  // read all markdown files
  const fileNameList = fs.readdirSync(BLOG_FOLDER);
  // Xem trong blog folder có bao nhiêu file - file này sẽ trả ra 1 array với tên các string tên file

  console.log(fileNameList);
  const postList: Post[] = [];

  for (const fileName of fileNameList) {
    const filePath = path.join(BLOG_FOLDER, fileName);
    // tạo 1 biến đường dẫn file cho từng file
    const fileContents = fs.readFileSync(filePath, "utf8");
    // tạo biến file đã đọc bằng utf8
  }
}
```

            2. Parse markdown files to javascript objects

> Ta cần dùng gray-matter để parse Markdown -> HTML

## Gray-matter có thể làm được gì ?

---

title: ....
author: ...
slug: ....

---

Markdown will be parsed from here

> Nhớ đọc thêm ở trang chủ gray-matter github để xem nó trả ra object gồm những gì - thường thì trả ra { content : ..., data : { title : 'Hello', slug : 'Home' } }

=> Vậy ta sẽ dùng parse ra ntn ?

Ở lần trước ta đã có fileContents - nghĩa là nội dùng file markdown, bây giờ sẽ import gray-matter và sử dụng nó

```js[class="line-numbers"]
import matter from "gray-matter";
const { data, excerpt, content } = matter(fileContents, {
  excerpt_separator: "<!-- truncate -->",
});
//excerpt_separator là dấu hiệu để phân tách giữa đề mục và phần nội dung

//Sau đó ta sẽ tạo 1 biến có array rỗng, rồi push những js objects đó vào trong array, rồi truyền xuống props cho component sử dụng là xong

const postList: Post[] = [];
postList.push({
  id: fileName,
  slug: data.slug,
  title: data.title,
  author: {
    name: data.author,
    title: data.author_title,
    profileUrl: data.author_url,
    avatarUrl: data.author_image_url,
  },
  tagList: data.tags,
  publishedDate: new Date().getTime().toString(),
  description: excerpt || "",
  mdContent: content,
});

return postList;
```

            3. Pass result to component props

B. loop data from props and render to UI
