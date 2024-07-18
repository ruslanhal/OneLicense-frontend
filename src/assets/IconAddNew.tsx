import React, { useState } from "react";

export default function IconAddNew() {
  const [isHover, setIsHover] = useState(false);
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onMouseLeave={() => setIsHover(false)}
      onMouseEnter={() => setIsHover(true)}
    >
      <rect
        width="40"
        height="40"
        rx="20"
        fill={isHover ? "#E0D8CF" : "#F9F9F9"}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M20.0004 13.3999C20.3318 13.3999 20.6004 13.6685 20.6004 13.9999V19.3999H26.0004C26.3318 19.3999 26.6004 19.6685 26.6004 19.9999C26.6004 20.3313 26.3318 20.5999 26.0004 20.5999H20.6004V25.9999C20.6004 26.3313 20.3318 26.5999 20.0004 26.5999C19.669 26.5999 19.4004 26.3313 19.4004 25.9999V20.5999H14.0004C13.669 20.5999 13.4004 20.3313 13.4004 19.9999C13.4004 19.6685 13.669 19.3999 14.0004 19.3999H19.4004V13.9999C19.4004 13.6685 19.669 13.3999 20.0004 13.3999Z"
        fill="#444444"
      />
    </svg>
  );
}
