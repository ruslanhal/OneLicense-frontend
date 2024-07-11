import styles from "./Button.module.scss";

type Props = {
  text: string;
  styleType: string;
  onClick?: () => void;
};

const Button = ({text, styleType, onClick}: Props) => {
  return (
    <button type="submit" className={styles[styleType]} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
{
  /* <div className="flex justify-center items-center border-[#000000] border-[1px] rounded-full w-[105px] h-[40px] bg-[#E0D8CF]"></div> */
}
