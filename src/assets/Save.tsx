import React, { useState } from "react";

export default function Save() {
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
      <rect width="40" height="40" rx="20" fill={isHover?"#E0D8CF":"#F9F9F9"} />
      <path
        d="M26.6 19.8V22.9733C26.6 24.2428 26.6 24.8775 26.3529 25.3624C26.1356 25.7889 25.7889 26.1356 25.3624 26.3529C24.8775 26.6 24.2428 26.6 22.9733 26.6H16.6267C15.3572 26.6 14.7225 26.6 14.2376 26.3529C13.8111 26.1356 13.4644 25.7889 13.2471 25.3624C13 24.8775 13 24.2428 13 22.9733V19.8M22.8222 16.0222L19.8 13M19.8 13L16.7778 16.0222M19.8 13V22.0667"
        stroke="#444444"
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
