# Overview

SSG : Good but just for build-time, static page
CSR : Good for private app
SSR : Fetch new data as always, but performance concerns
ISR : SSG + dynamic data <3 , can replace SSR

# Right method to use

Public page : SSG
public page with dynamic data : ISR
Private page : SSG + CSR

No need SSR

# Incremental site Rendering

`Nó giống như SSG nhưng có thể request data on demand`

> Nếu 1 trang web ecommerce có 100.000 sản phẩm thì nếu dùng pp SSG ta phải đợi tầm 2h đồng hồ mới tải hết được data rồi mới render ra. Thì nó chắc chắn sẽ không hề tối ưu. Đến lúc này, ta sẽ sử dụng pp ISR, có thể custom gọi API khi cần thiết

Với ISR, ta có thể chọn 2 cách như sau

- `Faster Build` -> Generate ra chỉ 1.000 sản phẩm phổ biến lúc build time thôi. Còn request để gọi những sản phẩm khác thì sẽ generate sau. ( 1 phút )
- `Higher Cache Hit Rate ( cache more )` -> Nếu muốn có nhiều cache data hơn cho user thì dùng pp này

# How ?

## Trong hàm `getStaticProps` có thể config `revalidate : 60`

```js
export async function getStaticProps({ params }) {
  return {
    props: {
      product: await getProduct(params.id),
    },
    revalidate: 60,
  };
}
```

-> Khi build xong ( thời điểm 0s) thì đến lúc 60s thì luôn luôn trả về cho user từ cache, sau 60s trở đi, nếu như có ai đó request lên page thì nextJs vẫn tạm trả về trang cũ, sau đó trigger generate ra 1 cái version mới và update cache, từ lúc update cache thì trả về version mới.

Lưu ý : không phải cứ auto 60s đi generate 1 lần mà phải dựa vào lần request của user

## Nếu user request trúng sản phẩm 1001 thì sao ? Nghĩa là không có sẵn trong cache ?

-> Sử dụng `fallback : blocking` & `fallback : true` của `getStaticPaths`

`fallback : blocking` : gọi getStaticProps để generate ra file HTML và return về phía client. Những request sau sẽ serve trong cache

`fallback : true` : ngay lập tức trả về 1 route is fallback ( loading ), sau khi load thì mới update state

```js
export async function getStaticPaths({ params }) {
  const products = await getTop1000();
  const paths = products.map((product) => ({ params: { id: product.id } }));
  return {
    paths,
    fallback: "blocking",
  };
}
```
