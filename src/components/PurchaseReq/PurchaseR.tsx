import Approve from "@/assets/Approve";
import Refuse from "@/assets/Refuse";
import React, { useState } from "react";

interface Image {
  images: string[];
  title: string;
  author: string;
  price: string;
}

export default function PurchaseR({images, title, author, price}:Image) {

  const [choosenImage, setChoosenImage] = useState<number>(0);

  return (
    <div className="flex flex-col items-center justify-center border border-gray-200 min-w-[16rem] max-h-[450px] max-w-full h-fit relative p-5 pt-10 bg-white transition-all duration-600">
      <div className="mt-1 w-[200px] h-[300px] flex items-center justify-center pointer-events-none relative">
        <img src={images[choosenImage]} alt={title} />
        <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
  
        </div>
        <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
          
        </div>
      </div>
      <div className="flex items-center gap-[4px] mt-2">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => setChoosenImage(index)}
            style={
              choosenImage === index
                ? { background: "#BABABA" }
                : { background: "#E8E8E8" }
            }
            className="h-[7px] w-[7px] rounded-full cursor-pointer"
          />
        ))}
      </div>
      <div className="flex justify-between items-center w-full mt-4">
        <div className="flex flex-col">
          <div className="text-[#444444] text-xs font-medium">
            {author}
          </div>
          <div className="text-[#888888] text-xs mt-1">{title}</div>
          <div className="text-[#444444] text-sm mt-2">{price}</div>
        </div>
        <div className="flex items-center gap-[5px]">
          <Refuse />
          <Approve />
        </div>
      </div>
    </div>
  );
}

