import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Collapse, Drawer, Grow } from '@material-ui/core'
import './Menu.css'
import Art from '../../../../assets/Art.jpg'
import Color from '../../../../assets/Color.jpg'
import colors from '../../../../utils/color'
import images from '../../../../utils/image'

import AuthApi from '../../../../utils/AuthApi'
import { signout } from '../../../../network/request'

const useStyles = makeStyles(theme => ({
  menu: {
    marginTop: '50px',
    display: 'flex',
    justifyContent: 'space-around'
  },
  optionContainer: {
    marginTop: '50px',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    backgroundColor: '#212121',
    color: '#fff'
  },
  box: {
    width: '45%',
    height: '25vh',
    backgroundColor: 'blue',
    borderRadius: '9px',
    marginBottom: '25px',
    cursor: 'pointer'
  }
}))

export const Menu = ({
  setOpen,
  openSideMenu,
  setOpenSideMenu,
  setBackgroundImage
}) => {
  const classes = useStyles()
  const [openOptionColor, setOpenOptionColor] = useState(false)
  const [openOptionImage, setOpenOptionImage] = useState(false)
  const [openChangeBackground, setOpenChangeBackground] = useState(false)
  const authApi = React.useContext(AuthApi)

  const handleOnClick = () => {
    setOpen(true)
    setOpenSideMenu(false)
    setOpenChangeBackground(false)
    setOpenOptionColor(false)
    setOpenOptionImage(false)
  }

  const handleLogout = async () => {
    const res = await signout()
    authApi.setAuth(res.data.auth)
  }

  return (
    <div>
      <Drawer open={openSideMenu} onClose={handleOnClick}>
        <div className="MenuWrapper">
          <header className="MenuHeader">
            <i class="fa-solid fa-xmark" onClick={handleOnClick}></i>
            <div className="HeaderLogoMenu" onClick={handleOnClick}>
              <span className="MenuMTM">MTM</span>
              <span className="MTM-text">MyTaskManager</span>
            </div>
          </header>

          <Collapse in={!openChangeBackground}>
            <main className="MenuMain">
              <ul className="MenuList">
                <li className="MenuItem">Create board</li>{' '}
                <div className="BorderBottom"></div>
                <li
                  className="MenuItem"
                  onClick={() => setOpenChangeBackground(true)}
                >
                  Change background
                </li>{' '}
                <div className="BorderBottom"></div>
                <li onClick={handleLogout} className="MenuItem">
                  Logout
                </li>{' '}
                <div className="BorderBottom"></div>
              </ul>
            </main>
          </Collapse>

          <Collapse in={openChangeBackground}>
            <div className={classes.menu}>
              <div
                className={classes.box}
                style={{
                  backgroundImage: `url(${Art})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover'
                }}
                onClick={() => setOpenOptionImage(true)}
              >
                <span className="TextBoxOptions">Art</span>
              </div>
              <div
                className={classes.box}
                style={{
                  backgroundImage: `url(${Color})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover'
                }}
                onClick={() => {
                  setOpenOptionColor(true)
                  setOpenOptionImage(false)
                }}
              >
                <span className="TextBoxOptions">Color</span>
              </div>
            </div>
            {openOptionImage ? (
              <Grow in={openOptionImage}>
                <div className={classes.optionContainer}>
                  {images.map((image, index) => {
                    return (
                      <div
                        key={index}
                        className={classes.box}
                        style={{
                          backgroundImage: `url(${image})`,
                          backgroundRepeat: 'no-repeat',
                          backgroundSize: 'cover'
                        }}
                        onClick={() => setBackgroundImage(image)}
                      ></div>
                    )
                  })}
                </div>
              </Grow>
            ) : (
              <Grow in={openOptionColor}>
                <div className={classes.optionContainer}>
                  {colors.map((color, index) => {
                    return (
                      <div
                        key={index}
                        className={classes.box}
                        style={{
                          backgroundColor: color
                        }}
                        onClick={() => setBackgroundImage(color)}
                      ></div>
                    )
                  })}
                </div>
              </Grow>
            )}
          </Collapse>
        </div>
      </Drawer>
    </div>
  )
}
