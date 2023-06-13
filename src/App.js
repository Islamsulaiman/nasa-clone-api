import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Home from "./Pages/Home/Home";
// import Footer from "./components/Footer/Footer";
import NavCom from "./Components/Navbar/Navbar";  
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegistrationForm from "./Pages/Registeration/Registration";
import LoginForm from "./Pages/Login/Login";
import Footer from "./Components/Footer/Footer";

// import Login from "./pages/Login/Login";
// import UserProfile from "./pages/UserProfile/UserProfile";

function App() {
  return (
    <>
      <ToastContainer />

      <Router>
        <NavCom />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<RegistrationForm />} />
          {/* <Route path="/user/profile" element={<UserProfile />} /> */}
          <Route path="/login" element={<LoginForm />} />
        </Routes>

        <Footer />
      </Router>
    </>
  );
}

export default App;