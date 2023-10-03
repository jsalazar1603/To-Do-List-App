import React from 'react'
import Button from './Button'
import style from '../styles/Task.Module.css'
const Task = (props) => {
  return (
    <>
       <div className={style.newTask}>
           <span>{props.name}</span>
           <Button name="Marcar como hecha"/>
       </div>
    </>
  )
}

export default Task