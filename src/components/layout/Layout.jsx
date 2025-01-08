import { Outlet, useNavigate } from "react-router";
import classes from "./Layout.module.css";
import Header from "./Header";

export default function Layout() {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
