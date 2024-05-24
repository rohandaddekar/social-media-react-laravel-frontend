import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-auto">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default index;
