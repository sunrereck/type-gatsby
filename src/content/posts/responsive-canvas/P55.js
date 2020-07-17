import React from "react"
// import Sketch from "react-p5"
import loadable from "@loadable/component"
// import useResize from "../../../utils/useResize"
import useDimensions from "../../../utils/useDimensions"

const App = () => {
  let y = 0
  let direction = "^"

  const [ref, size] = useDimensions()

  if (typeof window !== "undefined") {
    const Sketch = loadable(() => import("react-p5"))

    console.log(size)

    return (
      <div className="App" ref={ref}>
        <Sketch
          setup={(p5, parentRef) => {
            let initWidth = 640
            let initHeight = 300

            let canvasWidth = initWidth
            let canvasHeight = initHeight

            if (size.width < initWidth) {
              canvasWidth = size.width
            }

            p5.createCanvas(canvasWidth, canvasHeight).parent(parentRef)
            console.log(p5)
          }}
          draw={p5 => {
            p5.background(0)
            p5.fill(255, y * 1.3, 0)
            p5.ellipse(p5.width / 2, y, 50)
            if (y > p5.height) direction = ""
            if (y < 0) {
              direction = "^"
            }
            if (direction === "^") {
              y += 8
            } else y -= 4
          }}
        />
        <div>width : {size.width}</div>
        <div>height : {size.height}</div>
      </div>
    )
  } else {
    return null
  }
}

export default App
