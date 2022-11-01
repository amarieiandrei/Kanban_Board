import React, { useState, useContext } from 'react'
import './InputList.css'
import { AiOutlineClose } from 'react-icons/ai'
import storeApi from '../../../../utils/StoreApi'

import { createList } from '../../../../network/request'

export const InputList = ({ setOpen, listId }) => {
  const { addMoreList } = useContext(storeApi)
  const [listTitle, setListTitle] = useState('')

  const handleOnChange = e => {
    setListTitle(e.target.value)
  }

  const handleBtnConfirm = () => {
    ;(async () => {
      const { status } = await createList(listTitle)
      if (status === 200) {
        console.log('created')
      } else {
        console.log('unable to create list')
      }
    })()

    if (listTitle !== '') addMoreList(listTitle, listId)
    setListTitle('')
    setOpen(false)
  }

  const handleClose = () => {
    setOpen(false)
    setListTitle('')
  }

  return (
    <div className="InputListContainer">
      <div>
        <input
          value={listTitle}
          onChange={handleOnChange}
          onBlur={e => {
            if (e.target.value === '') setOpen(false)
          }}
          type="text"
          placeholder="Enter list title..."
          className="InputList"
        />
      </div>
      <div className="InputCardFlex">
        <button onClick={handleBtnConfirm} className="AddInputCard">
          Add List
        </button>
        <AiOutlineClose onClick={handleClose} className="AiOutlineClose" />
      </div>
    </div>
  )
}
