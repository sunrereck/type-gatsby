import React from "react"
// import Sketch from "react-p5"

import loadable from "@loadable/component"

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
            }}
            draw={p5 => {
              p5.background(0)
              p5.translate(200, 200)
              p5.rotate(-90)

              let hr = p5.hour()
              let mn = p5.minute()
              let sc = p5.second()

              p5.strokeWeight(8)
              p5.stroke(255, 100, 150)
              p5.noFill()
              let secondAngle = p5.map(sc, 0, 60, 0, 360)
              //   p5.arc(0, 0, 300, 300, 0, secondAngle)

              p5.stroke(150, 100, 255)
              let minuteAngle = p5.map(mn, 0, 60, 0, 360)
              //   p5.arc(0, 0, 280, 280, 0, minuteAngle)

              p5.stroke(150, 255, 100)
              let hourAngle = p5.map(hr % 12, 0, 12, 0, 360)
              //   p5.arc(0, 0, 260, 260, 0, hourAngle)

              p5.push()
              p5.rotate(secondAngle)
              p5.stroke(255, 100, 150)
              p5.line(0, 0, 100, 0)
              p5.pop()

              p5.push()
              p5.rotate(minuteAngle)
              p5.stroke(150, 100, 255)
              p5.line(0, 0, 75, 0)
              p5.pop()

              p5.push()
              p5.rotate(hourAngle)
              p5.stroke(150, 255, 100)
              p5.line(0, 0, 50, 0)
              p5.pop()

              p5.stroke(255)
              p5.point(0, 0)
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
