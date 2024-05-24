import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";

const RightSection = () => {
  return (
    <>
      <h2 className="text-lg font-semibold border-b mb-3 pb-2">
        Suggested for you
      </h2>
      <div className="space-y-3">
        <div className="flex gap-3 border p-3 rounded-lg">
          <img
            src={
              "https://preview.keenthemes.com/metronic-v4/theme/assets/pages/media/profile/profile_user.jpg"
            }
            alt={"User"}
            className="w-12 h-12 rounded-full bg-white"
          />
          <div className="w-full">
            <div className="flex gap-2 justify-between">
              <div>
                <NavLink
                  to={`/profile/`}
                  className="text-md font-semibold hover:underline hover:text-blue-600 transition-all ease-in-out"
                >
                  Alex Doe{" "}
                </NavLink>
                <p className="text-gray-500 text-xs">
                  Lorem ipsum dolor sit amet consectetur...
                </p>
              </div>
              <Button variant="outline" size="sm" className="h-7">
                Follow
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RightSection;
