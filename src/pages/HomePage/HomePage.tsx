import Project from "@/components/Project/Project";
import React from "react";

import defaultImg from "@/assets/Kaye_0147.png";

interface Props {}

const HomePage = (props: Props) => {
  const mockProjects = Array(10).fill({
    title: "Cliff House",
    author: "Finnis Architecture & Interiors",
    imageUrl: defaultImg,
  });

  return (
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
  );
};

export default HomePage;
