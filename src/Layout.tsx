import { Outlet } from "react-router-dom";
import './App.css'

const Layout = () => {
  return (
    <main>
        <Outlet />
    </main>
  )
}

export default Layout
