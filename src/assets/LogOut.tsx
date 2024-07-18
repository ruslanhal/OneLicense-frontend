import React, { useState } from "react";

interface Data{
  onClick:()=>void
}

export default function LogOut({onClick}:Data) {
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
      onClick={()=>onClick()}
    >
      <rect width="40" height="40" rx="20" fill={isHover?"#E0D8CF":"#F9F9F9"} />
      <path
        d="M23.1111 23.8889L27 20M27 20L23.1111 16.1111M27 20H17.6667M20 23.8889C20 24.6122 20 24.9739 19.9205 25.2706C19.7047 26.0758 19.0758 26.7047 18.2706 26.9205C17.9739 27 17.6122 27 16.8889 27H16.5C15.4128 27 14.8692 27 14.4404 26.8224C13.8687 26.5856 13.4144 26.1313 13.1776 25.5596C13 25.1308 13 24.5872 13 23.5V16.5C13 15.4128 13 14.8692 13.1776 14.4404C13.4144 13.8687 13.8687 13.4144 14.4404 13.1776C14.8692 13 15.4128 13 16.5 13H16.8889C17.6122 13 17.9739 13 18.2706 13.0795C19.0758 13.2953 19.7047 13.9242 19.9205 14.7294C20 15.0261 20 15.3878 20 16.1111"
        stroke="#444444"
        stroke-width="1.1"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
