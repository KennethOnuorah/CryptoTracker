import { useState, useEffect } from 'react'

function getViewportDimensions() {
  const { innerWidth: width, innerHeight: height } = window
  return {
    width,
    height
  }
}

const useViewportDimensions = () => {
  const [dimensions, setDimensions] = useState(getViewportDimensions())

  useEffect(() => {
    function handleResize() {
      setDimensions(getViewportDimensions())
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return dimensions
}

export default useViewportDimensions