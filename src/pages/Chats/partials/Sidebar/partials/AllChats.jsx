/* eslint-disable react/prop-types */

import UserCard from "@/pages/Chats/partials/Sidebar/partials/UserCard";
import useAllChats from "@/api/chats/AllChats";
import { useEffect } from "react";
import useChatMessageListner from "@/listners/chat/ChatMessage";
import { useSelector } from "react-redux";

const AllChats = () => {
  const authUser = useSelector((state) => state.authUser);

  const {
    data: dataAllChats,
    setData: setDataAllChats,
    error: errorAllChats,
    isLoading: isLoadingAllChats,
    allChatsReq,
  } = useAllChats();

  useEffect(() => {
    allChatsReq();
  }, []);

  const chatMessageListnerHandler = (e) => {
    console.log("chatMessageListnerHandler All Chat: ", e);

    if (e?.type === "created") {
      setDataAllChats((prev) => {
        const existingUser = prev.find(
          (user) =>
            user.user.id === e.message.sender_id ||
            user.user.id === e.message.receiver_id
        );

        if (!existingUser) {
          const newUserDetails =
            e.message.sender_id === authUser.id
              ? e.message.receiver
              : e.message.sender;

          const newUser = {
            user: newUserDetails,
            last_message: {
              id: e.message.id,
              message: e.message.message,
            },
          };

          return [...prev, newUser];
        }

        const updatedData = prev.map((user) => {
          if (
            user.user.id === e.message.sender_id ||
            user.user.id === e.message.receiver_id
          ) {
            return {
              ...user,
              last_message: {
                id: e.message.id,
                message: e.message.message,
              },
            };
          }
          return user;
        });

        return updatedData;
      });
    }

    if (e?.type === "updated") {
      setDataAllChats((prev) => {
        const updatedData = prev.map((user) => {
          if (
            user.user.id === e.message.sender_id ||
            user.user.id === e.message.receiver_id
          ) {
            if (user.last_message.id === e.message.id) {
              return {
                ...user,
                last_message: {
                  id: e.message.id,
                  message: e.message.message,
                },
              };
            }
          }
          return user;
        });

        return updatedData;
      });
    }

    if (e?.type === "deleted") {
      setDataAllChats((prev) => {
        const updatedData = prev.map((user) => {
          if (
            user.user.id === e.message.sender_id ||
            user.user.id === e.message.receiver_id
          ) {
            if (user.last_message.id === e.message.id) {
              return {
                ...user,
                last_message: {},
              };
            }
          }
          return user;
        });

        return updatedData;
      });
    }
  };
  useChatMessageListner(chatMessageListnerHandler);

  if (isLoadingAllChats) {
    return <p className="text-center mt-3 text-gray-500">loading...</p>;
  }

  if (errorAllChats) {
    return <p className="text-center mt-3 text-red-500">failed to load</p>;
  }

  return (
    <>
      {dataAllChats?.length > 0 ? (
        <ul className="mt-4 pt-0 space-y-3">
          {dataAllChats?.map((user, i) => (
            <UserCard key={i} user={user} />
          ))}
        </ul>
      ) : (
        <p className="mt-3 rounded-md text-gray-500 text-center">No Chats</p>
      )}
    </>
  );
};

export default AllChats;
