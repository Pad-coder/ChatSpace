
import { useQuery } from '@tanstack/react-query'
const useConversation = () => {
    const { data: conversations, isLoading: loadingConversations, } = useQuery({
        queryKey: ['conversations'],
        queryFn: async()=>{
          try {
            const res  = await fetch('/api/user/users');
            const data = await res.json(); 
          return data;
          } catch (error) {
            throw new Error(error)
          }
        }
      });
      return {conversations, loadingConversations};
}

export default useConversation