import React from "react";

type Props = {
  title: string;
  author: string;
  imageUrl: string;
};

const Project = ({title, author, imageUrl}: Props) => {
  return (
    <div className="flex flex-col justify-center items-center  border-[1px] border-[#EAEAEA] min-w-80 min-h-[450px] max-w-md   max-h-[550px] ">
      <img src={imageUrl} />
      <p className="mb-2">{title}</p>
      <p>{author}</p>
    </div>
  );
};
``;
export default Project;
