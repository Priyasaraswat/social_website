import React, { Suspense, lazy, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import "./index.css";
// import Messanger from "./pages/messanger/Messanger";
// import Login from "./pages/login/Login";
// import Register from "./pages/register/Register";
// import Profile from "./pages/profile/Profile";
// import Home from "./pages/home/Home"
// import ShowAllUser from "./pages/showAllUser/ShowAllUser";
// import UpdateUser from "./pages/updateuser/UpdateUser";
const Messanger = lazy(() => import("./pages/messanger/Messanger"));
const Login = lazy(() => import("./pages/login/Login"));
const ShowAllUser = lazy(() => import("./pages/showAllUser/ShowAllUser"));
const UpdateUser = lazy(() => import("./pages/updateuser/UpdateUser"));
const Home = lazy(() => import("./pages/home/Home"));
const Register = lazy(() => import("./pages/register/Register"));
const Profile = lazy(() => import("./pages/profile/Profile"));

function App() {
  const { user } = useContext(AuthContext);
  return (
    <Suspense fallback={<span>Loading....</span>}>
      <Router>
        <div className="App">
          <Routes>
            <Route exact path="/" element={user ? <Home /> : <Register />} />

            <Route
              path="/login"
              element={user ? <Navigate to="/" /> : <Login />}
            />

            <Route
              path="/register"
              element={user ? <Navigate to="/" /> : <Register />}
            />
            <Route
              path="/messanger"
              element={!user ? <Navigate to="/" /> : <Messanger />}
            />
            <Route path="/profile/:username" element={<Profile />} />
            <Route
              path="/showAllUser"
              element={!user ? <Navigate to="/" /> : <ShowAllUser />}
            />
            <Route path="/updateuserdata" element={<UpdateUser />} />
          </Routes>
        </div>
      </Router>
    </Suspense>
  );
}

export default App;
