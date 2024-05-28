import { useEffect, useState } from "react";
import useAllPosts from "@/api/posts/All";
import { laravelEcho } from "@/lib/laravelEcho.config";
import PostCard from "@/components/Posts/Card";
import Stories from "@/components/Stories";

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
      setData((prev) => {
        const parsedImages = JSON.parse(e.post.images);

        console.log("e.post: ", e.post);
        return {
          ...prev,
          data: [{ ...e.post, images: parsedImages }, ...prev.data],
        };
      });
    });

    return () => {
      laravelEcho.leave("post-channel");
    };
  }, []);

  return (
    <>
      {/* START: Stories */}
      <Stories />
      {/* END: Stories */}

      {/* START: All Posts */}
      {isLoading ? (
        <>loading...</>
      ) : (
        <ul className="space-y-3">
          {data?.data?.length > 0 ? (
            data?.data?.map((post, i) => (
              <li key={i}>
                <PostCard post={post} setReFetch={setReFetch} />
              </li>
            ))
          ) : (
            <li className="bg-gray-50 rounded-md p-3 text-center">
              no post yet...
            </li>
          )}
        </ul>
      )}
      {/* END: All Posts */}
    </>
  );
};

export default MidSection;
