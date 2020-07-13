import React from "react"
// import Sketch from "react-p5"
import loadable from "@loadable/component"

class App extends React.Component {
  url =
    "https://quickdrawfiles.appspot.com/drawing/cat?isAnimated=false&format=json&key="

  strokeIndex = 0
  index = 0
  cat
  prevx
  prevy
  keyInput
  start

  async newCat(p5) {
    let apiKey = "AIzaSyCLxdiMV5-46xuFWFbdDhVoJi7DMwe-H9Q" // keyInput.value();
    p5.loadJSON(this.url + apiKey, data => this.gotCat(p5, data))
  }

  async gotCat(p5, data) {
    p5.background(255)
    this.cat = await data.drawing
  }

  render() {
    if (typeof window !== "undefined") {
      const Sketch = loadable(() => import("react-p5"))

      return (
        <div className="App">
          <Sketch
            setup={(p5, parentRef) => {
              p5.createCanvas(255, 255).parent(parentRef)
              this.newCat(p5)
            }}
            draw={p5 => {
              if (this.cat) {
                let x = this.cat[this.strokeIndex][0][this.index]
                let y = this.cat[this.strokeIndex][1][this.index]
                p5.stroke(0)
                p5.strokeWeight(3)

                if (this.prevx !== undefined) {
                  p5.line(this.prevx, this.prevy, x, y)
                }

                this.index++

                if (this.index === this.cat[this.strokeIndex][0].length) {
                  this.strokeIndex++
                  this.prevx = undefined
                  this.prevy = undefined
                  this.index = 0

                  if (this.strokeIndex === this.cat.length) {
                    this.cat = undefined
                    this.strokeIndex = 0
                    setTimeout(this.newCat(p5), 100)
                  }
                } else {
                  this.prevx = x
                  this.prevy = y
                }
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
