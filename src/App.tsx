import {useNavigate} from "react-router-dom";

import "./App.scss";
import MainLayout from "./Layouts/MainLayout";
import {authHook} from "./apiClient/hooks/authHooks";

function App() {
  const navigate = useNavigate();
  const {user, isLoading} = authHook();
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
      <MainLayout />
    </>
  );
}

export default App;
