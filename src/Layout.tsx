import { Outlet } from "react-router-dom";
import HomePage from './HomePage/HomePage';

const Layout = () => {
  return (
    <main>
        {/* <HomePage /> */}
        <Outlet />
    </main>
  )
}

export default Layout
