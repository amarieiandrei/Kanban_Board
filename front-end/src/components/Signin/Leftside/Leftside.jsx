import React, { useState, useEffect } from 'react'
import './Leftside.css'

export const Leftside = () => {
  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window
    return {
      width,
      height
    }
  }

  function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(
      getWindowDimensions()
    )
    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions())
      }

      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }, [])

    return windowDimensions
  }

  const { height, width } = useWindowDimensions()

  function dots() {
    const canvas = document.querySelector('canvas')

    canvas.width = width
    canvas.height = height

    let c = canvas.getContext('2d')

    // get the buble cord

    let mouse = {
      x: 0,
      y: 0
    }
    window.addEventListener('mousemove', function (e) {
      mouse.x = e.x
      mouse.y = e.y
    })

    let bubleCord = []
    let balls = 200

    for (let i = 0; i < balls; i++) {
      bubleCord.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.floor(Math.random() * 7),
        dx: (Math.random() - 0.5) * 2,
        dy: (Math.random() - 0.5) * 2
      })
    }

    // draw buble
    function draw() {
      for (let i = 0; i < bubleCord.length; i++) {
        let buble = bubleCord[i]
        c.beginPath()
        c.arc(buble.x, buble.y, buble.radius, 0, Math.PI * 2, false)
        c.stroke()
        c.fillStyle = '#fff'
        c.fill()
      }
      // draw the line from one buble to other
      c.beginPath()
      for (let i = 0; i < bubleCord.length; i++) {
        let l1 = bubleCord[i]
        c.moveTo(l1.x, l1.y)
        if (distance(mouse, l1) < 70) {
          c.lineTo(mouse.x, mouse.y)
        }
        for (let j = 0; j < bubleCord.length; j++) {
          let l2 = bubleCord[j]
          if (distance(l1, l2) < 70) {
            c.lineTo(l2.x, l2.y)
          }
        }
      }
      c.lineWidth = '0.15'
      c.strokeStyle = '#fff'
      c.stroke()
    }

    function update() {
      for (let i = 0; i < bubleCord.length; i++) {
        let s = bubleCord[i]
        if (s.x < 0 || s.x > canvas.width) {
          s.dx = -s.dx
        }
        if (s.y < 0 || s.y > canvas.height) {
          s.dy = -s.dy
        }
        s.x += s.dx
        s.y += s.dy
      }
      draw()
    }

    function distance(piont1, piont2) {
      let dx = 0
      let dy = 0

      dx = piont2.x - piont1.x
      dx = dx * dx
      dy = piont2.y - piont1.y
      dy = dy * dy

      return Math.sqrt(dx + dy)
    }

    function animate() {
      requestAnimationFrame(animate)
      c.clearRect(0, 0, canvas.width, canvas.height)
      update()
    }

    animate()
  }

  // const [boards, setBoards] = useState([]);

  useEffect(() => {
    dots()
    /// const response = fetch(asdasd);
    /// setBoards( response )
  }, [])

  ///

  return (
    // boards access

    <div className="Leftside">
      <canvas
        style={{
          position: 'absolute',
          left: '0',
          top: '0',
          width: '100%',
          height: '100%'
        }}
      ></canvas>
      <div className="Logo">
        <a
          href="https://amarieiandrei.github.io/MyWebsite/html/home"
          className="LogoHref"
        >
          maliakademy
        </a>
      </div>
      <div className="Text">
        <span>Discover MyTaskManager</span>
        <span>& Wellcome Back.</span>
      </div>
      <div className="Art">
        <span>Art by </span>
        <a
          href="https://amarieiandrei.github.io/MyWebsite/html/home"
          className="ArtLink"
        >
          Maliakademy
        </a>
      </div>
    </div>
  )
}
