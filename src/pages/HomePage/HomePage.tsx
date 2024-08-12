import Project from "@/components/Project/Project";
import {useEffect, useState} from "react";
import IconAddNew from "@/assets/IconAddNew";
import {useNavigate} from "react-router-dom";
import {
  createProject,
  deleteProject,
  getAllMyProjects,
  getAllProjects,
  searchProjects,
  searchMyProjects,
} from "@/apiClient/services/project/project.service";
import {IProjectEntity} from "@/apiClient/services/project/types/project.entities";
import Skeleton from "@/components/Skeleton/Skeleton";
import styles from "./HomePage.module.scss";
import {authHook} from "@/apiClient/hooks/authHooks";
import {useSearch} from "@/apiClient/contexts/SearchContext";

interface Props {}

const HomePage = (props: Props) => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<IProjectEntity[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [skeletons, setSkeletons] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const {user, isLoading: isUserLoading} = authHook();
  const {searchText} = useSearch();

  useEffect(() => {
    const fetchAllProjects = async () => {
      setIsLoading(true);
      try {
        if (user) {
          let projects;
          if (user.role === "creator") {
            projects = await getAllMyProjects();
          } else if (user.role === "supplier") {
            projects = await getAllProjects();
          }
          setProjects(projects);
          console.log("-=-=-=-=-=-=-=-=--=projects", projects);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    };

    if (!isUserLoading) {
      fetchAllProjects();
    }
  }, [user, isUserLoading]);

  const handleCreateProject = async () => {
    try {
      const data = await createProject();
      console.log("-==-=-=-=-=--response data", data);

      navigate(`/master-project/${data.id}`);
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  const handleDelete = async (projectId: string) => {
    try {
      console.log("=-=-=-=-=-=-in delete proj");
      await deleteProject(projectId);
      const newProjects = projects.filter((proj) => proj.id !== projectId);
      setProjects(newProjects);
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  useEffect(() => {
    const fetchFoundProjects = async () => {
      if (searchText === "") {
        let projects;
        if (user.role === "creator") {
          projects = await getAllMyProjects();
        } else if (user.role === "supplier") {
          projects = await getAllProjects();
        }
        setProjects(projects);
      } else {
        if (user?.role === "supplier") {
          const response = await searchProjects(searchText);
          setProjects(response);
        } else if (user?.role === "creator") {
          let projects = await searchMyProjects(searchText);
          setProjects(projects);
        }

        console.log(user?.id);
      }
    };
    if (!isUserLoading) {
      fetchFoundProjects();
    }
    console.log(searchText);
  }, [searchText, isLoading]);

  return (
    <>
      <div className="flex justify-center items-center mb-16">
        {user?.role === "creator" ? (
          <button
            onClick={handleCreateProject}
            className="flex justify-center items-center min-w-[40px] min-h-[40px] w-[40px] h-[40px] bg-[#F9F9F9] border-[#EAEAEA] border-[1px] rounded-full"
          >
            <IconAddNew />
          </button>
        ) : null}
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
              description={project.description}
              imageUrl={project?.images[0]?.thumbnailUrl}
              onDelete={async () => {
                handleDelete(project.id);
              }}
            />
          ))}
      </div>

      {isLoading ? <Skeleton skeletons={skeletons} /> : null}
    </>
  );
};

export default HomePage;
