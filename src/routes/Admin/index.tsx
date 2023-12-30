import { Outlet } from "react-router-dom";
import HeaderAdmin from "../../components/HeaderAdmin/Index";

export default function Admin() {
    return (
      <>
        <HeaderAdmin />
        <Outlet />
      </>
    );
  }