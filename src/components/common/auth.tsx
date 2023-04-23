import { useAuth } from "@/hooks";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

export interface AuthProps {
  children: React.ReactNode;
}

export default function Auth({ children }: AuthProps) {
  const router = useRouter();
  const { profile, firstLoading } = useAuth();

  useEffect(() => {
    if (!firstLoading && !profile?.username) router.push("/login");
    // Nếu loading xong rồi và không có username thì đá về trang login
  }, [firstLoading, profile, router]);

  if (!profile?.username) return <p>Loading....</p>;

  return <div>{children}</div>;
}
