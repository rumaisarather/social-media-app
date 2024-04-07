import React, { useContext } from 'react';
 import Home from "./pages/Home";
 import Profile from './pages/profile/Profile';
import Login from "./pages/Login";
 import Register from "./pages/Register";
 import Messenger from './pages/Messenger';
 import {
  BrowserRouter as Router,
   Route,
   Routes,
} from "react-router-dom";
 import { AuthContext } from './context/AuthContext';

function App() {
   
   const{user} = useContext(AuthContext);
   
   return (
  <Router>
   <Routes>
                     <Route path="/"  element={user ? <Home />: <Register/>}/>
                     <Route path="/login"  element={user ? <Home /> : <Login />}/>
                    <Route path="/register" element={user ? <Home/>: <Register />}/>
                    <Route path="/messenger" element={!user ? <Home/>: <Messenger />}/>
                     <Route path="/profile/:username" element={<Profile />}></Route>
   
   </Routes>
  </Router> 
   )
 }
 export default App;

