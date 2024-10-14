import { useEffect } from "react"
import userStore from "./useUserData"



export const useUsers = () => {
  const setUsers = userStore((state) => state.getUsers)
  const getUsers = userStore((state) => state.users)

  useEffect(() => {
    if (getUsers.length === 0) {
      setUsers()
      console.log('spaces loaded')
    }
  }, [])


  return {
    setUsers,
    getUsers
  }
}