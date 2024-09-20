import { useEffect,useState } from 'react';
import { useQuery  } from '@tanstack/react-query';
import useSelectedConversation from './useSelectedConversation';



const useGetMessage = () => {
const [loading, setLoading] = useState(false);
const{selectedConversation, messages, setMessages,}=useSelectedConversation()

useEffect(() => {
  const getMessages = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/message/get/${selectedConversation._id}`);
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setMessages(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (selectedConversation?._id) getMessages();
}, [selectedConversation?._id, setMessages]);

return { messages, loading };

};

export default useGetMessage;



// const { data: messages, isLoading: loadingMessages } = useQuery({
//   queryKey:['messages', selectedConversation?._id],
//   queryFn: async() =>{
//     try {
//       const res = await fetch(`/api/message/get/${selectedConversation?._id}`);
//       const data = await res.json();
      
//       if (!res.ok) {
//         throw new Error(data.error || "Something went wrong");
//       }
//       console.log(data);
      
//       return data;
//     } catch (error) {
//       throw new Error(error.message)
//     }
//   }
// },
//   {
//     enabled: !!selectedConversation, // Only fetch messages if a conversation is selected
//   }
  
// );

// return {
//   messages,
//   loadingMessages,

// };