import Modal from "./Modal"
import {useState} from 'react'
import './addTask.css'
import {db, db2} from './firebase'
import {collection, addDoc, Timestamp} from 'firebase/firestore'
import { onValue, ref } from 'firebase/database'

const Lila = [""]
const Kondisi2 = [""]
const Rekom2 = [""] 

function AddTask({onClose, open}) {



  const dataLila = ref(db2, "/Lila")
  onValue(dataLila, (snapshot) => {
    snapshot.forEach(function(childSnapshot) {
      const data2 = childSnapshot.val()
      console.log(data2)
      Lila[0] = data2
    })
    
  }) 

  const dataKondisi = ref(db2, "/Kondisi")
  onValue(dataKondisi, (snapshot) => {
    snapshot.forEach(function(childSnapshot) {
      const data3 = childSnapshot.val()
      console.log(data3)
      Kondisi2[0] = data3
    })
    
  })

  const dataRekom = ref(db2, "/Rekomendasi")
  onValue(dataRekom, (snapshot) => {
    snapshot.forEach(function(childSnapshot) {
      const data4 = childSnapshot.val()
      console.log(data4)
      Rekom2[0] = data4
    })
    
  })

  const [nama, setNama] = useState('')
  const [umur, setUmur] = useState('')
  const [ukur, setUkur] = useState([])
  const [kondisi, setKondisi] = useState([])
  const [rekom, setRekom] = useState([])

  ukur[0] = (Lila + " cm").toString()
  kondisi[0] = Kondisi2.toString()
  rekom[0] = Rekom2.toString()


  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await addDoc(collection(db, 'pasien'), {
        created: Timestamp.now().toDate().toString(),
        nama: nama,
        umur: umur ,
        ukur: ukur,
        kondisi: kondisi,
        rekom: rekom,
        completed: false,        
      })
      onClose()
    } catch (err) {
      alert(err)
    }
  }
  /* function to add new task to firestore */

  return (
    <Modal modalLable='Add Patient' onClose={onClose} open={open}>
      <form onSubmit={handleSubmit} className='addTask' name='addTask'>
        <input 
          type='text' 
          name='nama' 
          onChange={(e) => setNama(e.target.value.toUpperCase())} 
          value={nama}
          placeholder='Nama'/>
        <input 
          type='text'
          name="umur"
          onChange={(e) => setUmur(e.target.value)}
          placeholder='Umur'
          value={
            umur
            }></input>
        <input
          type='text' 
          name='Hasil Ukur' 
          onChange={(e) => setUkur(e.target.value)} 
          value={ukur}
          placeholder='Hasil Ukur'
          ></input>
        <input
         type='text'
         name="Kondisi"
         onChange= {(e) => setKondisi(e.target.value)}
         value={kondisi}
         placeholder="kondisi" 
        ></input>
        <input
         type='text'
         name="Kondisi"
         onChange= {(e) => setRekom(e.target.value)}
         value={rekom}
         placeholder="rekomendasi" 
        ></input>

    

        <button type='submit'>Submit</button>
      </form> 
    </Modal>
  )
}

export default AddTask
