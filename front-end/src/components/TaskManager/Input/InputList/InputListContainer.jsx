import React, { useState } from 'react'
import './InputListContainer.css'
import { Collapse } from '@mui/material'
import { InputList } from './InputList'

export const InputListContainer = ({ listId }) => {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <Collapse in={open}>
        <InputList setOpen={setOpen} listId={listId} />
      </Collapse>
      <Collapse in={!open}>
        <div onClick={() => setOpen(!open)} className="AddList">
          + Add a list
        </div>
      </Collapse>
    </div>
  )
}
