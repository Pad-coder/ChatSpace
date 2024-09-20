import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { extractTime } from '../../../utils/formatedTime/time';
import useSelectedConversation from '../../../hooks/useSelectedConversation';


const Message = ({message}) => {

  const { data: authUser } = useQuery({ queryKey: ["authUser"] });
  const{selectedConversation}=useSelectedConversation()
  const fromMe = message.senderId === authUser._id;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe ? authUser.profile : selectedConversation?.profile;
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";
  const formattedTime = extractTime(message.createdAt);

  const shakeClass = message.shouldShake ? "shake" : ""

  return (
    <div className={`chat ${chatClassName} max-h-screen `}>
        <div className='chat-image avatar'>
            <div className='w-10 rounded-full'>
            <img
        alt="Tailwind CSS chat bubble component"
        src= {profilePic||"https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}/>
            </div>
        </div>
        <div className={`chat-bubble ${bubbleBgColor} ${shakeClass} pb-2`}>{message.message}</div>
        <div className="chat-footer opacity-50">{formattedTime}</div>
    </div>
  )
}

export default Message