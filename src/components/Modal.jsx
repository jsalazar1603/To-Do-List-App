import React, { useState } from "react";
import style from "../styles/Modal.module.css";

const Modal = ({ isOpen, addTask, closeModal }) => {
  const [taskName, setTaskName] = useState("");

  const handleAddTask = () => {
    if (taskName.trim() !== "") {
      const newTask = {
        id: Math.random(),
        nombre: taskName,
        completada: false,
        clickeado: false,
      };
      console.log("Nueva tarea:", newTask);
      addTask(newTask);
      setTaskName("");
    }
  };
  return (
    <>
      <div className={isOpen ? style.openModal : style.closeModal}>
        <div className={style.container}>
          <h2 className={style.title}>Crear nueva tarea</h2>
          <div className={style.taskInput}>
            <label htmlFor="name">Nombre:</label>
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="Ej: Organizar mi cuarto"
            />
          </div>
          <div className={style.controlButtons}>
            <button className={style.buttonAdd} onClick={() => handleAddTask()}>Añadir</button>
            <button className={style.buttonClose} onClick={() => closeModal()}>Cerrar</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
