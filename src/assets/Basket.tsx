import React, { useState } from "react";

export default function Basket() {
    const [isHover, setIsHover]=useState(false);
  return (
    <svg
      width="47"
      height="40"
      viewBox="0 0 47 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={()=>setIsHover(true)}
      onMouseLeave={()=>setIsHover(false)}
    >
      <rect
        x="0.25"
        y="0.25"
        width="39.5"
        height="39.5"
        rx="19.75"
        fill={isHover?"#E5E5E5":"#F9F9F9"}
        stroke="#EAEAEA"
        stroke-width="0.5"
      />
      <rect x="29" width="18" height="18" rx="9" fill="#E0D8CF" />
      <path
        d="M37.8423 12.1619C37.1395 12.1619 36.629 11.9696 36.3108 11.585C35.9954 11.1976 35.8376 10.7272 35.8376 10.1738H36.6179C36.6511 10.5584 36.7231 10.8379 36.8337 11.0122C37.0274 11.3249 37.3774 11.4812 37.8838 11.4812C38.2767 11.4812 38.5921 11.3761 38.8301 11.1658C39.068 10.9555 39.187 10.6843 39.187 10.3523C39.187 9.94279 39.0611 9.65641 38.8093 9.49316C38.5603 9.32992 38.2131 9.24829 37.7676 9.24829C37.7178 9.24829 37.6666 9.24967 37.614 9.25244C37.5642 9.25244 37.513 9.25382 37.4604 9.25659V8.59668C37.5379 8.60498 37.6029 8.61051 37.6555 8.61328C37.7081 8.61605 37.7648 8.61743 37.8257 8.61743C38.1051 8.61743 38.3348 8.57316 38.5146 8.48462C38.8301 8.32967 38.9878 8.05298 38.9878 7.65454C38.9878 7.35848 38.8826 7.13021 38.6724 6.96973C38.4621 6.80924 38.2172 6.729 37.9377 6.729C37.4397 6.729 37.0952 6.89502 36.9043 7.22705C36.7992 7.40967 36.7397 7.66976 36.7258 8.00732H35.9871C35.9871 7.56462 36.0756 7.18831 36.2527 6.87842C36.557 6.32503 37.0924 6.04834 37.8589 6.04834C38.4648 6.04834 38.9338 6.18392 39.2659 6.45508C39.5979 6.72347 39.7639 7.11361 39.7639 7.62549C39.7639 7.99072 39.6657 8.28678 39.4692 8.51367C39.3475 8.65479 39.1898 8.76546 38.9961 8.8457C39.3088 8.93148 39.5522 9.09749 39.7266 9.34375C39.9036 9.58724 39.9922 9.88607 39.9922 10.2402C39.9922 10.8075 39.8054 11.2695 39.4319 11.6265C39.0583 11.9834 38.5285 12.1619 37.8423 12.1619Z"
        fill="#444444"
      />
      <path
        d="M24.2778 24.2778C23.388 24.2778 22.6667 24.9991 22.6667 25.8889C22.6667 26.7787 23.388 27.5 24.2778 27.5C25.1676 27.5 25.8889 26.7787 25.8889 25.8889C25.8889 24.9991 25.1676 24.2778 24.2778 24.2778ZM24.2778 24.2778H18.0701C17.6987 24.2778 17.5127 24.2778 17.3598 24.2117C17.2249 24.1534 17.1078 24.0596 17.0226 23.9399C16.927 23.8057 16.8886 23.6263 16.8125 23.2713L14.8298 14.0187C14.752 13.6554 14.7125 13.474 14.6158 13.3383C14.5306 13.2186 14.4136 13.1244 14.2787 13.0661C14.1257 13 13.9407 13 13.5692 13H13M15.4167 15.4167H25.7868C26.3682 15.4167 26.6586 15.4167 26.8538 15.5378C27.0247 15.6439 27.1498 15.8103 27.2044 16.0039C27.2667 16.225 27.1867 16.5041 27.0255 17.0628L25.9101 20.9295C25.8138 21.2635 25.7656 21.4302 25.6678 21.5541C25.5816 21.6635 25.4678 21.7491 25.3387 21.8017C25.193 21.8611 25.0198 21.8611 24.6742 21.8611H16.8107M17.0278 27.5C16.138 27.5 15.4167 26.7787 15.4167 25.8889C15.4167 24.9991 16.138 24.2778 17.0278 24.2778C17.9176 24.2778 18.6389 24.9991 18.6389 25.8889C18.6389 26.7787 17.9176 27.5 17.0278 27.5Z"
        stroke="#444444"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
