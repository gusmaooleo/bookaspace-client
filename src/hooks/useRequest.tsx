import { useEffect } from "react"
import requestStore from "./useRequestData"



export const useRequest = () => {
  const setRequests = requestStore((state) => state.getRequests)
  const getRequests = requestStore((state) => state.requests)

  useEffect(() => {
    if (getRequests.length === 0) {
      setRequests()
      console.log('requests loaded')
    }
  }, [getRequests])


  return {
    setRequests,
    getRequests
  }
}