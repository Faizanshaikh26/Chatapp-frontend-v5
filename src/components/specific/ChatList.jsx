
// import { Stack } from "@mui/material";
// import React from "react";
// import Chatitem from "../shared/Chatitem";

// function Chatlist({
//   w = "100%",
//   chats = [],
//   chatId,
//   onlineUsers = [],
//   newMessagesAlert = [
//     {
//       chatId: "",
//       count: 0,
//     },
//   ],
//   handleDeleteChat,
// }) {
//   return (
//     <Stack
//       width={w}
//       direction={"column"}
//       sx={{ 
//         overflowY: "auto",
//         height: "100%",
//         boxSizing: "border-box",
//       }}
//     >
//       {chats?.map((data, index) => {
//         const { _id, avatar, name, groupChat, members } = data;

//         const newMessagesAlerts = newMessagesAlert.find(
//           ({ chatId }) => chatId === _id
//         );

//         const isOnline = members?.some((member) => onlineUsers.includes(member));
        
//         return (
//           <Chatitem
//             isOnline={isOnline}
//             name={name}
//             avatar={avatar}
//             groupChat={groupChat}
//             _id={_id}
//             key={_id}
//             samesender={chatId === _id}
//             handleDeleteChat={handleDeleteChat}
//             index={index}
//             newMessageAlert={newMessagesAlerts}
//           />
//         );
//       })}
//     </Stack>
//   );
// }

// export default Chatlist;

import React from "react";
import Chatitem from "../shared/Chatitem";

function Chatlist({
  w = "w-full",
  chats = [],
  chatId,
  onlineUsers = [],
  newMessagesAlert = [
    {
      chatId: "",
      count: 0,
    },
  ],
  handleDeleteChat,
}) {
  return (
    <div
      className={`overflow-y-auto h-full box-border  ${w} border-r-[1px] border-[#ABA6A6] shadow-lg`}
      style={{ backgroundColor: "#FAFAFA", color: "#0E1514" }}
    >
      {chats?.map((data, index) => {
        const { _id, avatar, name, groupChat, members } = data;

        const newMessagesAlerts = newMessagesAlert.find(
          ({ chatId }) => chatId === _id
        );

        const isOnline = members?.some((member) => onlineUsers.includes(member));

        return (
          <Chatitem
            isOnline={isOnline}
            name={name}
            avatar={avatar}
            groupChat={groupChat}
            _id={_id}
            key={_id}
            samesender={chatId === _id}
            handleDeleteChat={handleDeleteChat}
            index={index}
            newMessageAlert={newMessagesAlerts}
          />
        );
      })}
    </div>
  );
}

export default Chatlist;


