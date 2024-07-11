import React, {useEffect} from "react";

import "./App.scss";
import MainLayout from "./Layouts/MainLayout";
import {authHook} from "./apiClient/hooks/authHooks";

function App() {
  const {user} = authHook();

  return (
    <>
      <MainLayout />
    </>
  );
}

export default App;
