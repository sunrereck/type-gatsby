import React from "react"
import loadable from "@loadable/component"

// function Firework(p5) {
//     this.hu = p5.random(255);
//     this.firework = new Particle(p5.random(p5.width), p5.height, this.hu, true);
//     this.exploded = false;
//     this.particles = [];

//     this.update = function (p5) {
//     }
//   }

let fireworks = []
let gravity

function Particle(p5, x, y, hu, firework) {
  this.pos = p5.createVector(x, y)
  this.firework = firework
  this.lifespan = 255
  this.hu = hu

  if (this.firework) {
    this.vel = p5.createVector(0, p5.random(-14, -8))
  } else {
    this.vel = p5.constructor.Vector.random2D()
    this.vel.mult(p5.random(2, 10))
  }
  this.acc = p5.createVector(0, 0)

  this.applyForce = function (p5, force) {
    this.acc.add(force)
  }

  this.update = function (p5) {
    if (!this.firework) {
      this.vel.mult(0.9)
      this.lifespan -= 4
    }
    this.vel.add(this.acc)
    this.pos.add(this.vel)
    this.acc.mult(0)
  }

  this.done = function (p5) {
    if (this.lifespan < 0) {
      return true
    } else {
      return false
    }
  }

  this.show = function (p5) {
    p5.colorMode(p5.HSB)

    if (!this.firework) {
      p5.strokeWeight(2)
      p5.stroke(this.hu, 255, 255, this.lifespan)
    } else {
      p5.strokeWeight(4)
      p5.stroke(this.hu, 255, 255, 255)
    }
    p5.point(this.pos.x, this.pos.y)
  }
}

function FireWork(p5) {
  this.hu = p5.random(255)
  this.firework = new Particle(
    p5,
    p5.random(p5.width),
    p5.height,
    this.hu,
    true
  )
  this.exploded = false
  this.particles = []

  this.done = function (p5) {
    if (this.exploded && this.particles.length === 0) {
      return true
    } else {
      return false
    }
  }

  this.update = function (p5) {
    if (!this.exploded) {
      this.firework.applyForce(p5, gravity)
      this.firework.update(p5)
      if (this.firework.vel.y >= 0) {
        this.exploded = true
        this.explode(p5)
      }
    }

    for (let i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].applyForce(p5, gravity)
      this.particles[i].update(p5)
      if (this.particles[i].done(p5)) {
        this.particles.splice(i, 1)
      }
    }
  }

  this.explode = function (p5) {
    for (let i = 0; i < 100; i++) {
      let p = new Particle(
        p5,
        this.firework.pos.x,
        this.firework.pos.y,
        this.hu,
        false
      )
      this.particles.push(p)
    }
  }

  this.show = function (p5) {
    if (!this.exploded) {
      this.firework.show(p5)
    }
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].show(p5)
    }
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
              p5.colorMode(p5.HSB)
              gravity = p5.createVector(0, 0.2)
              p5.stroke(255)
              p5.strokeWeight(4)
              p5.background(0)
            }}
            draw={p5 => {
              p5.colorMode(p5.RGB)
              p5.background(0, 0, 0, 25)
              if (p5.random(1) < 0.06) {
                fireworks.push(new FireWork(p5))
              }
              for (let i = fireworks.length - 1; i >= 0; i--) {
                fireworks[i].update(p5)
                fireworks[i].show(p5)
                if (fireworks[i].done(p5)) {
                  fireworks.splice(i, 1)
                }
              }
              console.log(fireworks.length)
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
