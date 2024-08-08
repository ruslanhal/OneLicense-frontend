import React, { useState } from "react";

export default function Approve() {
    const [hover, setHover]=useState(false)
  return (
    <button className="p-3 bg-[#F5F5F5] rounded-full duration-500 hover:bg-[#E0D8CF]"
    onMouseEnter={()=>setHover(true)}
    onMouseLeave={()=>setHover(false)}>
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.4 9L7.8 11.4L12.6 6.6M17 9C17 13.4183 13.4183 17 9 17C4.58172 17 1 13.4183 1 9C1 4.58172 4.58172 1 9 1C13.4183 1 17 4.58172 17 9Z"
        stroke={hover?'#444444':"#888888"}
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
    </button>
  );
}
