import { useReducer, useRef, useState } from "react";
import "./App.css";
import Task from "./components/Task";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";

const types = {
  añadir: "añadir",
  finalizar: "finalizar",
  eliminar: "eliminar",
};

const valorInicial = [
  { id: 1, nombre: "Estudiar para mi exámen", completada: false },
  { id: 2, nombre: "Preparar el almuerzo", completada: false },
];
const reducer = (state, action) => {
  switch (action.type) {
    case types.añadir:
      return [...state, action.payload];

    case types.eliminar:
      return state.filter((valor) => valor.id !== action.payload);

    case types.finalizar:
      return state.map((tarea) =>
        tarea.id === action.payload
          ? { ...tarea, completada: !tarea.completada }
          : tarea
      );
  }
  return state;
};
function App() {
  const inputName = useRef(null);
  const [lista, dispatch] = useReducer(reducer, valorInicial);
  const [miTarea, setMiTarea] = useState("");
  return (
    <>
      <div className="main">
        <div className="contenido">
          <div className="registro-de-tareas">
            <div className="title">
              <label htmlFor="tarea">Nueva Tarea</label>
            </div>
            <div className="registro">
              <input
                type="text"
                id="tarea"
                value={miTarea}
                ref={inputName}
                onChange={(e) => setMiTarea(e.target.value)}
              />
              <button
                onClick={() => {
                  inputName.current.focus();
                  if (miTarea.trim() !== "") {
                    setMiTarea("");
                    dispatch({
                      type: types.añadir,
                      payload: { id: Math.random(), nombre: miTarea },
                    });
                  }
                }}
              >
                Añadir
              </button>
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
                    className="icono-check"
                    onClick={() => {
                      dispatch({
                        type: types.finalizar,
                        payload: tarea.id,
                      });
                    }}
                  >
                    <FontAwesomeIcon icon={faCheck} />
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
                    <FontAwesomeIcon icon={faTrash} />
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
