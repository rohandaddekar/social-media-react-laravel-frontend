import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import UserDropdownMenu from "@/components/Header/UserDropdownMenu";
import { useSelector } from "react-redux";
import CreateOrUpdatePost from "@/components/Posts/CreateOrUpdate";

const Header = () => {
  const authUser = useSelector((state) => state.authUser);

  return (
    <>
      <header className="border-b">
        <div className="container flex items-center justify-between py-4">
          <NavLink to="/">
            <img
              src="/images/logo-with-name.svg"
              alt="LOGO"
              className="max-w-52"
            />
          </NavLink>

          <div className="flex items-center gap-5">
            <ul className="flex items-center gap-5">
              <li className="hover:underline transition-all ease-in-out">
                <NavLink to="/">Home</NavLink>
              </li>
              {!authUser && (
                <li>
                  <Button asChild>
                    <NavLink to="/sign-in">Sign In</NavLink>
                  </Button>
                </li>
              )}
            </ul>

            {authUser && (
              <>
                <CreateOrUpdatePost type={"create"} btnTitle={"Create Post"} />
                <UserDropdownMenu />
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
