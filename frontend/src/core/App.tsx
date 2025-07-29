import { BrowserRouter } from "react-router"
import Router from "../router"
import AuthenticationManagerWrapper from "@/components/template/authentication-manager-wrapper"

function App() {
  return (
    <BrowserRouter>
      <AuthenticationManagerWrapper>
        <Router />
      </AuthenticationManagerWrapper>
    </BrowserRouter>
  )
}

export default App
