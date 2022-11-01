import React, { useState, useContext } from 'react'
import './Title.css'
import { BsThreeDots } from 'react-icons/bs'
import storeApi from '../../../utils/StoreApi'

export const Title = ({ title, listId }) => {
  const [open, setOpen] = useState(false)
  const [newTitle, setNewTitle] = useState(title)
  const { updateListTitle } = useContext(storeApi)

  const handleOnChange = e => {
    setNewTitle(e.target.value)
  }

  const handleOnBlur = () => {
    updateListTitle(newTitle, listId)
    setOpen(false)
  }

  return (
    <div>
      {open ? (
        <div>
          <input
            onChange={handleOnChange}
            autoFocus
            type="text"
            value={newTitle}
            onBlur={handleOnBlur}
            className="TitleInput"
          />
        </div>
      ) : (
        <div className="TitleContainer">
          <div onClick={() => setOpen(!open)} className="Title">
            {title}
          </div>
          <BsThreeDots className="BsThreeDots" />
        </div>
      )}
    </div>
  )
}
