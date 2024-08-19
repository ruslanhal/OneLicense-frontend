import React from "react";
import { Trash2 } from "react-feather";

interface CartItemProps {
  id: string;
  title: string;
  price: number;
  image: string;
  currency: string;
  handleDelete: (id: string) => void;
}

export default function CartItem({
  id,
  title,
  price,
  image,
  currency,
  handleDelete,
}: CartItemProps) {
  return (
    <div className="flex bg-white p-2 rounded-md items-center gap-0">
      <div className="w-[50px] h-[50px] m-2 mr-4 ml-0">
        <img src={image} alt={title} />
      </div>
      <div className="flex flex-col w-[180px] h-[60px]">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold mb-[14px]">{title}</span>
          <span className="text-sm font-semibold mb-[14px]">
            ${price} {currency}
          </span>
        </div>
        <Trash2
          className="h-[16px] cursor-pointer stroke-gray-500"
          onClick={() => handleDelete(id)}
        />
      </div>
    </div>
  );
}
