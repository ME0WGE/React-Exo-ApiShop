import { Outlet } from "react-router-dom";
import Navbar from "./src/Navbar/Navbar";
import Footer from "./src/Footer/Footer";

export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="main">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
