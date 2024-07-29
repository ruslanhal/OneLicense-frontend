import Project from "@/components/Project/Project";
import React, { useEffect, useState } from "react";

import defaultImg from "@/assets/Kaye_0147.png";

import IconAddNew from "@/assets/IconAddNew";
import { useNavigate } from "react-router-dom";
import { getAllMyProjects } from "@/apiClient/services/project/project.service";
import { IProjectEntity } from "@/apiClient/services/project/types/project.entities";
import PurchaseRequest from "@/components/PurchaseRequest/PurchaseRequest";
import styles from "./HomePage.module.scss";
import Skeleton from "@/components/Skeleton/Skeleton";

interface Props {}

const HomePage = (props: Props) => {
  const mockProjects = Array(10).fill({
    title: "Cliff House",
    author: "Finnis Architecture & Interiors",
    imageUrl: defaultImg,
  });
  const [projects, setProjects] = useState<IProjectEntity[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [skeletons, setSkeletons] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

  useEffect(() => {
    const fetchAllProjects = async () => {
      setIsLoading(true);
      try {
        const projects = await getAllMyProjects();

        setProjects(projects);
        console.log("=-=-=-=0--=0-=0-=0-=projects", projects);
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllProjects();
  }, []);

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
          <IconAddNew />
        </button>
      </div>
      <div
        className={
          "grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
        }
      >
        {projects &&
          projects.map((project, index) => (
            <Project
              key={index}
              id={project.id}
              title={project.title}
              author={project.author}
              imageUrl={project?.images[0].thumbnailUrl}
            />
          ))}
      </div>

      {isLoading?<Skeleton skeletons={skeletons} />:null}
    </>
  );
};

export default HomePage;
