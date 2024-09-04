import React from "react"
import { Routes,Route,Navigate } from "react-router-dom"
import SignupPage from "./pages/auth/signup/SignupPage.jsx"
import LoginPage from "./pages/auth/login/LoginPage.jsx"
import HomePage from "./pages/home/HomePage.jsx"
import Sidebar from "./Components/common/Sidebar.jsx"
import RightPanel from "./Components/common/RightPanel.jsx"
import NotificationPage from "./pages/notification/NotificationPage.jsx"
import ProfilePage from "./pages/profile/ProfilePage.jsx"

function App() {
 

  return (
    <div className='flex max-w-6xl mx-auto'>
      <Sidebar />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/notifications" element={<NotificationPage />} />
      <Route path="/profile/:username" element={<ProfilePage />} />
    </Routes>
    <RightPanel />
    </div>
  )
}

export default App
