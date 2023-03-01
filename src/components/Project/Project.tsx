import React from "react";
import Task from "../Task/Task";

interface ProjectProps {
  name: string;
  tasks?: typeof Task[];
}
const Project: React.FC<ProjectProps> = ({ name }) => {
  return (
    <div className="list-item">
      <h3>{name}</h3>
      <Task title="Comprar ferragem" />
    </div>
  );
};

export default Project;
