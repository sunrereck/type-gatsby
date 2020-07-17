import { useEffect, useState, useRef, useLayoutEffect } from "react"

function useDimensions() {
  const ref = useRef()
  const [dimensions, setDimensions] = useState({})

  useLayoutEffect(() => {
    setDimensions(ref.current.getBoundingClientRect().toJSON())
  }, [ref.current])

  useEffect(() => {
    const handleResize = () => {
      setDimensions(ref.current.getBoundingClientRect().toJSON())
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [ref.current])

  return [ref, dimensions]
}

export default useDimensions
