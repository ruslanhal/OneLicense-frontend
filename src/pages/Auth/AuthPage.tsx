import {useNavigate} from "react-router-dom";

import Button from "@/components/Button/Button";

const AuthPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center mb-72">
      <h2 className="text-white text-4xl mb-[8px]">Log in to OneLicence</h2>
      <p className="text-[#737373]">Log in or sign up to explore projects.</p>
      <div className="flex mt-[40px] gap-4">
        <Button
          styleType="button_light"
          text="Log In"
          onClick={() => {
            navigate("login");
          }}
        />
        <Button
          styleType="button_dark"
          text="Sign Up"
          onClick={() => {
            navigate("signup");
          }}
        />
      </div>
    </div>
  );
};

export default AuthPage;
