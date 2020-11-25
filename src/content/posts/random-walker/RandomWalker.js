import React from "react"
import loadable from "@loadable/component"

let x
let y

class App extends React.Component {
  render() {
    if (typeof window !== "undefined") {
      const Sketch = loadable(() => import("react-p5"))

      return (
        <div className="App">
          <Sketch
            setup={(p5, parentRef) => {
              p5.createCanvas(400, 400).parent(parentRef)
              x = p5.width / 2
              y = p5.height / 2
              p5.background(51)
            }}
            mousePressed={p5 => {
              p5.clear()
              x = p5.width / 2
              y = p5.height / 2
              p5.background(51)
            }}
            draw={p5 => {
              p5.stroke(255, p5.random(255), p5.random(255))
              p5.strokeWeight(2)
              p5.point(x, y)
              const r = Math.floor(p5.random(4))
              const d = 3
              switch (r) {
                case 0:
                  x = x + d
                  break
                case 1:
                  x = x - d
                  break
                case 2:
                  y = y + d
                  break
                case 3:
                  y = y - d
                  break
              }

              //   if (x < 0) {
              //     x = x + d
              //   }
              //   if (x > p5.width) {
              //     x = x - d
              //   }
              //   if (y < 0) {
              //     y = y + d
              //   }
              //   if (y > p5.height) {
              //     y = y - d
              //   }

              if (x < 0) {
                x = 0
              }
              if (x > p5.width) {
                x = p5.width
              }
              if (y < 0) {
                y = 0
              }
              if (y > p5.height) {
                y = p5.height
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
