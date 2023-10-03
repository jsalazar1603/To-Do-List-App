import { useReducer, useState } from 'react'
import './App.css'
import Button from './components/Button'

const valorInicial = [
  {nombre:'Estudiar para mi exámen'},
  {nombre:'Preparar el almuerzo'}
]
const reducer = (state,action) =>{
  return state;
}
function App() {
  const [lista,dispatch] = useReducer(reducer,valorInicial);
  const [miTarea,setMiTarea] = useState("");
  return(
    <>
    <div>
      <label htmlFor="tarea">Nueva Tarea: </label>
      <input 
      type="text" 
      id='tarea' />
    </div>
    <Button name='Añadir'/>
    </>
  )
}

export default App
