import { IUser } from "@/common/types/user.types";
import { useQueryClient } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";

type Role = "creator" | "supplier" | "both";

type Props = {
  redirectPath: string | "auth/login";
  role: Role;
  Component: React.FC;
};

const ProtectedRoute = ({ redirectPath, role, Component }: Props) => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<IUser>(["profile"]);

  const allowedRoles: ("creator" | "supplier")[] = role === "both" ? ["creator", "supplier"] : [role];

  if (user && !allowedRoles.includes(user.role)) {
    if (redirectPath) return <Navigate to={redirectPath} replace />;
    return <Navigate to={"/"} replace />;
  }

  return <Component />;
};

export default ProtectedRoute;

