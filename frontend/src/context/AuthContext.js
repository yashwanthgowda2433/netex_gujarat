import { createContext, useReducer, useEffect } from 'react'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload }
    case 'LOGOUT':
      return { user: null }
    default:
      return state
  }
}

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { 
    user: null
  })

  useEffect(() => {
    console.log(localStorage.getItem('user'))
    if(localStorage.getItem('user') != "" && localStorage.getItem('user') != "[object Object]"){
        const user = JSON.parse(localStorage.getItem('user'))

        if (user) {
            dispatch({ type: 'LOGIN', payload: user }) 
        }
    }else{
      localStorage.setItem('user','')
    }
  }, [])

  // console.log('AuthContext state:', state)
  
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AuthContext.Provider>
  )

}