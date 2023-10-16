import { useReducer, useRef, useState } from "react";
import "./App.css";
import Task from "./components/Task";
import { Check, Trash, Undo } from "iconoir-react";
import Modal from "./components/Modal.jsx";

const types = {
  añadir: "añadir",
  finalizar: "finalizar",
  eliminar: "eliminar",
};

const valorInicial = [
  {
    id: 1,
    nombre: "Estudiar para mi exámen",
    completada: false,
    clickeado: false,
  },
  {
    id: 2,
    nombre: "Preparar el almuerzo",
    completada: false,
    clickeado: false,
  },
];

const reducer = (state, action) => {
  switch (action.type) {
    case types.añadir:
      return [...state, action.payload];

    case types.eliminar:
      // No necesitas actualizar los contadores aquí, ya que lo haremos en el componente.
      return state.filter((valor) => valor.id !== action.payload);

    case types.finalizar:
      return state.map((tarea) =>
        tarea.id === action.payload
          ? {
              ...tarea,
              completada: !tarea.completada,
              clickeado: !tarea.clickeado,
            }
          : tarea
      );
  }
  return state;
};
function App() {
  const [lista, dispatch] = useReducer(reducer, valorInicial);
  const [miTarea, setMiTarea] = useState("");
  const getRealizadasCount = () =>
    lista.filter((tarea) => tarea.completada).length;
  const getNoRealizadasCount = () =>
    lista.filter((tarea) => !tarea.completada).length;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const addTask = (newTask) => {
    dispatch({
      type: types.añadir,
      payload: newTask,
    });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="main">
        <div className="contenido">
          <div className="registro-de-tareas">
            <div className="title">
              <h1>Lista de Tareas</h1>
            </div>
            <div className="buttonsPanel">
              <div className="left-side">
                <button onClick={openModal}>Añadir nueva tarea</button>
              </div>
              <div className="right-side">
                <button>Todas</button>
                <button>{`${getNoRealizadasCount()} Por Hacer`}</button>
                <button>{`${getRealizadasCount()} Terminadas`}</button>
              </div>
              <Modal
                  isOpen={isModalOpen}
                  closeModal={closeModal}
                  addTask={addTask}
                />
            </div>
          </div>
          <div className="container">
            {lista.map((tarea) => (
              <div
                className={`tareas${tarea.completada ? "-completadas" : ""}`}
                key={tarea.id}
              >
                <div className="left-side-task">
                  <Task name={tarea.nombre} />
                </div>
                <div className="right-side-task">
                  <button
                    className={`${
                      tarea.completada ? "icono-back" : "icono-check"
                    }`}
                    onClick={() => {
                      dispatch({
                        type: types.finalizar,
                        payload: tarea.id,
                      });
                    }}
                  >
                    {tarea.completada == false ? (
                      <Check width={30} />
                    ) : (
                      <Undo width={30} />
                    )}
                  </button>
                  <button
                    onClick={() => {
                      dispatch({
                        type: types.eliminar,
                        payload: tarea.id,
                      });
                    }}
                    className="icono-eliminar"
                  >
                    <Trash width={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
