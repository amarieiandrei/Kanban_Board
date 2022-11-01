import React, { useState, useContext } from 'react'
import './InputCard.css'
import { AiOutlineClose } from 'react-icons/ai'
import storeApi from '../../../../utils/StoreApi'

import { createCard } from '../../../../network/request'

export const InputCard = ({ setOpen, listId }) => {
  const { addMoreCard } = useContext(storeApi)
  const [cardTitle, setCardTitle] = useState('')

  const handleOnChange = e => {
    setCardTitle(e.target.value)
  }

  const handleBtnConfirm = () => {
    ;(async () => {
      const { status } = await createCard({ title: cardTitle, owner: listId })
      if (status === 200) {
        console.log('created')
      } else {
        console.log('unable to create card')
      }
    })()

    if (cardTitle !== '') addMoreCard(cardTitle, listId)
    setCardTitle('')
    setOpen(false)
  }

  const handleClose = () => {
    setOpen(false)
    setCardTitle('')
  }

  return (
    <div>
      <div>
        <input
          value={cardTitle}
          onChange={handleOnChange}
          onBlur={e => {
            if (e.target.value === '') setOpen(false)
          }}
          type="text"
          placeholder="Enter a title for this card..."
          className="InputCard"
        />
      </div>
      <div className="InputCardFlex">
        <button onClick={handleBtnConfirm} className="AddInputCard">
          Add Card
        </button>
        <AiOutlineClose onClick={handleClose} className="AiOutlineClose" />
      </div>
    </div>
  )
}
