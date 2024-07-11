import Button from "@/components/Button/Button";
import Logo from "../../assets/logo.svg";
import NotIcon from "@/assets/notifications.Icon.svg";

const Header = () => {
  return (
    <header>
      <div className="mb-16">
        <div className="flex justify-center items-center mt-[70px] mb-[34px] ">
          <img src={Logo} />
        </div>

        <div className="flex justify-center items-center gap-2">
          <Button styleType="button_header" text="Projects" />
          <Button styleType="button_header" text="Licenses" />
          <input
            placeholder="Search project"
            className=" w-72 h-[40px] bg-[#F9F9F9] border-[#EAEAEA]  border-[1px] rounded-full"
          ></input>

          <div className="flex justify-center items-center w-[40px] h-[40px] bg-[#F9F9F9] border-[#EAEAEA]  border-[1px] rounded-full">
            <img src={NotIcon} />
          </div>

          <div>Timothy Kaye</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
