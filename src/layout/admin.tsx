import Auth from "@/components/common/auth";
import * as React from "react";

export interface AdminLayoutProps {}

export default function AdminLayout(props: AdminLayoutProps) {
  return (
    <Auth>
      <h1>Admin Layout</h1>
      <div>Sidebar</div>
    </Auth>
  );
}
