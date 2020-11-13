import React from "react"
import loadable from "@loadable/component"

let stars = []
let speed

function Star(p5) {
  this.x = p5.random(-p5.width, p5.width)
  this.y = p5.random(-p5.height, p5.height)
  this.z = p5.random(0, p5.width)
  this.pz = this.z

  this.update = function (p5) {
    this.z = this.z - speed
    if (this.z < 1) {
      this.z = p5.width
      this.x = p5.random(-p5.width, p5.width)
      this.y = p5.random(-p5.height, p5.height)
      this.pz = this.z
    }
  }

  this.show = function (p5) {
    p5.fill(255)
    p5.noStroke()

    var sx = p5.map(this.x / this.z, 0, 1, 0, p5.width)
    var sy = p5.map(this.y / this.z, 0, 1, 0, p5.height)

    var r = p5.map(this.z, 0, p5.width, 16, 0)
    p5.ellipse(sx, sy, r, r)

    var px = p5.map(this.x / this.pz, 0, 1, 0, p5.width)
    var py = p5.map(this.y / this.pz, 0, 1, 0, p5.height)

    this.pz = this.z

    p5.stroke(255)
    p5.line(px, py, sx, sy)
  }
}

class App extends React.Component {
  render() {
    if (typeof window !== "undefined") {
      const Sketch = loadable(() => import("react-p5"))

      return (
        <div className="App">
          <Sketch
            setup={(p5, parentRef) => {
              p5.createCanvas(600, 600).parent(parentRef)
              for (let i = 0; i < 800; i++) {
                stars[i] = new Star(p5)
              }
            }}
            draw={p5 => {
              speed = p5.map(p5.mouseX, 0, p5.width, 0, 50)
              p5.background(0)
              p5.translate(p5.width / 2, p5.height / 2)
              for (var i = 0; i < stars.length; i++) {
                stars[i].update(p5)
                stars[i].show(p5)
              }
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
