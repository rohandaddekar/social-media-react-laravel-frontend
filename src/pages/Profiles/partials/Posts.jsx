/* eslint-disable react/prop-types */

import { cn } from "@/lib/utils";
import PublishedPosts from "@/pages/Profiles/partials/PublishedPosts";
import ScheduledPosts from "@/pages/Profiles/partials/ScheduledPosts";
import { useState } from "react";
import { useSelector } from "react-redux";

const Posts = ({ userId }) => {
  const authUser = useSelector((state) => state.authUser);

  const [selectedTab, setSelectedTab] = useState("published-posts");

  const renderPosts = () => {
    switch (selectedTab) {
      case "published-posts":
        return (
          <PublishedPosts userId={userId} setSelectedTab={setSelectedTab} />
        );

      case "scheduled-posts":
        return (
          <ScheduledPosts userId={userId} setSelectedTab={setSelectedTab} />
        );

      default:
        return (
          <PublishedPosts userId={userId} setSelectedTab={setSelectedTab} />
        );
    }
  };

  return (
    <>
      <ul className="flex items-center gap-3 bg-gray-100 p-1 mt-5 rounded-md">
        <li
          className={cn([
            "w-full p-1.5 rounded-md text-center text-sm font-semibold cursor-pointer",
            selectedTab === "published-posts" ? "bg-white" : "bg-gray-100",
          ])}
          onClick={() => setSelectedTab("published-posts")}
        >
          Posts
        </li>
        {authUser?.id === +userId && (
          <li
            className={cn([
              "w-full p-1.5 rounded-md text-center text-sm font-semibold cursor-pointer",
              selectedTab === "scheduled-posts" ? "bg-white" : "bg-gray-100",
            ])}
            onClick={() => setSelectedTab("scheduled-posts")}
          >
            Scheduled Posts
          </li>
        )}
      </ul>

      <div className="mt-3">{renderPosts()}</div>
    </>
  );
};

export default Posts;
