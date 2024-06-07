import { useParams } from "react-router-dom";
import UserInfo from "@/pages/Profiles/partials/UserInfo";
import Posts from "@/pages/Profiles/partials/Posts";

const SingleProfile = () => {
  const { userId } = useParams();

  return (
    <>
      <div className="max-w-5xl mx-auto py-10 px-4">
        <UserInfo userId={userId} />

        <Posts userId={userId} />
      </div>
    </>
  );
};

export default SingleProfile;
