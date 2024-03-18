import { createContext, useContext, useState } from "react"

const showChatContext = createContext(null);



function ShowChatProvider({children}) {
   const [showChat, setShowChat] = useState(false)

  return (
    <showChatContext.Provider value={{showChat, setShowChat}}>
      {children}
    </showChatContext.Provider>
  )
}

export const useShowChat= ()=>useContext(showChatContext)
export default ShowChatProvider