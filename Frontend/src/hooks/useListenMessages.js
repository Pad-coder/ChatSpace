import { useEffect } from "react"
import useSelectedConversation from "./useSelectedConversation"
import { useSocketContext } from "../socket/SocketContext"

const useListenMessages = () => {
  const {socket} = useSocketContext();
  const {messages,setMessages} =  useSelectedConversation()

  useEffect(()=>{
    socket?.on("newMessage",(newMessage)=>{
        newMessage.shouldShake = true;
        setMessages([...messages,newMessage]);
    });
    return ()=> socket?.off("newMessage");
  },[socket,messages,setMessages]);
}

export default useListenMessages