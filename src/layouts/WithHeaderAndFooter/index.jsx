import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { pvtEventListner } from "@/lib/laravelEcho.config";
import { toast } from "@/components/ui/use-toast";

const Index = () => {
  const authUser = useSelector((state) => state.authUser);

  if (!authUser) {
    return <Navigate to="/sign-in" />;
  }

  useEffect(() => {
    const listener = pvtEventListner(authUser?.token);
    listener
      .private(`notification.${authUser.id}`)
      .listen("NotificationEvent", (e) => {
        console.log("notification event: ", e);
        authUser?.id === e.notification.user_id &&
          toast({
            title: e.notification.data.message,
          });
      });

    return () => {
      listener.leave(`user-follow-status.${authUser.id}`);
    };
  }, []);

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
