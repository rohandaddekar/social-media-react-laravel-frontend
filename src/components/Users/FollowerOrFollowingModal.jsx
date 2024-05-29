/* eslint-disable react/prop-types */

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const FollowerOrFollowingModal = ({ open, setOpen, type, userId }) => {
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[450px]">
          <h1 className="font-semibold text-lg border-b pb-2">
            {type === "follower" ? "Followers" : "Followings"} - <b>28</b>
          </h1>

          <Input placeholder="Search" />

          <ul className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <li
                key={i}
                className="flex items-center justify-between gap-4 border rounded-md p-3"
              >
                <div className="w-full flex items-center gap-4">
                  <img
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
                    alt="user"
                    className="w-14 h-14 rounded-full"
                  />
                  <div className="w-full">
                    <NavLink
                      to={`/profiles/`}
                      className={"w-full text-md font-semibold hover:underline"}
                    >
                      John Doe
                    </NavLink>
                    <p className="text-xs text-gray-600">
                      Lorem ipsum dolor sit amet, consectetur adipisicing
                      elit...
                    </p>
                  </div>
                </div>

                <Button size="sm">
                  {type === "follower" ? "Follow" : "Unfollow"}
                </Button>
              </li>
            ))}
          </ul>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FollowerOrFollowingModal;
