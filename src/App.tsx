import { useNavigate } from "react-router-dom";

import "./App.scss";
import MainLayout from "./Layouts/MainLayout";
import { authHook } from "./apiClient/hooks/authHooks";
import { useState } from "react";
import { SearchProvider } from "./apiClient/contexts/SearchContext";

function App() {
  const navigate = useNavigate();
  const { user, isLoading } = authHook();
  // console.log("-==-=-=-=-=-=-app user", user);
  // console.log("-==-=-=-=-=-=-app error", error);
  if (!user && !isLoading) {
    navigate("/auth");
  }
  // useEffect(() => {
  //   if (!user) {
  //     navigate("/auth");
  //   }
  // }, [user, navigate]);

  return (
    <>
      <SearchProvider>
        <MainLayout />
      </SearchProvider>
    </>
  );
}

export default App;
