import React, { useState } from "react";

export default function DeleteAccount() {
    const [isHover, setIsHover]=useState(false)
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={()=>setIsHover(true)}
      onMouseLeave={()=>setIsHover(false)}
    >
      <rect width="40" height="40" rx="20" fill={isHover?"#EB2929":"white"} />
      <path
        d="M22.4 17.6L17.6 22.4M17.6 17.6L22.4 22.4M28 20C28 24.4183 24.4183 28 20 28C15.5817 28 12 24.4183 12 20C12 15.5817 15.5817 12 20 12C24.4183 12 28 15.5817 28 20Z"
        stroke={isHover?"white":"#EB2929"}
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
