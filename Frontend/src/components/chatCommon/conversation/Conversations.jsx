import useConversation from "../../../hooks/useConversation.jsx";
import Conversation from "./Conversation.jsx";
import LoadingSpinner from "../../common/LoadingSpinner.jsx";

const Conversations = () => {
  const { conversations, loadingConversations } = useConversation();

  return (
    <div className="py-1 flex flex-col  overflow-auto">
      {loadingConversations ? <LoadingSpinner /> : null}

      {!loadingConversations &&
        conversations &&
        conversations?.map((conversation, idx) => (
          <Conversation
            key={conversation._id}
            conversation={conversation}
            lastIdx={idx === conversations.length - 1}
          />
        ))}
    </div>
  );
};

export default Conversations;
