import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [tasks,setTasks] = useState([])
  const [title,setText] = useState('')
  const [id,setId]=useState(-1)

  const handleText=(e)=>{
    setText(e.target.value)
  }
  const addTask = (e)=>{
    e.preventDefault()
    const newArray=[...tasks]
    if (id === -1){
      const newTask = {id: newArray.length, title: title} ;
      newArray.push(newTask)
    }else{
      const taskIndex = newArray.findIndex((task) => task.id === id);
      newArray[taskIndex].title = title;
      setTasks(newArray);
      return console.log(newArray[taskIndex])
    }
    setTasks(newArray);
    setText('');
    setId(-1); 
  }
  const handleDelete=(id)=>{
    const newArray=[...tasks]
    const filter=newArray.filter((task)=>task.id!==id)
    setTasks(filter)
  }
  const handleEdit=(task)=>{
    setText(task.title)
    const newArray=[...tasks]
    const found=newArray.find((array)=>array.id===task.id)
    setId(found.id)
  }
  useEffect(()=>{
    setTasks([
      {
        'id':0,
        'title':'hacer la cama'
      },
      {
        'id':1,
        'title':'correr en la mañana'
      },
      {
        'id':2,
        'title':'hacer desayuno'
      },
      {
        'id':3,
        'title':'leer un periodico'
      },
    ])
  },[])
  return (
    <>
      <div className='Formulario-Todo'>
        <h2>TO-DO APP</h2>
        <form onSubmit={addTask}>
          <input name='newTask' className='text' placeholder='ingrese nueva tarea' value={title} onChange={handleText}/>
          <button className='button' type='submit'>Agregar</button>
        </form>
        {tasks.map((task)=>(
          <div className='task' key={task.id}>
            {task.title}
            <div className='button-task'>
              <button className='delete' onClick={()=>handleDelete(task.id)}>Delete</button>
              <button className='edit' onClick={()=>handleEdit(task)}>Edit</button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
