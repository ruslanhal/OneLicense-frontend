import React, { useState } from "react";

export default function Tabs() {
  const [isHover, setIsHover] = useState(false);
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
      <rect width="40" height="40" rx="20" fill={isHover?"#E0D8CF":"#F9F9F9"}/>
      <path
        d="M16.6522 16.6522H16.6595M26.5788 21.3343L21.3416 26.5715C21.2059 26.7074 21.0448 26.8151 20.8675 26.8886C20.6901 26.9622 20.5 27 20.308 27C20.1161 27 19.926 26.9622 19.7486 26.8886C19.5713 26.8151 19.4101 26.7074 19.2745 26.5715L13 20.3044V13H20.3044L26.5788 19.2745C26.8509 19.5482 27.0037 19.9184 27.0037 20.3044C27.0037 20.6903 26.8509 21.0606 26.5788 21.3343Z"
        stroke="#444444"
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
