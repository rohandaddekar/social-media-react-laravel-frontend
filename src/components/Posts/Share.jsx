/* eslint-disable react/prop-types */

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Copy } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const ShareModal = ({ open, setOpen, link }) => {
  const fullLink = import.meta.env.VITE_APP_BASE_URL + link;

  const copyLinkHandler = () => {
    navigator.clipboard
      .writeText(fullLink)
      .then(() => {
        setOpen(false);
        toast({
          title: "Link copied successfully",
        });
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: "Failed to copy link",
        });
      });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Share Post</DialogTitle>
        </DialogHeader>

        <div className="relative border bg-gray-50 rounded-md p-3">
          <p className="text-sm">{fullLink}</p>

          <div
            className="absolute top-[6px] right-2 hover:bg-white hover:border w-8 h-8 rounded-md flex items-center justify-center cursor-pointer hover:opacity-60"
            onClick={copyLinkHandler}
          >
            <Copy className="w-4 h-4" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;
