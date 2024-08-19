import React, { useState } from "react";

interface BasketProps {
  cartLength: number;
}

export default function Basket({ cartLength }: BasketProps) {
  const [isHover, setIsHover] = useState(false);

  return (
    <svg
      width="47"
      height="40"
      viewBox="0 0 47 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <rect
        x="0.25"
        y="0.25"
        width="39.5"
        height="39.5"
        rx="19.75"
        fill={isHover ? "#E5E5E5" : "#F9F9F9"}
        stroke="#EAEAEA"
        strokeWidth="0.5"
      />
      {cartLength!==0?<rect x="29" width="18" height="18" rx="9" fill="#E0D8CF" />:null}
      
      <path
        d="M24.2778 24.2778C23.388 24.2778 22.6667 24.9991 22.6667 25.8889C22.6667 26.7787 23.388 27.5 24.2778 27.5C25.1676 27.5 25.8889 26.7787 25.8889 25.8889C25.8889 24.9991 25.1676 24.2778 24.2778 24.2778ZM24.2778 24.2778H18.0701C17.6987 24.2778 17.5127 24.2778 17.3598 24.2117C17.2249 24.1534 17.1078 24.0596 17.0226 23.9399C16.927 23.8057 16.8886 23.6263 16.8125 23.2713L14.8298 14.0187C14.752 13.6554 14.7125 13.474 14.6158 13.3383C14.5306 13.2186 14.4136 13.1244 14.2787 13.0661C14.1257 13 13.9407 13 13.5692 13H13M15.4167 15.4167H25.7868C26.3682 15.4167 26.6586 15.4167 26.8538 15.5378C27.0247 15.6439 27.1498 15.8103 27.2044 16.0039C27.2667 16.225 27.1867 16.5041 27.0255 17.0628L25.9101 20.9295C25.8138 21.2635 25.7656 21.4302 25.6678 21.5541C25.5816 21.6635 25.4678 21.7491 25.3387 21.8017C25.193 21.8611 25.0198 21.8611 24.6742 21.8611H16.8107M17.0278 27.5C16.138 27.5 15.4167 26.7787 15.4167 25.8889C15.4167 24.9991 16.138 24.2778 17.0278 24.2778C17.9176 24.2778 18.6389 24.9991 18.6389 25.8889C18.6389 26.7787 17.9176 27.5 17.0278 27.5Z"
        stroke="#444444"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {cartLength!==0?<text
        x="38"
        y="10" 
        fontSize="10"
        fill="#444444"
        textAnchor="middle"
        alignmentBaseline="middle"
      >
        {cartLength}
      </text>:null}
    </svg>
  );
}
