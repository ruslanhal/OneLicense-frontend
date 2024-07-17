import Project from "@/components/Project/Project";
import React from "react";

import defaultImg from "@/assets/Kaye_0147.png";

import addIcon from "@/assets/icon_add_new.svg";
import {useNavigate} from "react-router-dom";

interface Props {}

const HomePage = (props: Props) => {
  const mockProjects = Array(10).fill({
    title: "Cliff House",
    author: "Finnis Architecture & Interiors",
    imageUrl: defaultImg,
  });

  const navigate = useNavigate();

  return (
    <>
      <div className="flex justify-center items-center  mb-16">
        <button
          onClick={() => {
            navigate("/create-project");
          }}
          className="flex justify-center items-center min-w-[40px] min-h-[40px] w-[40px] h-[40px] bg-[#F9F9F9] border-[#EAEAEA]  border-[1px] rounded-full"
        >
          <img src={addIcon} />
        </button>
      </div>
      <div className="flex flex-wrap justify-center">
        {mockProjects.map((project, index) => (
          <Project
            key={index}
            title={project.title}
            author={project.author}
            imageUrl={project.imageUrl}
          />
        ))}
      </div>
    </>
  );
};

export default HomePage;
