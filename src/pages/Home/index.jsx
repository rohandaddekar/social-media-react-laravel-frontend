import LeftSection from "@/pages/Home/partials/LeftSection";
import MidSection from "@/pages/Home/partials/MidSection";
import RightSection from "@/pages/Home/partials/RightSection";

const Home = () => {
  return (
    <>
      <section className="container py-10 grid grid-cols-12 items-start gap-5">
        <div className="sticky top-24 col-span-3 border rounded-lg hidden xl:block">
          <LeftSection />
        </div>
        <div className="col-span-12 md:col-span-12 lg:col-span-8 xl:col-span-6">
          <MidSection />
        </div>
        <div className="sticky top-24 hidden lg:block lg:col-span-4 xl:col-span-3 p-5 border rounded-lg">
          <RightSection />
        </div>
      </section>
    </>
  );
};

export default Home;
