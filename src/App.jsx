import { Routes, Route, Outlet, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Palette from "./pages/Palette";
import NoMatch from "./pages/NoMatch";
import MyNavbar from "./components/MyNavbar";
import Footer from "./components/Footer";
import Login from "./components/LoginElement";
import Register from "./components/RegisterElement";
import Dashboardd from "./pages/Dashboardd";

export default function App() {
  return (
    <div>
      <Routes>
          <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="palette" element={<Palette />} />
          <Route path="about" element={<About />} />
          <Route path="dashboard" element={<Dashboardd />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}

function Layout() {
  return (
    <div>
      <MyNavbar />
      {/* <Footer /> */}
      <Outlet />
    </div>
  );
}
