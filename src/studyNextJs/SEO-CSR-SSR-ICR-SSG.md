# SEO ?

SEO là gì ? Seo stands for Search Engine Optimization, nôm na là khả năng tối ưu trang web để công cụ tìm kiếm như google có thể xếp hạng trang web của mình cao. Nhất là khi trang web hiện ra page 1 tìm kiếm của google

### Quá trình khi ta search 1 thứ gì đó ở trang web sẽ như thế nào ?

Khi ra search 1 thứ gì đó trên google thì sẽ có 3 bước

`Crawling - Indexing - Ranking`

1. Crawling là khi bot của google tìm thấy trang

2. Indexing là sau khi discoverd, bot google sẽ cố gắng hiểu cái trang này bằng HTML - HTML có thể gọi là ngôn ngữ giao tiếp giữa bot google và trang web

3. Sau đó bot google sẽ xếp hạng - ranking trang web dựa vào location, language, device của user đang tìm kiếm

### Vậy để cho bot Google hiểu rõ hơn về trang web, tối ưu SEO thì nên có những yếu tố nào ?

Đó là trang web của chúng ta phải render trước HTML, trong file HTML thì phải :

- Có thẻ semantics - ví dụ <p> là text <h1> là tiêu đề ....
- Có thẻ <meta> <title> trong thẻ head để khai báo title, description
- Có thẻ alt trong image

# Pre-rendering giữa NextJS và React

## Pre-rendering của NextJS

user make request -> server sends static HTML with data -> render HTML & download JS -> user sees HTML page with content but no interactivity -> JS loads -> user can interact

=> Server is responsible for rendering content

## Pre-rendering của Plain React App

user makes request -> server sends HTML with links -> download HTML & JS -> user see blank page -> JS loads -> user now interact

=> JS is responsible for rendering content

=> HTML của React được biểu diễn ở JS nên phải đợi JS load thì mới hiện ra full trang web chứ không có sẵn HTMl để load

# Pre-rendering giúp gì trong performance của NextJs ?

Pre-rendering sẽ render ra trang web tĩnh trước và lưu chúng trên máy chủ (CDN) - thay vì phải tạo động mỗi khi có yêu cầu từ khách hàng nên Pre-rendering có thể `Giảm thời gian phản hồi cho người dùng` vì

-

# SSG vs ISR vs SSR

## SSG - Static site Generator - Trình tạo trang web tĩnh - `getStaticProps`

Khi dùng phương pháp SSG này, HTML sẽ được predownloaded

- Nếu như data không có từ API trả về thì pre-render

- Nếu như phải đợi API từ data trả về thì fetch data in advanced trước rồi mới render HTML ( chẳng hạn như những website e-commerce)

## ISR - Incremental Site Rendering - `getStaticProps with revalidate`

Khi dùng pp này, y hệt như SSG, tuy nhiên có thêm 1 tùy chỉnh gọi là `specific interval`, lúc này website sẽ tự load lại để cập nhật

1st request - stale data

2nd request - fresh data

Ví dụ trang E-commerce, bình thường không có sale nhưng khi có sale thì có thể cài đặt trang web refresh lại mỗi 60s

## SSR -Severside Rendering - `getServersideProps`

- Khi mỗi lần page request thì HTML sẽ được tạo ra, cho nên nó sẽ chậm hơn so với 2 phương pháp kia
- Thường dùng ở trang new feeds

## Vậy chọn pp nào ?

Ưu tiên dùng SSG vì nó nhanh nhất,nhưng nếu cần update data dynamic thì dùng ISR
Không dùng được SSG và ISR thì dùng SSR

## Vậy còn CSR - Client Side Rendering ?

khi không quan trọng về performance và tối ưu SEO

Khi trang web thường xuyên phải update dữ liệu, không cần phải pre-render data thì có thẻ fetch ở client-side,
