import {IUser} from "@/common/types/user.types";
import {useQueryClient} from "@tanstack/react-query";
import {Navigate, Outlet} from "react-router-dom";

type Props = {
  redirectPath: string | "auth/login";
  role: "creator" | "supplier";
  Component: React.FC;
};

const ProtectedRoute = ({redirectPath, role, Component}: Props) => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<IUser>(["profile"]);

  if (user && user?.role !== role) {
    if (redirectPath) return <Navigate to={redirectPath} replace />;
    return <Navigate to={"/"} replace />;
  }

  // return <Navigate to={`${elementPath}/${role}`} replace />;
  return <Component />;
};

export default ProtectedRoute;
