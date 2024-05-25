/* eslint-disable react/prop-types */

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const ImagesModal = ({ open, setOpen, images }) => {
  const [currentImg, setCurrentImg] = useState(0);

  const currentImgHandler = (type) => {
    if (type === "previous") {
      currentImg > 0 ? setCurrentImg(currentImg - 1) : setCurrentImg(0);
    }

    if (type === "next") {
      currentImg < images?.length - 1
        ? setCurrentImg(currentImg + 1)
        : setCurrentImg(images?.length - 1);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[700px] pt-10">
          <img
            src={images?.[currentImg]}
            alt="Post Image"
            className="w-full h-[450px] object-cover"
          />

          <div className="flex items-center justify-between mt-2">
            <Button
              variant="outline"
              className="flex items-center gap-1"
              onClick={() => currentImgHandler("previous")}
              disabled={currentImg === 0}
            >
              <ChevronLeft className="w-5 h-5 mt-[2px]" />
              Previous
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-1"
              onClick={() => currentImgHandler("next")}
              disabled={currentImg === images?.length - 1}
            >
              Next
              <ChevronRight className="w-5 h-5 mt-[2px]" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImagesModal;
