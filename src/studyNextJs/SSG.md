# SSG ? getStaticProps ?

## SSG with HTML

NextJs hỗ trợ rất tốt những kỹ thuật để xử lý trong lúc build time, thì trong pp SSG này, NextJs hỗ trợ generate ra file HTML trước và được tái sử dụng lại cho mỗi lần request mới

- Nếu chúng ta không làm gì hết, chỉ tạo ra component và code HTML thuần, không sử dụng data gì thì mặc định phương pháp render sẽ là `static HTML generation` , lúc này khi build time ta sẽ có 1 file html sẵn

## SSG with HTML + JSON data

- Nếu chúng ta cần fetch API để render ra content, thì ta sẽ dùng method `getStaticProps` - đây là 1 hàm, khai báo để can thiệp fetch API trên `server`

```tsx
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
```

Những dòng code ở trên đều xảy ra ở trên server, sau đó sẽ truyền qua client bằng Props.

### Tại sao NextJs là server side render, tại sao client vẫn lấy được data ?

Data sẽ được lưu ở trong đoạn script của HTML có ID là `NEXT__DATA`, trong này sẽ có 1 file dữ liệu JSON, sau đó client sẽ truy cập được `NEXT__DATA` để lấy dữ liệu

Nếu như ta chỉ render 1 số ít trong `NEXT__DATA` thì ta nên map nó trước để giảm tải cho khu vực data

```js
  return {
    props: {
      posts: data.data.map(x => {id : x.id , title : x.title}),
    },
  };
  // với map như thế này, chỉ cần map ra id và title thôi không cần những dữ liệu còn lại
```

## SSG with dynamic routes
