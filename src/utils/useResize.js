import { useState, useEffect } from "react"

const useResize = myRef => {
  const [width, setWidth] = useState(
    myRef.current ? myRef.current.offsetWidth : 0
  )
  const [height, setHeight] = useState(
    myRef.current ? myRef.current.offsetHeight : 0
  )

  useEffect(() => {
    const handleResize = () => {
      setWidth(myRef.current.offsetWidth)
      setHeight(myRef.current.offsetHeight)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [myRef])

  return { width, height }
}

export default useResize
