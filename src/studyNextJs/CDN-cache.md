# Cache từ đâu ra ? CDN ?

> Cơ chế CDN cache - Content Delivery Network

Client request lần đầu tiên -> chạy lên caching server

- Nếu không có -> chạy lên server gốc lấy dư liệu về và lưu trong cache

- Từ lần đó trở đi, client request lên data đó sẽ rất nhanh vì trong cache đã lưu data

> Nếu không có CDN thì sao ?

Thì vì dụ server chính đặt ở Mỹ, thì những nước ở Châu Á request lên Mỹ thì rất lâu

> CDN là gì ? Lợi ích của CDN là gì ?

CDN là 1 mạng lưới caching toàn cầu, nếu mình ở Việt Nam request thì có thể chạy vào cache Server ở Singapore, lần đầu sẽ lâu để lấy data của origin server nhưng những lần sau thì chỉ cần lấy trong cache
