import React from "react";
import style from "../styles/Task.module.css";
const Task = (props) => {
  return (
    <>
      <div className={style.newTask}>
        <span>{props.name}</span>
      </div>
    </>
  );
};

export default Task;
