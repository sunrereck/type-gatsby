import React from "react"
import loadable from "@loadable/component"

let n = 0
let c = 3
let start = 0

class App extends React.Component {
  render() {
    if (typeof window !== "undefined") {
      const Sketch = loadable(() => import("react-p5"))

      return (
        <div className="App">
          <Sketch
            setup={(p5, parentRef) => {
              p5.createCanvas(400, 400).parent(parentRef)
              p5.angleMode(p5.DEGREES)
              p5.colorMode(p5.HSB)
            }}
            draw={p5 => {
              p5.background(0)
              p5.translate(p5.width / 2, p5.height / 2)
              p5.rotate(n * 0.3)
              for (let i = 0; i < n; i++) {
                let a = i * 137.5
                let r = c * p5.sqrt(i)
                let x = r * p5.cos(a)
                let y = r * p5.sin(a)
                let hu = p5.sin(start + i * 0.5)
                hu = p5.map(hu, -1, 1, 0, 360)
                p5.fill(hu, 255, 255)
                p5.noStroke()
                p5.ellipse(x, y, 4, 4)
              }
              n += 5
              start += 5
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
