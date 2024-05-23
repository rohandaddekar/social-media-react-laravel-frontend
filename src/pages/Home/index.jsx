import useAllPosts from "@/api/posts/All";
import { laravelEcho } from "@/lib/laravelEcho.config";
import { useEffect } from "react";

const Home = () => {
  const { allPostsReq, data, setData, isLoading } = useAllPosts();

  useEffect(() => {
    allPostsReq();
  }, []);

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
        <ul>
          {data?.map((post, i) => (
            <li key={i} className="bg-gray-300 p-5 my-3">
              {post?.content}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Home;
