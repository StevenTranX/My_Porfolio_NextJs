import * as React from "react";
import useSWR from "swr";

export interface StudentDetailProps {
  studentId: any;
}

const MILISECOND_TO_HOUR = 60 * 60 * 1000;

export function StudentDetail({ studentId }: StudentDetailProps) {
  const { data, error, mutate, isLoading } = useSWR(
    `/students/${studentId}`,
    null,
    {
      revalidateOnFocus: false,
      dedupingInterval: MILISECOND_TO_HOUR,
      // dedupingInterval có nghĩa là trong vòng khoảng thời gian định nghĩa, thì dù user có request API thì sẽ không thực thi, mà phải sau thời gian định nghĩa
    }

    // còn mutate thì dùng để update data, mặc định should reValidate là true, nghĩa là khi ví dụ ta có 1 cái form cần edit, thì khi mutate
    // khi mutate thì tạm thời UI sẽ được cập nhật dữ liệu tạm rồi âm thầm fetch API ở dưới để update data mới lên form
  );
  // tham số đầu tiên là url hoặc key, nếu như điền vào url thì không cần nhập fetcher vì nó sẽ tự lấy fetcher định nghĩa của swrConfig bọc ngoài app ( nghĩa là axios.get)
  // nếu như điền key ( giống react-query) thì phải định nghĩa fetcher useSWR(`key` , () => axiosClient.get(url))
  return <div> Name : {studentId?.name || "--"}</div>;
}
