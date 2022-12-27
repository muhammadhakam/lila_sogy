import './task.css'
import {useState} from 'react'
import TaskItem from './TaskItem'
import EditTask from './EditTask'
import {db} from './firebase'
import { doc, updateDoc, deleteDoc} from "firebase/firestore";

function Task({id, nama, umur, ukur, kondisi, completed, rekom}) {

  const [checked, setChecked] = useState(completed)
  const [open, setOpen] = useState({edit:false, view:false})

  const handleClose = () => {
    setOpen({edit:false, view:false})
  }

   /* function to update document in firestore */
  const handleCheckedChange = async () => {
  const taskDocRef = doc(db, 'pasien', id)
  try{
    await updateDoc(taskDocRef, {
      completed: checked
    })
  } catch (err) {
    alert(err)
  }
}
   /* function to delete a document from firstore */ 
   const handleDelete = async () => {
    const taskDocRef = doc(db, 'pasien', id)
    try{
      await deleteDoc(taskDocRef)
    } catch (err) {
      alert(err)
    }
  }  
   
  return (
    <div className={`task ${checked && 'task--borderColor'}`}>
      <div>
        <input 
          id={`checkbox-${id}`} 
          className='checkbox-custom'
          name="checkbox" 
          checked={checked}
          onChange={handleCheckedChange} 
          type="checkbox" />
        <label 
          htmlFor={`checkbox-${id}`} 
          className="checkbox-custom-label" 
          onClick={() => setChecked(!checked)} ></label>
      </div>


      <div className='task__body'>
        <h2>{nama}</h2>
        <div className='row'>
        <p className='colom'>{umur}</p>
        <p className='colom'>{ukur}</p>
        <p className='colom'style={
          {backgroundColor: kondisi === "normal" ? '#91C788' : 'salmon',
            color: 'white'
           }
        }>{kondisi}</p>
        </div>
        <p className='rekom'>{rekom}</p>
        <div className='task__buttons'>
          <div className='task__deleteNedit'>
            <button 
              className='task__editButton' 
              onClick={() => setOpen({...open, edit: true})}>
              Edit
            </button>
            <button onClick={handleDelete} className='task__deleteButton'>Delete</button>
          </div>
          <button 
            onClick={() => setOpen({...open, view: true})}>
            View
          </button>
        </div>
      </div>

      {open.view &&
        <TaskItem 
          onClose={handleClose} 
          nama={nama}
          umur={umur} 
          ukur={ukur}
          kondisi={kondisi}
          rekom={rekom} 
          open={open.view} />
      }

      {open.edit &&
        <EditTask 
          onClose={handleClose} 
          toNama={nama}
          toEditUmur={umur} 
          toEditUkur={ukur}
          toEditKondisi={kondisi} 
          toEditRekom={rekom}
          open={open.edit}
          id={id} />
      }


    </div>
  )
}

export default Task