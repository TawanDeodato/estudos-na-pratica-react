import ProjectForm from "../projects/ProjectForm";
import styles from "./NewProject.module.css";
import { useNavigate } from "react-router-dom";

function NewProject() {
  const history = useNavigate();

  function createPost(project) {
    // initialize cost server
    project.cost = 0;
    project.services = [];

    fetch("http://localhost:5000/projects", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        //Redirect
        history("/projects", { message: "Projeto enviado com sucesso!" });
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className={styles.newproject_container}>
      <h1>Criar projeto</h1>
      <p>Crie ser projeto para depois adicionar os serviços</p>
      <ProjectForm handleSubmit={createPost} btnText="Criar projeto" />
    </div>
  );
}

export default NewProject;
