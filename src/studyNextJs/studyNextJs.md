# 20/3/2023

## Những đặc điểm nổi bật khi làm việc trong môi trường nextJS :

1. Cấu trúc routing nằm sẵn trong folder pages

Ví dụ url.com/products/ thì chỉ cần tạo thư mục products trong pages

2. Fast refresh :

Khi sửa đổi code muốn đối chiếu ở browser thì nextjs sẽ hiện icon loading, và lập tức thay đổi không cần refresh -> cực kỳ nhanh

3. Hỗ trợ Css module

## Tips

background-gradient : meshgradient.com

```css
/* 
Breakpoints : 

sm : min-width : 640px // small device
md : min-width : 768px // medium 
lg : min-width : 1024px // large device
xl : min-width : 1280px // extra large 
2xl: min-width : 1536px // 2 x extra large device

*/
```

---

## Routing trong NextJs

### 1. Cơ chế routing

> Routing trong NextJs dựa vào cơ chế file-based system, nghĩa là so với React thì Nextjs chỉ cần tạo folder và tạo file thôi không cần config nhiều như React-router-dom

Ví dụ ta có trang chủ là `/` muốn có trang `products/[productId]` thì tạo 1 folder `products` sau đó tạo file `[id].jsx`

> Nếu ta có Nested Route, 2 cấp đều dùng dynamic thì xử lý ntn ?

Folder cũng tạo dynmic luôn thay vì //folder-products thì //folder-[products], rồi ở trong folder này ta có thể tạo file [dynamic].tsx

> Muốn bắt tất cả route ( tất cả các cấp thì dùng ) - [...slug]

### 2. Chuyển route ( navigate ) trong NextJs

Chuyển route trong NextJS vẫn dùng thẻ <Link> , tuy nhiên để chuyển dynamicRoute thì ta chuyển

```jsx
<Link href="/products/<id>">
    <a>Go to somewhere<a>
</Link>
```

Vì sao lại cần phải lồng thẻ <a> ở trong thẻ Link trong khi chỉ mỗi thẻ Link là chuyển trang được rồi ?

Vì SEO, cần phải có thẻ ngữ nghĩa, chuyển trang thì dùng thẻ a để tối ưu seo, thẻ link bot google sẽ không biết được

### 3. Các thuộc tính trong thẻ Link

Các thuộc tính trong thẻ link là

- href : bắt buộc

- passHref : truyền href từ thẻ Link sang thẻ con, trong trường hợp child là 1 component thì phải dùng forwardRef

- prefetch : quyết định xem có prefetch data của cái trang mà user sẽ navigate tới

```jsx
<Link href="/about">
    <a>Go to about page<a>
</Link>
```

Ví dụ thẻ link ở trên sẽ dẫn tới page about, prefetch sẽ giúp fetch trước cái trang about trong viewport của user, dẫn đến khi chuyển trang thì sẽ rất nhanh

- scroll : có scroll lên đầu trang khi chuyển trang mới không ?

### 4. Navigate như react-router-dom

Muốn sử dụng chuyển trang trong hàm thì ta làm ntn ?

1. Dùng useRoute()

```tsx
const route = useRoute();
const handleSubmit = () => {
    ...
    route.push('/about')

    route.push({
        pathName : '/about',
        query : {
            view : category,
        }
    })
}
```

Ngoài ra route còn cung cấp cho chúng ta 1 vài phương thức như

```js
route.push();
route.replace();
route.prefetch();
route.back();
route.reload();
```

### 5. Prefetching hoạt động ntn ?

Prefetch là fetch cái trang cần đến trước khi user click vào ,nên khi cuyển trang rất nhanh

- Nhưng chỉ <link> ở viewport của user thôi
- NextJs dùng Intersection Observer API để phát hiện
- Prefetching chỉ enable ở production thôi, ở môi trường dev thì không hoạt động
- Khi user có network chậm thì chức năng này bị tắt.
