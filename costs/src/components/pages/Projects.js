import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import styles from "./Projects.module.css";
import Container from "../layout/Container";
import LinkButton from "../layout/LinkButton";
import Loading from "../layout/Loading";
import Message from "../layout/Message";
import ProjectsCard from "../projects/ProjectsCard";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [removeLoagind, setRemoveLoagind] = useState(false);

  const location = useLocation();
  let message = "";
  if (location.state) {
    message = location.state.message;
  }

  useEffect(() => {
    fetch("http://localhost:5000/projects", {
      method: "GET",
      headers: { "Content-Type": "application.json" },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProjects(data);
        setRemoveLoagind(true);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={styles.project_container}>
      <div className={styles.tittle_container}>
        <h1>Meus projetos</h1>
        <LinkButton to="/newproject" text="Criar projeto" />
      </div>
      {message && <Message type="success" msg={message} />}
      <Container customClass="start">
        {projects.length > 0 &&
          projects.map((project) => (
            <ProjectsCard
              id={project.id}
              name={project.name}
              budget={project.budget}
              category={project.category.name}
              key={project.id}
            />
          ))}
        {!removeLoagind && <Loading />}
        {removeLoagind && projects.length === 0 && (
          <p>Não há projetos cadastrados.</p>
        )}
      </Container>
    </div>
  );
}

export default Projects;
