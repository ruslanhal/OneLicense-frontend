import React, {ReactElement, ReactNode} from "react";

import {Outlet} from "react-router-dom";
import Header from "./Header/Header";

const MainLayout = () => {
  return (
    <div className="h-screen">
      <Header />
      <Outlet />
    </div>
  );
};

export default MainLayout;
