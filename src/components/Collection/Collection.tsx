import {ICollection} from "@/apiClient/services/project/types/project.entities";
import React from "react";
import {Link} from "react-router-dom";

interface Props extends ICollection {
  owner: string;
}

const Collection = ({
  id,
  title,
  description,
  projectId,
  image,
  createdAt,
  updatedAt,
  owner,
}: Props) => {
  return (
    <Link to="">
      <div className="flex flex-col justify-center items-center  border-[1px] border-[#EAEAEA] min-w-80 min-h-[450px] max-w-md   max-h-[550px] ">
        <img src={image} />
        <p className="mb-2">{title}</p>
        <p>{owner}</p>
      </div>
    </Link>
  );
};
export {Collection};
