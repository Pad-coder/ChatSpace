import React from "react"
import { Routes, Route, Navigate } from "react-router-dom"

import SignupPage from "./pages/auth/signup/SignupPage.jsx"
import LoginPage from "./pages/auth/login/LoginPage.jsx"
import HomePage from "./pages/home/HomePage.jsx"
import Sidebar from "./Components/common/Sidebar.jsx"
import RightPanel from "./Components/common/RightPanel.jsx"
import NotificationPage from "./pages/notification/NotificationPage.jsx"
import ProfilePage from "./pages/profile/ProfilePage.jsx"
import ChatHome from "./pages/chat/ChatHome.jsx"
import { Toaster } from 'react-hot-toast'

import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "./components/common/LoadingSpinner";

function App() {
	
	 


  const { data: authUser, isLoading } = useQuery({
		// we use queryKey to give a unique name to our query and refer to it later
		queryKey: ["authUser"],
		queryFn: async () => {
			try {
				const res = await fetch("/api/auth/me");
				const data = await res.json();
				if (data.error) return null;
				if (!res.ok) {
					throw new Error(data.error || "Something went wrong");
				}
				// console.log("authUser is here:", data);
				return data;
			} catch (error) {
				throw new Error(error);
			}
		},
		retry: false,
	});

	if (isLoading) {
		return (
			<div className='h-screen flex justify-center items-center'>
				<LoadingSpinner size='lg' />
			</div>
		);
	}


  return (
    <div className='flex max-w-6xl mx-auto'>
      {authUser && <Sidebar />}
	
    <Routes>
 
      <Route path="/" element={authUser ? <HomePage /> : <Navigate to='/login'/>} />
      <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to='/'/>} />
      <Route path="/signup" element={!authUser ? <SignupPage /> : <Navigate to='/'/>} />
	  <Route path="/message" element={authUser ? <ChatHome /> : <Navigate to='/login'/>}/>
      <Route path="/notifications" element={authUser ? <NotificationPage /> : <Navigate to='/login'/>} />
      <Route path="/profile/:username" element={authUser ? <ProfilePage /> : <Navigate to='/login'/>} />
	
    </Routes>

    {authUser && <RightPanel />}
    <Toaster />
    </div>
  )
}

export default App

