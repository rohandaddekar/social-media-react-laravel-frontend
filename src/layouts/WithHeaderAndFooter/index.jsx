import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const Index = () => {
  const authUser = useSelector((state) => state.authUser);

  if (!authUser) {
    return <Navigate to="/sign-in" />;
  }

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

export default Index;
