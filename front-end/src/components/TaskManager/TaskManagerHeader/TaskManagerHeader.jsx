import React, { useState } from 'react'
import './TaskManagerHeader.css'
import { BiSearch } from 'react-icons/bi'
import { TbMenu } from 'react-icons/tb'
import { Menu } from './Menu/Menu'
import { Collapse } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export const TaskManagerHeader = ({ setBackgroundImage }) => {
  const [open, setOpen] = useState(true)
  const [openSideMenu, setOpenSideMenu] = useState(false)
  let navigate = useNavigate()

  const goHome = () => {
    let path = `/taskmanager`
    navigate(path)
  }

  const handleOnClick = () => {
    setOpen(!open)
    setOpenSideMenu(true)
  }

  return (
    <div>
      <Collapse in={open}>
        <div className="TaskManagerHeader">
          <div className="BeforeLogo" onClick={handleOnClick}>
            <TbMenu
              style={{
                marginRight: '5px',
                fontSize: '1.25rem',
                fontWeight: 'bold'
              }}
            />
            <span>Menu</span>
          </div>
          <div onClick={goHome} className="HeaderLogo">
            <span className="MTM">MTM</span>
            <span className="MTM-text">MyTaskManager</span>
          </div>
          <div className="AfterLogo">
            <BiSearch
              style={{
                marginRight: '5px',
                fontSize: '1.25rem',
                fontWeight: 'bold'
              }}
            />
            <span>Search</span>
          </div>
        </div>
      </Collapse>
      <Collapse in={!open}>
        <Menu
          setBackgroundImage={setBackgroundImage}
          setOpen={setOpen}
          openSideMenu={openSideMenu}
          setOpenSideMenu={setOpenSideMenu}
        />
      </Collapse>
    </div>
  )
}
