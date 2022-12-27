import './taskManager.css'
import Task from './Task'
import AddTask from './AddTask'
import {useState, useEffect} from 'react'
import {collection, query, orderBy, onSnapshot} from "firebase/firestore"
import {db} from './firebase'
import {Link} from "react-router-dom"


function TaskManager() {


  const [openAddModal, setOpenAddModal] = useState(false)
  const [tasks, setTasks] = useState([])
  /* function to get all tasks from firestore in realtime */ 
  useEffect(() => {
    const q = query(collection(db, 'pasien'), orderBy('created', 'desc'))
    onSnapshot(q, (querySnapshot) => {
      setTasks(querySnapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    })
  },[])

  return (
    <div className='taskManager'>
      <header>
      <div>----LILA-----</div>
      </header>
      <div className='taskManager__container'>
        <button 
          onClick={() => setOpenAddModal(true)}>
          Add patient +
        </button>
        <Link to ="/download">
          <button className='down'>Download</button>
          
        </Link>
        <div className='taskManager__tasks'>
        {tasks.map((task) => (
          <Task
            id={task.id}
            key={task.id}
            completed={task.data.completed}
            nama={task.data.nama}
            umur={task.data.umur} 
            ukur={task.data.ukur}
            kondisi={task.data.kondisi}
            rekom={task.data.rekom}
          />
        ))}

        </div>
      </div>
      <footer className='foot'>
        <div></div>
      </footer>
      
      {openAddModal &&
        <AddTask onClose={() => setOpenAddModal(false)} open={openAddModal}/>
      }

    </div>
  )
}

export default TaskManager
