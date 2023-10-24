import { useReducer, useState } from "react";
import { Check, Trash, Undo } from "iconoir-react";
import Task from "./components/Task";
import Modal from "./components/Modal.jsx";
import "./App.css";

const DELETE = "eliminar";
const ADD = "añadir";
const COMPLETE = "finalizar";

const initialValues = [
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
    case ADD:
      return [...state, action.payload];

    case DELETE:
      return state.filter((valor) => valor.id !== action.payload);

    case COMPLETE:
      return state.map(({id,completada,clickeado,...rest}) =>
        id === action.payload
          ? {
              id,
              completada: !completada,
              clickeado: !clickeado,
              ...rest
            }
          : {id,completada,clickeado,...rest}
      );
  }
  return state;
};
function App() {
  const [lista, dispatch] = useReducer(reducer, initialValues);
  const getCompletedCount = () =>
    lista.filter((tarea) => tarea.completada).length;
  const getIncompleteCount = () =>
    lista.filter((tarea) => !tarea.completada).length;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const addTask = (newTask) => {
    dispatch({
      type: ADD,
      payload: newTask,
    });
  };

  const toggleModal = (isOpen) => {
    setIsModalOpen(isOpen);
  };
  

  return (
    <>
      <div className="main">
        <div className="content">
          <div className="controlPanel">
            <div className="title">
              <h1>Lista de Tareas</h1>
            </div>
            <div className="buttonsPanel">
              <div className="left-side">
                <button onClick={()=>toggleModal(true)}>Añadir nueva tarea</button>
              </div>
              <div className="right-side">
                <button>Todas</button>
                <button>{`${getIncompleteCount()} Por Hacer`}</button>
                <button>{`${getCompletedCount()} Terminadas`}</button>
              </div>
              <Modal
                  isOpen={isModalOpen}
                  closeModal={()=>toggleModal(false)}
                  addTask={addTask}
                />
            </div>
          </div>
          <div className="container">
            {lista.map(({id,nombre,completada}) => (
              <div
                className={`task${completada ? "-completed" : ""}`}
                key={id}
              >
                <div className="left-side-task">
                  <Task name={nombre} />
                </div>
                <div className="right-side-task">
                  <button
                    className={`${
                      completada ? "backIcon" : "checkIcon"
                    }`}
                    onClick={() => {
                      dispatch({
                        type: COMPLETE,
                        payload: id,
                      });
                    }}
                  >
                    {completada == false ? (
                      <Check width={30} />
                    ) : (
                      <Undo width={30} />
                    )}
                  </button>
                  <button
                    onClick={() => {
                      dispatch({
                        type: DELETE,
                        payload: id,
                      });
                    }}
                    className="deleteIcon"
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
