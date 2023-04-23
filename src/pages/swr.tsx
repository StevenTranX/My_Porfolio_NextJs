import { StudentDetail } from "@/components/swr";
import * as React from "react";

export default function swr() {
  return (
    <div>
      <h1> SWR playground</h1>
      <ul>
        <li>
          <StudentDetail studentId={""} />
        </li>
      </ul>
    </div>
  );
}
