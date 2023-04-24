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

### 1. Viết hàm getPostList

         Khi mà ta lấy data từ prop trong components của file /blogs/index.tsx ta phải
            1. Read all markdown file in directory

```js [class="line-numbers"]
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

### 2. Gray-matter có thể làm được gì ?

---

title: ....
author: ...
slug: ....

---

Markdown will be parsed from here

> Nhớ đọc thêm ở trang chủ gray-matter github để xem nó trả ra object gồm những gì - thường thì trả ra { content : ..., data : { title : 'Hello', slug : 'Home' } }

=> Vậy ta sẽ dùng parse ra ntn ?

Ở lần trước ta đã có fileContents - nghĩa là nội dùng file markdown, bây giờ sẽ import gray-matter và sử dụng nó

```js [class="line-numbers"]
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

### 3. Sau khi hoàn thành xong hàm getPostList - trả ra data postList : { id, slug, title , ....} từ content của 1 file markdown,giờ ta sẽ dùng getStaticPaths và getStaticProps để lấy xuống và render ra HTML

```tsx index.tsx
export const getStaticProps: GetStaticProps<BlogListPageProps> = async () => {
  // convert markdown into javascript objects

  const postList = await getPostList();

  return {
    props: {
      posts: postList,
    },
  };

  // lấy props là  array các posts để parse ra component
};
```

```tsx index.tsx
<MainLayout>
  <Container>
    <Box component="ul" sx={{ listStyleType: "none", p: 0 }}>
      {posts &&
        posts.map((post) => (
          <li key={post.id}>
            <Link href={`/blog/${post.slug}`}>
              <PostItem post={post}></PostItem>
            </Link>
            <Divider sx={{ my: 3 }} />
          </li>
        ))}
    </Box>
  </Container>
</MainLayout>

// loop array ra thành các tiêu đề bài post, tạo đường dẫn để user khi click vào bài blog thì qua trang blog detail
```

### 4. Làm sao để trang blog detail có thể hiện ra được bài post theo tương ứng với slug của user click vào ?

Ở file [slug].tsx, ta sẽ dùng hàm `find()` để tìm bài post có điều kiện tương ứng với slug

```ts
const post = postList.find((x) => x.slug === context.params?.slug);
// context.params.slug là đường dẫn hiện tại nếu như trùng với slug của bài post thì chuyển qua
if (!post) return { notFound: true };
```

### 5. Khi đã có bài post của file markdown rồi, tuy nhiên nó chỉ là 1 chuỗi html không xuống hàng gì cả, nhìn lộn xộn thì làm sao để parse ra trên UI giống như trang markdown ta viết

> Ta cần phải dùng 1 thư viện có tên là `unified` và cài thêm các plugins đi kèm như rehype, remark....

> (https://github.com/unifiedjs/unified)

Ở trên trang web cũng hướng dẫn code để tùy chỉnh, các thư viện cần cài cũng tương đương như trong code

```js
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeDocument from "rehype-document";
import rehypeFormat from "rehype-format";
import rehypeStringify from "rehype-stringify";
import { reporter } from "vfile-reporter";

const file = await unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypeDocument, { title: "👋🌍" })
  .use(rehypeFormat)
  .use(rehypeStringify)
  .process("# Hello world!");
```

Sau đó tùy chỉnh trong code của ta như sau :

```js
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
// sau đó cài đặt post.htmlContent thành dạng parse mới từ thư viện unified
```

> Lúc này ta đã có được htmlContent chính là từ các file markdown trong directory /blog/ giờ chỉ cần gán vào trong component

```js
<Container>
  <div dangerouslySetInnerHTML={{ __html: post.htmlContent || "" }}></div>
</Container>
```

### 6. làm sao để tự tùy chỉnh các dòng code, cũng như bật nightmode cho code, hay cho phép user copy code ?

Lúc này ta sẽ cần sử dụng đến plugin `remarkPrism` để download các file js và css để cho phần code của chúng ta thêm màu sắc và các tùy chỉnh hơn. Ta có thể tùy chỉnh các options đó ở trang [Prismjs](https://prismjs.com/)

Sau khi có 2 file css và js của prismjs thì ta sẽ import và gắn vào trong file \_app

```ts _app.ts
import "@/styles/prism.css";
```

```tsx [slug.tsx]
<Script src="/prism.js" strategy="afterInteractive"></Script>
```
