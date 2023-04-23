// on server

import path from "path";
import fs from "fs";
// thư viện của nodejs
// fs là để đọc file có sẵn trên hệ thống bằng đường dẫn

import matter from "gray-matter";
import { Post } from "@/model";

const BLOG_FOLDER = path.join(process.cwd(), "blog");
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
    const { data, excerpt, content } = matter(fileContents, {
      excerpt_separator: "<!-- truncate -->",
    });

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
      publishedDate: data.publishedDate,
      description: excerpt || "",
      mdContent: content,
    });
  }

  return postList;
}
