import React, { useEffect, useState } from 'react'
import { getLists } from '../../network/request'
import { v4 as uuid } from 'uuid'
import './TaskManager.css'
import { TaskManagerHeader } from './TaskManagerHeader/TaskManagerHeader'
import { List } from './List/List'
import store from '../../utils/store'
import StoreApi from '../../utils/StoreApi'
import { InputListContainer } from './Input/InputList/InputListContainer'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import InitBackground from '../../assets/bgTaskManager2.png'

export const TaskManager = () => {
  const [data, setData] = useState(store)
  const [backgroundImage, setBackgroundImage] = useState(
    `url(${InitBackground})`
  )

  useEffect(() => {
    ; (async () => {
      const lists = await getLists()
      const listIds = lists.map(list => list._id)
      const newState = {
        listIds,
        lists: lists.reduce(
          (acc, value) => ({ ...acc, [value._id]: value }),
          {}
        )
      }
      setData(newState)
    })()
  }, [])

  const addMoreCard = (title, listId) => {
    const newCardId = uuid()
    const newCard = {
      _id: newCardId,
      title
    }

    const list = data.lists[listId]
    list.cards = [...list.cards, newCard]

    const newState = {
      ...data,
      lists: {
        ...data.lists,
        [listId]: list
      }
    }
    setData(newState)
  }

  const addMoreList = title => {
    const newListId = uuid()
    const newList = {
      _id: newListId,
      title,
      cards: []
    }
    const newState = {
      listIds: [...data.listIds, newListId],
      lists: {
        ...data.lists,
        [newListId]: newList
      }
    }
    setData(newState)
  }

  const updateListTitle = (title, listId) => {
    const list = data.lists[listId]
    list.title = title

    const newState = {
      ...data,
      lists: {
        ...data.lists,
        [listId]: list
      }
    }
    setData(newState)
  }

  const onDragEnd = result => {
    const { destination, source, draggableId, type } = result

    if (!destination) {
      return
    }
    if (type === 'list') {
      const newListIds = data.listIds
      newListIds.splice(source.index, 1)
      newListIds.splice(destination.index, 0, draggableId)
      return
    }
    const sourceList = data.lists[source.droppableId]
    const destinationList = data.lists[destination.droppableId]
    const draggingCard = sourceList.cards.filter(
      card => card._id === draggableId
    )[0]

    if (source.droppableId === destination.droppableId) {
      sourceList.cards.splice(source.index, 1)
      destinationList.cards.splice(destination.index, 0, draggingCard)

      const newState = {
        ...data,
        lists: {
          ...data.lists,
          [sourceList.id]: destinationList
        }
      }
      setData(newState)
    } else {
      sourceList.cards.splice(source.index, 1)
      destinationList.cards.splice(destination.index, 0, draggingCard)

      const newState = {
        ...data,
        lists: {
          ...data.lists,
          [sourceList.id]: sourceList,
          [destinationList.id]: destinationList
        }
      }
      setData(newState)
    }
  }

  return (
    <StoreApi.Provider value={{ addMoreCard, addMoreList, updateListTitle }}>
      <div
        className="TaskManager"
        style={{
          backgroundColor: backgroundImage,
          backgroundImage: `url(${backgroundImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
        }}
      >
        <TaskManagerHeader setBackgroundImage={setBackgroundImage} />
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            droppableId="TaskManagerDroppableId"
            type="list"
            direction="horizontal"
          >
            {provided => (
              <div
                className="Board"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {data.listIds.map((listId, index) => {
                  const list = data.lists[listId]
                  return (
                    <List
                      listId={list._id}
                      list={list}
                      key={listId}
                      index={index}
                    />
                  )
                })}
                <InputListContainer />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </StoreApi.Provider>
  )
}
