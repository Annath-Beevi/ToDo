import { useEffect, useRef, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [task, setTask] = useState([])
  const [text, setText] = useState("")
  const [isUpdating, setIsUpdating] = useState(false)
  const [id, setId] = useState("")
  const [isChecked, setIsChecked] = useState(false)
  const ref = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    completed: false
  });

  const getTask = async () => {
    await axios.get("http://localhost:5000/api/tasks")
      .then((fetched) => setTask(fetched.data.task))
  }

  useEffect(() => {
    getTask()
  }, [])

  const handleChange = (e) => {
    const { value, name } = e.target;

    setFormData((preve) => {
      return {
        ...preve,
        [name]: value
      };
    });
  };

  const addTask = async (e) => {
    e.preventDefault()
    try {
      if (task.length !== 0) {
        await axios.post('http://localhost:5000/api/tasks', formData);
      }
    } catch (error) {
      console.log(error);
    }
    getTask()
    ref.current.value = '';
  };

  const deletetask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
    } catch (error) {
      console.log(error);
    }
    getTask()
  };

  const updateTask = async (id) => {
    ref.current.focus();
    await axios.patch(`http://localhost:5000/api/tasks/${id}`, formData);
    getTask()
    ref.current.value = '';
  };

  const handleCheckbox = async (id) => {
    try{
      await axios.patch(`http://localhost:5000/api/tasks/${id}`, {
        completed: !isChecked
      })
      setFormData(formData)
    }
   catch(err){
    console.log(err)
   }
   getTask()
  };


  return (
    <>
      <div className='container'>
        <h2>TO-DO-LIST</h2>
        <div className='div'>
          <input className='input' type="text" name='name' ref={ref} placeholder='Type Here' onChange={handleChange} />
          {isUpdating === false ? <button className='button' onClick={addTask}>ADD TASK</button>
            : <button className='button' onClick={() => {
              updateTask(id)
              setIsUpdating(false)
            }}>UPDATE</button>}

        </div>
        <ul>
          {task.map((data) =>
            <li className='li' key={data._id}>
              <input type="checkbox" className='checkbox' checked={data.completed} onClick={() => {
                handleCheckbox(data._id)

              }} />
              <span>{data.name}</span>
              <button className='button1' onClick={() => deletetask(data._id)}>DELETE</button>
              <button className='button1' onClick={() => {
                setIsUpdating(true)
                setId(data._id)
                ref.current.focus()
              }}>EDIT</button>
            </li>
          )}
        </ul>
      </div >
    </>
  )
}

export default App
