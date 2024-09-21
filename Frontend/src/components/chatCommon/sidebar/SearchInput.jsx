import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import useConversation from "../../../hooks/useConversation";
import useSelectedConversation from "../../../hooks/useSelectedConversation";
import toast from "react-hot-toast";
const SearchInput = () => {
  const [search, setSearch] = useState();
  const { selectedConversation, setSelectedConversation } =
    useSelectedConversation();
  const { conversations } = useConversation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast.error("Search must be at least 3 characters long");
    }
    
    const conversation = conversations.find((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );
    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else toast.error("No user found");
  };
  return (
    <form className="flex items-center gap-2" onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search"
        className="input input-bordered   rounded-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit" className="btn btn-circle bg-stone-900 text-white">
        <FaSearch className="outline-none" />
      </button>
    </form>
  );
};

export default SearchInput;
