import React, { createContext, useState } from 'react'

const UserContext = createContext()

export const UserProivder = ({ children }) => {
  const [user, setUser] = useState({})
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContext
