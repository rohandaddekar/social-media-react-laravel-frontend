import { Input } from "@/components/ui/input";
import { CheckCheck, File, Paperclip, Send } from "lucide-react";

const Messages = () => {
  return (
    <>
      <div className="col-span-9 rounded-r-md flex overflow-y-hidden flex-col justify-between">
        <div className="border rounded-md flex gap-4 bg-gray-100 p-2 m-2 mb-0">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQEZrATmgHOi5ls0YCCQBTkocia_atSw0X-Q&s"
            alt=""
            className="w-12 h-12 rounded-full"
          />
          <div className="w-full">
            <div className="flex items-center justify-between">
              <h2 className="font-bold">John Doe</h2>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-400">Online</p>
            </div>
          </div>
        </div>

        <div className="border rounded-md bg-gray-50 flex-1 m-2 overflow-y-auto">
          <ul className="h-full p-2 space-y-2">
            <li className="text-left">
              <div className="border p-4 max-w-sm inline-block bg-white rounded-[20px] rounded-tl-none">
                <p className="text-left text-sm">
                  Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem
                  ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum
                  dolor sit amet.
                </p>
                <p className="flex items-center justify-end gap-1 text-xs text-right mt-1 text-gray-400">
                  9:45 PM
                  <CheckCheck className="w-4 h-4 text-green-500" />
                </p>
              </div>
            </li>
            <li className="text-left">
              <div className="border p-2 max-w-sm inline-block bg-white rounded-lg">
                <img
                  src="https://d38b044pevnwc9.cloudfront.net/cutout-nuxt/enhancer/2.jpg"
                  alt=""
                  className="w-60 h-52 object-cover rounded-md"
                />
                <p className="flex items-center justify-end gap-1 text-xs text-right mt-1 text-gray-400">
                  9:45 PM
                  <CheckCheck className="w-4 h-4 text-green-500" />
                </p>
              </div>
            </li>
            <li className="text-left">
              <div className="border p-2 max-w-sm inline-block bg-white rounded-lg">
                <video controls className="w-60 h-52 object-cover rounded-md">
                  <source src="https://d38b044pevnwc9.cloudfront.net/cutout-nuxt/enhancer/2.mp4" />
                </video>
                <p className="flex items-center justify-end gap-1 text-xs text-right mt-1 text-gray-400">
                  9:45 PM
                  <CheckCheck className="w-4 h-4 text-green-500" />
                </p>
              </div>
            </li>
            <li className="text-left">
              <div className="border p-2 max-w-sm inline-block bg-white rounded-lg">
                <div className="w-full flex items-center gap-2">
                  <div className="bg-gray-500 rounded-full w-8 h-8 flex items-center justify-center p-2">
                    <File className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm">file-name.pdf</p>
                </div>
                <p className="flex items-center justify-end gap-1 text-xs text-right mt-1 text-gray-400">
                  9:45 PM
                  <CheckCheck className="w-4 h-4 text-green-500" />
                </p>
              </div>
            </li>

            <li className="text-right">
              <div className="border p-4 max-w-sm inline-block bg-white rounded-[20px] rounded-br-none">
                <p className="text-left text-sm">
                  Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem
                  ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum
                  dolor sit amet.
                </p>
                <p className="flex items-center justify-end gap-1 text-xs text-right mt-1 text-gray-400">
                  9:45 PM
                  <CheckCheck className="w-4 h-4 text-green-500" />
                </p>
              </div>
            </li>
            <li className="text-right">
              <div className="border p-2 max-w-sm inline-block bg-white rounded-lg">
                <img
                  src="https://d38b044pevnwc9.cloudfront.net/cutout-nuxt/enhancer/2.jpg"
                  alt=""
                  className="w-60 h-52 object-cover rounded-md"
                />
                <p className="flex items-center justify-end gap-1 text-xs text-right mt-1 text-gray-400">
                  9:45 PM
                  <CheckCheck className="w-4 h-4 text-green-500" />
                </p>
              </div>
            </li>
            <li className="text-right">
              <div className="border p-2 max-w-sm inline-block bg-white rounded-lg">
                <video controls className="w-60 h-52 object-cover rounded-md">
                  <source src="https://d38b044pevnwc9.cloudfront.net/cutout-nuxt/enhancer/2.mp4" />
                </video>
                <p className="flex items-center justify-end gap-1 text-xs text-right mt-1 text-gray-400">
                  9:45 PM
                  <CheckCheck className="w-4 h-4 text-green-500" />
                </p>
              </div>
            </li>
            <li className="text-right">
              <div className="border p-2 max-w-sm inline-block bg-white rounded-lg">
                <div className="w-full flex items-center gap-2">
                  <div className="bg-gray-500 rounded-full w-8 h-8 flex items-center justify-center p-2">
                    <File className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm">file-name.pdf</p>
                </div>
                <p className="flex items-center justify-end gap-1 text-xs text-right mt-1 text-gray-400">
                  9:45 PM
                  <CheckCheck className="w-4 h-4 text-green-500" />
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className="border rounded-md flex items-center gap-2 bg-gray-100 p-2 m-2 mt-0">
          <div className="bg-gray-500 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer">
            <Paperclip className="w-4 h-4 text-white" />
          </div>
          <Input
            placeholder="Type a message"
            className="flex-1 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <div className="bg-gray-500 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer">
            <Send className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Messages;
