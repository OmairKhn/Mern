import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import User from "./components/users/User";
import CreateUser from "./CreateUser";
import Navbar from "./Navbar";
import Login from "./components/authentication/Login";
import { auth } from "./FirebaseConfig";
import Signup from "./components/authentication/Signup";
import Home from "./Home";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        setIsLoggedIn(true);
        console.log(isLoggedIn)
      } else {
        setIsLoggedIn(false);
        console.log(isLoggedIn)
      }
    });

    return () => unsubscribe();
  }, []);



  return (
    <div    style={{
      backgroundImage: 'url(https://static.adevait.com/2021/06/Build-a-CRUD-App-With-Only-JSON-Files-Using-a-Node.js-API_1-%E2%80%93-1.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      overflow: 'hidden',
      width: '100%',
      height: '100vh',
      color: 'white' // Set font color to white
    }}>
    <BrowserRouter>
      <Navbar />
      {isLoggedIn ? (
        <>
          <Routes>
            <Route path="/" element={<User />}></Route>
            <Route path="/create" element={<CreateUser />}></Route>

            <Route path='/login' element={<Login/>} ></Route>
           
          </Routes>
        </>
      ) : (
        <>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </>
      )}
    </BrowserRouter>
    </div>
  );
}

export default App;
