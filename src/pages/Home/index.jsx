import LeftSection from "@/pages/Home/partials/LeftSection";
import MidSection from "@/pages/Home/partials/MidSection";
import RightSection from "@/pages/Home/partials/RightSection";
import { useSelector } from "react-redux";

const Home = () => {
  const authUser = useSelector((state) => state.authUser);

  return (
    <>
      <section className="container py-10 grid grid-cols-12 items-start gap-5">
        <div className="sticky top-24 col-span-3 border rounded-lg hidden lg:block">
          <LeftSection authUser={authUser} />
        </div>
        <div className="col-span-12 md:col-span-9 lg:col-span-6">
          <MidSection />
        </div>
        <div className="sticky top-24 hidden md:block col-span-3 p-5 border rounded-lg">
          <RightSection authUser={authUser} />
        </div>
      </section>
    </>
  );
};

export default Home;
