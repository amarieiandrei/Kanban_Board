import React, { useState } from 'react'
import './InputContainer.css'
import { Collapse } from '@mui/material'
import { InputCard } from './InputCard'

export const InputContainer = ({ listId }) => {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <Collapse in={open}>
        <InputCard setOpen={setOpen} listId={listId} />
      </Collapse>
      <Collapse in={!open}>
        <div onClick={() => setOpen(!open)} className="AddCard">
          + Add a card
        </div>
      </Collapse>
    </div>
  )
}
