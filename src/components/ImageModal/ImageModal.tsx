import React from "react";
import Cancel from "../../assets/icon_cancel.svg";

interface ImageModalProps {
  url: string;
  close: () => void;
}

export default function ImageModal({url, close}: ImageModalProps) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-[20020] h-full w-full"
      onClick={close}
    >
      <div className="relative max-w-full max-h-full p-4">
        
        <img
          src={url}
          alt="Modal content"
          className="max-w-full max-h-[90vh] object-contain"
        />
      </div>
    </div>
  );
}
