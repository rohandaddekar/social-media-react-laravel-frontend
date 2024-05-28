import useShowUser from "@/api/users/Show";
import PostCard from "@/components/Posts/Card";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const SingleProfile = () => {
  const { userId } = useParams();
  const authUser = useSelector((state) => state.authUser);
  const { data, error, isLoading, showUserReq, reFetchShowUser } =
    useShowUser();

  useEffect(() => {
    showUserReq(userId);
  }, [userId]);

  console.log("data: ", data);

  return (
    <>
      {isLoading ? (
        <p>loading...</p>
      ) : error ? (
        <p>failed to load</p>
      ) : (
        <div className="max-w-5xl mx-auto py-10">
          <div className="border rounded-lg pb-8">
            <div className="relative">
              <img
                src={data?.profile_banner_image}
                alt="Profile Banner"
                className="rounded-t-lg h-32 w-full object-cover"
              />
              <img
                src={data?.profile_image}
                alt="User Profile Image"
                className="absolute w-32 h-32 -bottom-20 left-10 rounded-full border-4 border-white bg-white"
              />
            </div>

            <div className="ml-36 mt-5 px-10 flex items-start justify-between">
              <div>
                <h1 className="block text-xl font-semibold">
                  {data?.first_name + " " + data?.last_name}
                </h1>
                <p className="text-gray-500 text-sm mt-1">{data?.about_me}</p>

                <div className="flex items-center gap-4 mt-2">
                  <p className="border text-sm px-2 py-1 rounded-md">
                    Followers: <b>16</b>
                  </p>
                  <p className="border text-sm px-2 py-1 rounded-md">
                    Followings: <b>38</b>
                  </p>
                </div>
              </div>

              {authUser?.id !== data?.id && (
                <div className="flex items-center gap-4">
                  <Button variant="outline" className="w-32">
                    Message
                  </Button>
                  <Button className="w-32">Follow</Button>
                </div>
              )}
            </div>
          </div>

          <div className="border rounded-lg mt-5 p-5">
            <h2 className="text-lg font-semibold border-b pb-3 mb-3">Posts</h2>

            <ul className="space-y-3">
              {data?.posts?.length > 0 ? (
                data?.posts?.map((post, i) => (
                  <li key={i}>
                    <PostCard
                      post={post}
                      setReFetch={() => reFetchShowUser(userId)}
                    />
                  </li>
                ))
              ) : (
                <li className="bg-gray-50 rounded-md p-3 text-center">
                  no post yet...
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleProfile;
