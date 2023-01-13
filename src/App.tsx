import Layout from './Layout/index';
import Login from "./pages/login"
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from "recoil"
import { Routes, Route } from "react-router-dom"
function App() {
  return (
    <>
      <BrowserRouter>
        <RecoilRoot>
          <Routes>
            <Route path="*" element={<Layout />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </RecoilRoot>
      </BrowserRouter>
    </>
  )
}
export default App
