import { useEffect, useRef, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [task, setTask] = useState([])

  const [formData, setFormData] = useState({
    name: "",
    completed: false
  });

  const getTask = async () => {
    await axios.get("http://localhost:5000/api/tasks")
    .then((fetched) => setTask(fetched.data.task))
  }

  useEffect(()=>{
    getTask()
  },[])

  const addTask=(e)=>{
    const {value, name} = e.target;

    setFormData((preve) => {
      return {
        ...preve,
        [name]: value
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if(task.length !== 0){
        await axios.post('http://localhost:5000/api/tasks', formData);
      }
    } catch (error) {
      console.log(error);
    }
    getTask()
  };

  const deletetask= async (id)=> {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
    } catch (error) {
      console.log(error);
    }
    getTask()
  };

  const updateTask = async (id) => {
    try{
      await axios.patch(`http://localhost:5000/api/tasks/${id}`,formData);
    }catch(error){
      console.log(error)
    }
    getTask()
  };

  const handleCheckbox =  (index) => {
    const checkTask = task.map((task, i) => 
      i === index ? { ...task, completed: !task.completed} : task  
    )
    setTask(checkTask)
  };

  return (
    <>
      <div className='container'>
      <h2>TO-DO-LIST</h2>
      <div>
      <input className='input' type="text" name='name' placeholder='Type Here' onChange={addTask} />
      <button className='button' onClick={handleSubmit}>Add Task</button>
      </div>
      <ul>
        {task.map((data, index)=>
        <li className='li' key={index}> 
        <input type="checkbox" checked={data.completed} onChange={() => handleCheckbox(index)} /> 
        <span className={data.completed ? "completed" : ""}>{data.name}</span>
        <button className='button1' onClick={()=>deletetask(data._id)}>Delete</button>
        <button className='button1' onClick={()=>updateTask(data._id)}>Update</button>
        </li> 
        )}
      </ul>
      </div>
    </>
  )
}

export default App
