import { Main404 } from "./Page404Style" 
import { useContext } from "react"
import { ThemeContext } from "../../context/ThemeProvider"
export default function Page404(){
  const { colorScheme } = useContext(ThemeContext)
  return (
      <>
       <Main404 colors={colorScheme}>
          404, page not found! :(
       </Main404 >
      </>
      )
}
