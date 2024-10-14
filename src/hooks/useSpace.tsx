import { useEffect } from "react"
import spaceStore from "./useSpaceData"



export const useSpace = () => {
  const setSpaces = spaceStore((state) => state.getSpaces)
  const getSpaces = spaceStore((state) => state.spaces)

  useEffect(() => {
    if (getSpaces.length === 0) {
      setSpaces()
      console.log('spaces loaded')
    }
  }, [])


  return {
    setSpaces,
    getSpaces
  }
}