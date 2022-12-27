import Modal from "./Modal"
import {useState} from 'react'
import './editTask.css'
import { doc, updateDoc } from "firebase/firestore";
import {db} from './firebase'

function EditTask({open, onClose, toNama, toEditUkur,toEditUmur,toEditKondisi,toEditRekom, id}) {

  const [nama, setNama] = useState(toNama)
  const [ukur, setUkur] = useState(toEditUkur)
  const [umur, setUmur] = useState(toEditUmur)
  const [kondisi, setKondisi] = useState(toEditKondisi)
  const [rekom, setRekom] = useState(toEditRekom)
  const handleUpdate = async (e) => {
    e.preventDefault()
    const taskDocRef = doc(db, 'pasien', id)
    try{
      await updateDoc(taskDocRef, {
        nama: nama,
        ukur: ukur,
        umur: umur,
        kondisi: kondisi,
        rekom: rekom
      })
      onClose()
    } catch (err) {
      alert(err)
    }    
  }
  /* function to update document in firestore */

  return (
    <Modal modalLable='Edit Information' onClose={onClose} open={open}>
      <form onSubmit={handleUpdate} className='editTask' name='updateTask'>
        <input 
         onChange={(e) => setNama(e.target.value)} value={nama}></input>
        <input 
         onChange={(e) => setUmur(e.target.value)} value={umur}></input>
        <input 
         onChange={(e) => setUkur(e.target.value)} value={ukur}></input>
         <input 
         onChange={(e) => setKondisi(e.target.value)} value={kondisi}></input>
         <input 
         onChange={(e) => setRekom(e.target.value)} value={rekom}></input>
        <button type='submit'>Edit</button>
      </form> 
    </Modal>
  )
}

export default EditTask
