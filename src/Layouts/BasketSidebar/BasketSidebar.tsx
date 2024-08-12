import Button from "@/components/Button/Button";
import React, {useEffect} from "react";
import {X, Trash2} from "react-feather";

interface BasketSideBarProps {
  close: (value: boolean) => void;
}

export default function BasketSidebar({close}: BasketSideBarProps) {
  const handleSidebarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    close(false);
  };

  // useEffect(() => {
  //   const fetchCart = async ()
  // }, []);

  return (
    <div
      className="fixed top-0 bottom-0 left-0 right-0 w-[100vw] h-[100vh] bg-black bg-opacity-30 z-[2000]"
      onClick={handleOverlayClick}
    >
      <div
        className="fixed right-0 top-0 bottom-0 bg-[#f2f2f2] w-[300px] shadow-lg p-4 flex flex-col"
        onClick={handleSidebarClick}
      >
        <div className="flex justify-between items-center mb-4">
          <div className="font-bold">Your cart - 1 items</div>
          <X className="h-[20px] cursor-pointer" onClick={() => close(false)} />
        </div>

        <div className="flex bg-white p-2 rounded-md items-center gap-0">
          <div className="w-[50px] h-[50px] bg-black m-2 mr-4 ml-0"></div>
          <div className="flex flex-col w-[180px] h-[60px] ">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold mb-[14px]">Image</span>
              <span className="text-sm font-semibold mb-[14px]">$20.00</span>
            </div>

            <div className="flex items-center">
              <div className="flex items-center justify-center bg-gray-200 w-[20px] h-[20px] text-xs font-semibold rounded-tl-md rounded-bl-md cursor-pointer p-3 hover:bg-gray-300">
                –
              </div>
              <div className="flex items-center justify-center bg-gray-200 w-[20px] h-[20px] text-xs font-medium p-3 hover:bg-gray-300 cursor-pointer">
                1
              </div>
              <button className="flex items-center justify-center bg-gray-200 w-[20px] h-[20px] text-xs font-bold rounded-tr-md rounded-br-md cursor-pointer p-3 hover:bg-gray-300">
                +
              </button>

              <Trash2 className="h-[16px] cursor-pointer stroke-gray-500 ml-1" />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 text-sm font-semibold">
          <div>Subtotal</div>
          <div>$20.00 AUD</div>
        </div>

        <div className="mt-5">
          <Button
            text="Check Out"
            styleType="button_dark"
            width="100%"
          ></Button>
        </div>
      </div>
    </div>
  );
}
