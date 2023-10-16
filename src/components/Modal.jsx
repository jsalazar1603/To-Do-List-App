import React, { useState } from "react";
import style from '../styles/Modal.module.css'

const Modal = ({ isOpen, addTask, closeModal }) => {
  const [taskName, setTaskName] = useState("");

  const handleAddTask = () => {
    if(taskName.trim() !== ""){
        const newTask = {
            id:Math.random(),
            nombre:taskName,
            completada:false,
            clickeado:false
        };
        console.log("Nueva tarea:", newTask);
        addTask(newTask);
        setTaskName("");
        closeModal();
    }
  }
  return (
    <>
      <div className={isOpen? style.openModal: style.closeModal}>
        <h2 className={style.title}>Crear nueva tarea</h2>
        <label htmlFor="name">Nombre:</label>
        <input 
        type="text" 
        value={taskName}
        onChange={(e)=> setTaskName(e.target.value)}
        placeholder="Ej: Organizar mi cuarto"
        />
        <button onClick={()=>handleAddTask()}>Añadir</button>
        <button onClick={()=>closeModal()}>Cerrar</button>
      </div>
    </>
  );
};

export default Modal;
