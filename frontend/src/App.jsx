import { useState } from "react";
import { Outlet } from 'react-router-dom';

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import UserProfile from "./pages/UserProfile";
function App() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
