import React, { useState, useEffect } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import './Card.css'
import { VscEdit } from 'react-icons/vsc'
import { TextareaAutosize } from '@mui/material'

export const Card = ({ card, index }) => {
  const [value, setValue] = useState('')
  const [pointerEvents, setPointerEvents] = useState('none')

  useEffect(() => {
    setValue(card.title)
  }, [])

  return (
    <Draggable draggableId={card._id} index={index}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <div
            className="Card"
            onClick={() => setPointerEvents('auto')}
            onBlur={() => setPointerEvents('none')}
          >
            <TextareaAutosize
              onClick={() => setPointerEvents('default')}
              onChange={e => {
                setValue(e.target.value)
                card.title = e.target.value
              }}
              minRows={1}
              value={value}
              style={{
                resize: 'none',
                outline: 'none',
                background: 'transparent',
                border: 'none',
                width: '100%',
                pointerEvents: pointerEvents
              }}
            />
            <VscEdit className="VscEdit" />
          </div>
        </div>
      )}
    </Draggable>
  )
}
