import "./HomePage.css";
import ProjectCard from "../Components/ProjectCard";
import { ICardProject } from "../Types/Types";
import logo from "../images/logo.svg";
import { NavLink } from "react-router-dom";

//  Страница для выбора проекта. Создана для расширения после создания бэка.

const HomePage = () => {
  const project1: ICardProject = {
    id: 1,
    name: "project1",
    imgPath: logo,
  };

  const project2: ICardProject = {
    id: 2,
    name: "project2",
    imgPath: logo,
  };

  const project3: ICardProject = {
    id: 3,
    name: "project3",
    imgPath: logo,
  };

  const projectCards: ICardProject[] = [project1, project2, project3];

  return (
    <div className="homePage">
      <header>
        <label>POG</label>
      </header>
      <main className="main">
        <div className="button-panel"></div>
        <div className="projects-list">
          {projectCards.map((card) => {
            return (
              <NavLink to="project" key={card.id}>
                <ProjectCard {...card} />
              </NavLink>
            );
          })}
        </div>
      </main>
      <footer></footer>
    </div>
  );
};

export default HomePage;
