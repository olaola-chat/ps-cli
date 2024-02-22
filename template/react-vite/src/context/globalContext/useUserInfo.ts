import { useState, useEffect, useCallback } from 'react'

export default function useUserInfo() {
  const [error, setError] = useState<Error>()
  const [userInfo, setUserInfo] = useState({})

  const updateUserInfo = useCallback(async () => {
    
  }, [])

  useEffect(() => {
    updateUserInfo()
  }, [updateUserInfo])

  return { userInfoError: error, userInfo, updateUserInfo }
}
