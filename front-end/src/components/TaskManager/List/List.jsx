import React from 'react'
import './List.css'
import '../Input/InputCard/InputContainer.css'
import { Title } from './Title'
import { Card } from './Card'
import { InputContainer } from '../Input/InputCard/InputContainer'
import { Draggable, Droppable } from 'react-beautiful-dnd'

export const List = ({ listId, list, index }) => {
  return (
    <Draggable draggableId={listId} index={index}>
      {provided => (
        <div {...provided.draggableProps} ref={provided.innerRef}>
          <div className="List" {...provided.dragHandleProps}>
            <Title title={list.title} listId={listId} />
            <Droppable droppableId={listId}>
              {provided => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {list.cards.map((card, index) => (
                    <Card key={card._id} card={card} index={index} />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <InputContainer listId={listId} />
          </div>
        </div>
      )}
    </Draggable>
  )
}
