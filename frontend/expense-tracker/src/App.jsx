import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate} from 'react-router-dom'
  import Login from './pages/Auth/Login'
  import SignUp from './pages/Auth/SignUp'
  import Home from './pages/Dashboard/Home'
  import Income from './pages/Dashboard/Income'
  import Expense from './pages/Dashboard/Expense'
import UserProvider from './context/userProvider'


const App = () => {
  return (
    <UserProvider>
    <div >
      <Router>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path ="/login" exact element={<Login/>} />
          <Route path ="signUp" exact element={<SignUp/>} />
          <Route path  ="/dashboard" element={<Home />} />
          <Route path  ="/income" element={<Income />} />
          <Route path  ="/expense" element={<Expense />} />
        </Routes>
      </Router>
      
      
      
       </div>
       </UserProvider>
  )
}

export default App

const Root = () => {
  const isAuthenticated =!!localStorage.getItem("accessToken");

  
  return isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />;
}