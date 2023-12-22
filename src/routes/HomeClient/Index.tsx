import { Outlet } from "react-router-dom";
import HeaderClient from "../../components/HeaderClient/Index";

export default function HomePage() {
  return (
    <>
      <HeaderClient />
      <Outlet />
    </>
  );
}
