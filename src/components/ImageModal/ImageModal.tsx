import React from "react";
import Cancel from "../../assets/icon_cancel.svg";

interface ImageModalProps {
  url: string;
  close: () => void;
}

export default function ImageModal({ url, close }: ImageModalProps) {
  return (
    <div className="fixed top-0 bottom-0 right-0 left-0 flex items-center justify-center bg-black bg-opacity-70 z-[20020]" onClick={()=>close()}>
      <div className="relative">
        <button 
          onClick={() => close()} 
          className="absolute top-2 right-2 bg-transparent border-none cursor-pointer"
        >
          <img src={Cancel} alt="Cancel" />
        </button>
        <img src={url} alt="Modal content" className="max-w-full max-h-full" />
      </div>
    </div>
  );
}

