import React from "react"
// import Sketch from "react-p5"

import loadable from "@loadable/component"
const Sketch = loadable(() => import("react-p5"))

const P54 = ({}) => {
  let x = 50
  const y = 50

  if (typeof window !== "undefined") {
    return (
      <Sketch
        setup={(p5, canvasParentRef) => {
          p5.createCanvas(500, 500).parent(canvasParentRef)
        }}
        draw={p5 => {
          p5.background(0)
          p5.ellipse(x, y, 70, 70)
          x++
        }}
      />
    )
  } else {
    return null
  }
}

export default P54
