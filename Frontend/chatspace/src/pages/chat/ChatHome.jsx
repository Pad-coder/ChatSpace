import Sidebar from '../../Components/chatCommon/sidebar/Sidebar.jsx'
import MessageContainer from './messages/MessageContainer.jsx'


function ChatHome() {

  return (
    <div className='flex ml-1 pt-4 sm:h-[450px] md:h-[610px] rounded-lg  bg-gray-500   bg-opacity-0'>
  
   <Sidebar />
   <MessageContainer  />
 
</div>
  )
}

export default ChatHome