import React from "react";
import AvatarCard from '../shared/AvatarCard';

function ChatNavbar({ data, chatId }) {
  const chat = data?.chats?.find(chat => chat._id === chatId);

  if (!chat) {
    return null;
  }

  const { avatar, name } = chat;

  return (

      <div className= "w-[100%] left-0  sm:w-[428px] sm:left-[42%] h-14 lg:h-16 md:h-16 bg-[#dfe1e3] text-gray-700 fixed md:top-16 top-[59px] right-[-10%] z-[999] shadow-sm md:w-[475px] md:left-[41.7%] lg:w-[70.8%] lg:left-[29.1%] ">
        <div className="flex items-center p-1 md:p-2">
          <AvatarCard avatar={avatar}  />
          <span className="font-bold text-sm md:text-lg ">{name}</span>
        </div>
      </div>
   
  );
}

export default ChatNavbar;