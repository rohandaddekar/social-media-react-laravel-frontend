import Echo from "laravel-echo";
import Pusher from "pusher-js";

window.Pusher = Pusher;

export const publicEventListner = () => {
  return new Echo({
    broadcaster: "pusher",
    key: import.meta.env.VITE_APP_PUSHER_APP_KEY,
    cluster: import.meta.env.VITE_APP_PUSHER_APP_CLUSTER,
    forceTLS: true,
    encrypted: true,
  });
};

export const pvtEventListner = (token) => {
  return new Echo({
    broadcaster: "pusher",
    key: import.meta.env.VITE_APP_PUSHER_APP_KEY,
    cluster: import.meta.env.VITE_APP_PUSHER_APP_CLUSTER,
    forceTLS: true,
    encrypted: true,
    authEndpoint: import.meta.env.VITE_APP_API_BASE_URL + "/broadcasting/auth",
    auth: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });
};
