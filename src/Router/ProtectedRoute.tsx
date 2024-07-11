import {Navigate} from "react-router-dom";

type Props = {
  isAllowed: boolean;
  elementPath: string;
  redirectPath: string | "auth/login";
  role: "creator" | "supplier";
};

const ProtectedRoute = ({
  isAllowed,
  elementPath,
  redirectPath,
  role,
}: Props) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Navigate to={`${elementPath}/${role}`} replace />;
};

export default ProtectedRoute;
