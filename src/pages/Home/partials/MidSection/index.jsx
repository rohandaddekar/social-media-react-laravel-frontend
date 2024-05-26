import { useEffect, useState } from "react";
import useAllPosts from "@/api/posts/All";
import { laravelEcho } from "@/lib/laravelEcho.config";
import PostCard from "@/components/Posts/Card";

const MidSection = () => {
  const { allPostsReq, data, setData, isLoading, reFetchAllPosts } =
    useAllPosts();

  const [reFetch, setReFetch] = useState(false);

  useEffect(() => {
    allPostsReq();
  }, []);

  useEffect(() => {
    if (reFetch) {
      reFetchAllPosts();
    }

    return () => {
      setReFetch(false);
    };
  }, [reFetch]);

  useEffect(() => {
    laravelEcho.channel("post-channel").listen("PostEvent", (e) => {
      setData((prev) => [e.post, ...prev]);
    });

    return () => {
      laravelEcho.leave("post-channel");
    };
  }, []);

  return (
    <>
      {isLoading ? (
        <>loading...</>
      ) : (
        <ul className="space-y-3">
          {data?.data?.map((post, i) => (
            <li key={i}>
              <PostCard post={post} setReFetch={setReFetch} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default MidSection;
