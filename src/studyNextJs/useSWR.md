# useSWR

### useSWR stand for ?

stale-while-revalidate

### syntax

```js
const { data, error, isLoading, isValidating, mutate } = useSWR(
  key,
  fetcher,
  options
);
```

> key: a unique key string for the request (or a function / array / null) (details), (advanced usage)

> fetcher: (optional) a Promise returning function to fetch your data (details)

> options: (optional) an object of options for this SWR hook

### Global configuration

Import Component `SWRConfig` để bọc lại `app.tsx`

```js
function App() {
  return (
    <SWRConfig
      value={{
        refreshInterval: 3000,
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
        // khai báo value : trong đó có refresherInterval
      }}
    >
      <Dashboard />
    </SWRConfig>
  );
}
```

### Những options trong hook

`revalidateOnFocus` : Khi user từ trang khác focus qua thì refetch lại, mặc định true
`revalidateOnMount` : Khi component mount thì lập tức fetch, không auto, tùy chỉnh true false
`revalidateOnReconnect` : Khi user mất mạng hoặc từ chế độ sleep thì cài đặt để fetch mới

`refreshInterval` : tự động fetch data sau 1 khoảng thời gian ( miliseconds), trong trường hợp trang web cần thay đổi nội dung thường xuyên

`dedupingInterval` : chỉ được gọi request sau 1 khoảng thời gian ( milisecond )

`onLoadingSlow` : callback function khi 1 request mất nhiều thời gian để load
`onSuccess` : callback khi gọi api thành công
`onError` : callback khi api lỗi
