import React,{useRef,useEffect}from 'react'
import Message from './Message'
import MessageSkeleton from '../../../Components/skeletons/MessageSkeleton'
import useGetMessage from '../../../hooks/useGetMessage'

import useListenMessages from '../../../hooks/useListenMessages'


const Messages = () => {
  const { messages, loading } = useGetMessage();
  useListenMessages()
  const lastMessageRef = useRef()
  useEffect(()=>{
    setTimeout(()=>{
      lastMessageRef.current?.scrollIntoView({behavior:"smooth"})
    },100)
  },[messages])

  return (
    <div className='px-4 flex-1 overflow-auto'>
    
    {!loading &&
				messages.length > 0 &&
				messages.map((message) => (
					<div key={message._id}
          ref={lastMessageRef}
          >
						<Message message={message} />
					</div>
				))}  
     

      {loading && [...Array(5)].map((_,idx)=><MessageSkeleton  key={idx}/>)}

      
        {!loading && messages.length===0 && <p className='text-center text-gray-500'>No messages yet</p> } 
   

    </div>
  )
}

export default Messages