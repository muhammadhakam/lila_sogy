import Modal from "./Modal"
import './taskItem.css'

function TaskItem({onClose, open, nama, ukur, umur, kondisi, rekom}) {

  return (
    <Modal modalLable='Information' onClose={onClose} open={open}>
      <div className='taskItem'>
        <h2>{nama}</h2>
        <p>{umur}</p>
        <p>{ukur}</p>
        <p>{kondisi}</p>
        <p>{rekom}</p>
      </div>
    </Modal>
  )
}

export default TaskItem
