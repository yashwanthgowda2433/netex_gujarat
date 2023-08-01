import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useUserRegister = () => {
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const signup = async (username, email, password) => {
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    const response = await fetch('api/user/signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ username, email, password })
    })
    const json = await response.json()
    // console.log(json)

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      setSuccess(true)
      if(json.error){
          setError(json.error)
      }
      // save the user to local storage
      // localStorage.setItem('user', JSON.stringify(json))

      // update the auth context
      // dispatch({type: 'LOGIN', payload: json})

      // update loading state
      setIsLoading(false)
    }
  }

  return { signup, isLoading, error, success }
}


export const useUserLogin = () => {
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const login = async (email, password) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch('/api/user/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password })
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.message)
    }
    
    if (json.status == "Success") {
      setSuccess(true)
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json.data.user))
      console.log(json.data)

      // update the auth context
      dispatch({type: 'LOGIN', payload: json.data.user})

      // update loading state
      setIsLoading(false)
    }
    if (json.status == "Error") {
      setIsLoading(false)
      setError(json.message)
    }
  }

  return { login, isLoading, error, success }
}

export const useUserLogout = () => {
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const logout = () => {
      setError(null)

    
      setSuccess(true)
      // save the user to local storage
      localStorage.setItem('user', "")

      // update the auth context
      dispatch({type: 'LOGOUT', payload: ""})
      window.location.href="/"

      // update loading state
      setIsLoading(false)
    
  }

  return { logout, isLoading, error, success }
}