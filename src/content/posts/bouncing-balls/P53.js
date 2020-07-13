import React from "react"
// import Sketch from "react-p5"

import loadable from "@loadable/component"

class App extends React.Component {
  x = 320
  y = 180
  xspeed = this.randomButNotZero(-10, 10)
  yspeed = this.randomButNotZero(-10, 10)

  r = 25

  randomButNotZero(min, max) {
    const random = Math.floor(Math.random() * (max - min + 1) + min)
    if (random === 0) {
      return this.randomButNotZero()
    }

    return random
  }

  render() {
    if (typeof window !== "undefined") {
      const Sketch = loadable(() => import("react-p5"))

      return (
        <div className="App">
          <Sketch
            setup={(p5, parentRef) => {
              p5.createCanvas(640, 360).parent(parentRef)
            }}
            draw={p5 => {
              p5.background(0)
              p5.ellipse(this.x, this.y, this.r * 2, this.r * 2)

              this.x += this.xspeed
              this.y += this.yspeed

              if (this.x > p5.width - this.r || this.x < this.r) {
                this.xspeed = -this.xspeed
              }
              if (this.y > p5.height - this.r || this.y < this.r) {
                this.yspeed = -this.yspeed
              }
            }}
            mouseClicked={() => {
              this.xspeed *= 2
              this.yspeed *= 2

              console.log(this.xspeed, this.yspeed)
            }}
          />
        </div>
      )
    } else {
      return null
    }
  }
}

export default App
