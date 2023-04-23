import * as React from "react";
import HeaderMobile from "./header-mobile";
import HeaderDesktop from "./header-desktop";

export interface HeaderProps {}

export default function Header(props: HeaderProps) {
  return (
    <>
      <HeaderMobile />
      <HeaderDesktop />
    </>
  );
}
