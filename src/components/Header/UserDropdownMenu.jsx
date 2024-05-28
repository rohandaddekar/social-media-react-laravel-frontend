import { Loader2, LogOut, User } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useSignOut from "@/api/auth/SignOut";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserDropdownMenu = () => {
  const navigate = useNavigate();
  const authUser = useSelector((state) => state.authUser);
  const { signOutReq, isLoading } = useSignOut();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="w-10 h-10 border rounded-full cursor-pointer">
          <img
            src={authUser?.profile_image}
            alt="User"
            className="w-full h-full object-contain rounded-full"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => navigate(`/profiles/${authUser?.id}`)}
          >
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={signOutReq}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
            {isLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdownMenu;
