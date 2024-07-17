// import {
//   AttachFile as AttachFileIcon,
//   Send as SendIcon,
// } from "@mui/icons-material";
// import { IconButton, Skeleton, Stack } from "@mui/material";
// import React, { useCallback, useEffect, useRef, useState } from "react";
// import Applayout from "../components/layout/Applayout";
// import MessageComponent from "../components/shared/MessageComponent";
// import { InputBox } from "../components/styles/StyledComponents";
// import {
//   ALERT,
//   NEW_MESSAGE,
//   START_TYPING_CHAT,
//   STOP_TYPING_CHAT,
// } from "../constants/events";
// import Filemenu from "../dialogue/Filemenu";
// import { useErrors, useSocketEvents } from "../hooks/hook";
// import { useGetChatDetailsQuery, useGetMessagesQuery } from "../redux/api/api";
// import { useSocket } from "../Socket";
// import { useInfiniteScrollTop } from "6pp";
// import { useDispatch } from "react-redux";
// import { setIsFileMenu } from "../redux/reducer/misc";
// import { removeNewMessagesAlert } from "../redux/reducer/chat";
// import TypingLoader from "../components/layout/TypingLoader";
// import { useNavigate } from "react-router-dom";

// function Chat({ chatId, user }) {
//   const dispatch = useDispatch();
//   const socket = useSocket();
//   const navigate=useNavigate()
//   const containerRef = useRef(null);
//   [];
//   const [message, setMessage] = useState("");
//   const [page, setPage] = useState(1);
//   const [messages, setmessages] = useState([]);
//   const [fileMenuAnchor, setfileMenuAnchor] = useState(null);
//   const [IamTyping, setIamTyping] = useState(false);
//   const [userTyping, setuserTyping] = useState(false);
//   console.log(userTyping)
//   const typingTimeout = useRef(null);
//   const bottomRef=useRef(null);

//   const chatDetails = useGetChatDetailsQuery({ chatId, skip: !chatId });
//   const oldMessagesChunk = useGetMessagesQuery({ chatId, page });
//   const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
//     containerRef,
//     oldMessagesChunk.data?.totalPages,
//     page,
//     setPage,
//     oldMessagesChunk.data?.messages
//   );

//   const members = chatDetails.data?.chat?.members;

//   const messageChangeHandler = (e) => {
//     setMessage(e.target.value);

//     if (!IamTyping) {
//       socket.emit(START_TYPING_CHAT, { members, chatId });
//       setIamTyping(true);
//     }
//     if (typingTimeout.current) clearTimeout(typingTimeout.current);
//     typingTimeout.current = setTimeout(() => {
//       socket.emit(STOP_TYPING_CHAT, { members, chatId });
//       setIamTyping(false);
//     }, 2000);
//   };

//   const errors = [
//     { isError: chatDetails.isError, error: chatDetails.error },
//     { isError: oldMessagesChunk.isError, error: oldMessagesChunk.error },
//   ];

//   const openFileAttachment = (e) => {
//     dispatch(setIsFileMenu(true));
//     setfileMenuAnchor(e.currentTarget);
//   };

//   useEffect(() => {
//     dispatch(removeNewMessagesAlert(chatId));

//     return () => {
//       setmessages([]);
//       setMessage("");
//       setOldMessages([]);
//       setPage(1);
//     };
//   }, [chatId]);
//   useEffect(() => {
//     if(bottomRef.current) bottomRef.current.scrollIntoView({behavior:'smooth'})
  
  
//   }, [messages])

//   useEffect(() => {
//     if (chatDetails.isError) return navigate("/");
//   }, [chatDetails.isError]);
//   const submitHandler = (e) => {
//     e.preventDefault();
//     if (!message.trim()) return;

//     socket.emit(NEW_MESSAGE, { chatId, message, members });
//     setMessage("");
//   };

//   const newMessagesHandler = useCallback(
//     (data) => {
//       if (data.chatId !== chatId) return;
//       setmessages((prev) => [...prev, data.message]);
//     },
//     [chatId]
//   );

//   const startTypingHandler = useCallback(
//     (data) => {
//       if (data.chatId !== chatId) return;
//       setuserTyping(true);
//     },
//     [chatId]
//   );
//   const stopTypingHandler = useCallback(
//     (data) => {
//       if (data.chatId !== chatId) return;
//       setuserTyping(false);
//     },
//     [chatId]
//   );
//   const alertHandler = useCallback(
//     (data) => {
//       if(data.chatId !== chatId) return;
//       const messageForAlert = {
//         content:data.message,
      
//         sender: {
//           _id: 'lsjasl',
//           name: 'Admin',
//         },
//         chat: chatId,
//         createdAt: new Date().toISOString(),
//       };
//       setmessages((prev)=>[...prev,messageForAlert])
//     },
//     [chatId]
//   );

//   const eventHandler = {
//     [NEW_MESSAGE]: newMessagesHandler,
//     [START_TYPING_CHAT]: startTypingHandler,
//     [STOP_TYPING_CHAT]: stopTypingHandler,
//     [ALERT]:alertHandler,
//   };
//   useSocketEvents(socket, eventHandler);

//   useErrors(errors);

//   const allMessages = [...oldMessages, ...messages];

//   return chatDetails.isLoading ? (
//     <Skeleton />
//   ) : (
//     <>
//       <Stack
//         ref={containerRef}
//         sx={{
//           boxSizing: "border-box",
//           padding: "1rem",
//           spacing: "1rem",
//           bgcolor: "rgba(247,247,247,1)",
//           height: "90%",
//           overflowX: "hidden",
//           overflowY: "auto",
//         }}
//       >
//         {allMessages.map((mess) => (
//           <MessageComponent key={mess._id} message={mess} user={user} />
//         ))}


//   {
//     userTyping && <TypingLoader/> 
//   }
// <div ref={bottomRef}/>

//       </Stack>

//       <form
//         style={{
//           height: "10%",
//           display: "flex",
//           alignItems: "center",
//         }}
//         onSubmit={submitHandler}
//       >
//         <Stack
//           direction="row"
//           height="100%"
//           width="100%"
//           padding={"0.6rem"}
//           position={"relative"}
//           alignItems="center"
//         >
//           <IconButton
//             sx={{
//               position: "absolute",
//               left: "1.5rem",
//               rotate: "-30deg",
//             }}
//             onClick={openFileAttachment}
//           >
//             <AttachFileIcon />
//           </IconButton>

//           <InputBox
//             placeholder="Type mesage here.."
//             value={message}
//             onChange={messageChangeHandler}
//           />

//           <IconButton
//             type="submit"
//             sx={{
//               rotate: "-30deg",
//               backgroundColor: "#FFCB74",
//               color: "black",
//               marginLeft: "1rem",
//               padding: "0.5rem",
//               ":hover": {
//                 backgroundColor: "error.dark",
//               },
//             }}
//           >
//             <SendIcon />
//           </IconButton>
//         </Stack>
//       </form>

//       <Filemenu anchorE1={fileMenuAnchor} chatId={chatId} />
//     </>
//   );
// }

// export default Applayout()(Chat);


// import {
//   AttachFile as AttachFileIcon,
//   Send as SendIcon,
// } from "@mui/icons-material";
// import { IconButton, Skeleton, Stack } from "@mui/material";
// import React, { useCallback, useEffect, useRef, useState } from "react";
// import Applayout from "../components/layout/Applayout";
// import MessageComponent from "../components/shared/MessageComponent";
// import { InputBox } from "../components/styles/StyledComponents";
// import {
//   ALERT,
//   CHAT_JOINED,
//   CHAT_LEAVED,
//   NEW_MESSAGE,
//   START_TYPING_CHAT,
//   STOP_TYPING_CHAT,
// } from "../constants/events";
// import Filemenu from "../dialogue/Filemenu";
// import { useErrors, useSocketEvents } from "../hooks/hook";
// import { useGetChatDetailsQuery, useGetMessagesQuery } from "../redux/api/api";
// import { useSocket } from "../Socket";
// import { useInfiniteScrollTop } from "6pp";
// import { useDispatch } from "react-redux";
// import { setIsFileMenu } from "../redux/reducer/misc";
// import { removeNewMessagesAlert } from "../redux/reducer/chat";
// import TypingLoader from "../components/layout/TypingLoader";
// import { useNavigate } from "react-router-dom";

// function Chat({ chatId, user }) {
//   const dispatch = useDispatch();
//   const socket = useSocket();
//   const navigate=useNavigate()
//   const containerRef = useRef(null);
//   [];
//   const [message, setMessage] = useState("");
//   const [page, setPage] = useState(1);
//   const [messages, setmessages] = useState([]);
//   const [fileMenuAnchor, setfileMenuAnchor] = useState(null);
//   const [IamTyping, setIamTyping] = useState(false);
//   const [userTyping, setuserTyping] = useState(false);
//   console.log(userTyping)
//   const typingTimeout = useRef(null);
//   const bottomRef=useRef(null);

//   const chatDetails = useGetChatDetailsQuery({ chatId, skip: !chatId });
//   const oldMessagesChunk = useGetMessagesQuery({ chatId, page });
//   const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
//     containerRef,
//     oldMessagesChunk.data?.totalPages,
//     page,
//     setPage,
//     oldMessagesChunk.data?.messages
//   );

//   const members = chatDetails.data?.chat?.members;

//   const messageChangeHandler = (e) => {
//     setMessage(e.target.value);

//     if (!IamTyping) {
//       socket.emit(START_TYPING_CHAT, { members, chatId });
//       setIamTyping(true);
//     }
//     if (typingTimeout.current) clearTimeout(typingTimeout.current);
//     typingTimeout.current = setTimeout(() => {
//       socket.emit(STOP_TYPING_CHAT, { members, chatId });
//       setIamTyping(false);
//     }, 2000);
//   };

//   const errors = [
//     { isError: chatDetails.isError, error: chatDetails.error },
//     { isError: oldMessagesChunk.isError, error: oldMessagesChunk.error },
//   ];

//   const openFileAttachment = (e) => {
//     dispatch(setIsFileMenu(true));
//     setfileMenuAnchor(e.currentTarget);
//   };

//   useEffect(() => {
//     socket.emit(CHAT_JOINED,{userId:user._id,members})
//     dispatch(removeNewMessagesAlert(chatId));

//     return () => {
//       setmessages([]);
//       setMessage("");
//       setOldMessages([]);
//       setPage(1);
//       socket.emit(CHAT_LEAVED,{userId:user._id,members})
//     };
//   }, [chatId]);
//   useEffect(() => {
//     if(bottomRef.current) bottomRef.current.scrollIntoView({behavior:'smooth'})
  
  
//   }, [messages])

//   useEffect(() => {
//     if (chatDetails.isError) return navigate("/");
//   }, [chatDetails.isError]);
//   const submitHandler = (e) => {
//     e.preventDefault();
//     if (!message.trim()) return;

//     socket.emit(NEW_MESSAGE, { chatId, message, members });
//     setMessage("");
//   };

//   const newMessagesHandler = useCallback(
//     (data) => {
//       if (data.chatId !== chatId) return;
//       setmessages((prev) => [...prev, data.message]);
//     },
//     [chatId]
//   );

//   const startTypingHandler = useCallback(
//     (data) => {
//       if (data.chatId !== chatId) return;
//       setuserTyping(true);
//     },
//     [chatId]
//   );
//   const stopTypingHandler = useCallback(
//     (data) => {
//       if (data.chatId !== chatId) return;
//       setuserTyping(false);
//     },
//     [chatId]
//   );
//   const alertHandler = useCallback(
//     (data) => {
//       if(data.chatId !== chatId) return;
//       const messageForAlert = {
//         content:data.message,
      
//         sender: {
//           _id: 'lsjasl',
//           name: 'Admin',
//         },
//         chat: chatId,
//         createdAt: new Date().toISOString(),
//       };
//       setmessages((prev)=>[...prev,messageForAlert])
//     },
//     [chatId]
//   );

//   const eventHandler = {
//     [NEW_MESSAGE]: newMessagesHandler,
//     [START_TYPING_CHAT]: startTypingHandler,
//     [STOP_TYPING_CHAT]: stopTypingHandler,
//     [ALERT]:alertHandler,
//   };
//   useSocketEvents(socket, eventHandler);

//   useErrors(errors);

//   const allMessages = [...oldMessages, ...messages];

//   return chatDetails.isLoading ? (
//     <Skeleton />
//   ) : (
//     <>
//       <Stack
//         ref={containerRef}
//         sx={{
//           boxSizing: "border-box",
//           padding: "1rem",
//           spacing: "1rem",
//           bgcolor: "rgba(247,247,247,1)",
//           height: "90%",
//           overflowX: "hidden",
//           overflowY: "auto",
//         }}
//       >
//         {allMessages.map((mess) => (
//           <MessageComponent key={mess._id} message={mess} user={user} />
//         ))}


//   {
//     userTyping && <TypingLoader/> 
//   }
// <div ref={bottomRef}/>

//       </Stack>

//       <form
//         style={{
//           height: "10%",
//           display: "flex",
//           alignItems: "center",
//         }}
//         onSubmit={submitHandler}
//       >
//         <Stack
//           direction="row"
//           height="100%"
//           width="100%"
//           padding={"0.6rem"}
//           position={"relative"}
//           alignItems="center"
//         >
//           <IconButton
//             sx={{
//               position: "absolute",
//               left: "1.5rem",
//               rotate: "-30deg",
//             }}
//             onClick={openFileAttachment}
//           >
//             <AttachFileIcon />
//           </IconButton>

//           <InputBox
//             placeholder="Type mesage here.."
//             value={message}
//             onChange={messageChangeHandler}
//           />

//           <IconButton
//             type="submit"
//             sx={{
//               rotate: "-30deg",
//               backgroundColor: "#FFCB74",
//               color: "black",
//               marginLeft: "1rem",
//               padding: "0.5rem",
//               ":hover": {
//                 backgroundColor: "error.dark",
//               },
//             }}
//           >
//             <SendIcon />
//           </IconButton>
//         </Stack>
//       </form>

//       <Filemenu anchorE1={fileMenuAnchor} chatId={chatId} />
//     </>
//   );
// }

// export default Applayout()(Chat);

import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { IconButton, Skeleton, Stack } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Applayout from "../components/layout/Applayout";
import MessageComponent from "../components/shared/MessageComponent";
import { InputBox } from "../components/styles/StyledComponents";
import {
  ALERT,
  CHAT_JOINED,
  CHAT_LEAVED,
  NEW_MESSAGE,
  START_TYPING_CHAT,
  STOP_TYPING_CHAT,
} from "../constants/events";
import Filemenu from "../dialogue/Filemenu";
import { useErrors, useSocketEvents } from "../hooks/hook";
import { useGetChatDetailsQuery, useGetMessagesQuery } from "../redux/api/api";
import { useSocket } from "../Socket";
import { useInfiniteScrollTop } from "6pp";
import { useDispatch } from "react-redux";
import { setIsFileMenu } from "../redux/reducer/misc";
import { removeNewMessagesAlert } from "../redux/reducer/chat";
import TypingLoader from "../components/layout/TypingLoader";
import { useNavigate } from "react-router-dom";
import whatsAppBg from '../assets/images/whats-appbg.jpg'
import ChatNavbar from "../components/specific/ChatNavbar";
import recivemessagenotisound from '../assets/sounds/whatsappreceive.mp3'
import sendmessagenotisound from '../assets/sounds/whatsapprsend.mp3'



function Chat({ chatId, user, data }) {
  const dispatch = useDispatch();
  const socket = useSocket();
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [message, setMessage] = useState("");
  const [page, setPage] = useState(1);
  const [messages, setMessages] = useState([]);
  const [fileMenuAnchor, setFileMenuAnchor] = useState(null);
  const [IamTyping, setIamTyping] = useState(false);
  const [userTyping, setUserTyping] = useState(false);
  const typingTimeout = useRef(null);
  const bottomRef = useRef(null);
  
  const recivemessagenoti =new Audio(recivemessagenotisound)
  const sendmessagenoti =new Audio(sendmessagenotisound)

  const chatDetails = useGetChatDetailsQuery({ chatId, skip: !chatId });
  const oldMessagesChunk = useGetMessagesQuery({ chatId, page });
  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
    containerRef,
    oldMessagesChunk.data?.totalPages,
    page,
    setPage,
    oldMessagesChunk.data?.messages
  );

  const members = chatDetails.data?.chat?.members;

  const messageChangeHandler = (e) => {
    setMessage(e.target.value);

    if (!IamTyping) {
      socket.emit(START_TYPING_CHAT, { members, chatId });
      setIamTyping(true);
    }
    if (typingTimeout.current) clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => {
      socket.emit(STOP_TYPING_CHAT, { members, chatId });
      setIamTyping(false);
    }, 2000);
  };

  const errors = [
    { isError: chatDetails.isError, error: chatDetails.error },
    { isError: oldMessagesChunk.isError, error: oldMessagesChunk.error },
  ];

  const openFileAttachment = (e) => {
    dispatch(setIsFileMenu(true));
    setFileMenuAnchor(e.currentTarget);
  };

  useEffect(() => {
    socket.emit(CHAT_JOINED, { userId: user._id, members });
    dispatch(removeNewMessagesAlert(chatId));

    return () => {
      setMessages([]);
      setMessage("");
      setOldMessages([]);
      setPage(1);
      socket.emit(CHAT_LEAVED, { userId: user._id, members });
    };
  }, [chatId]);

  useEffect(() => {
    if (bottomRef.current) bottomRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (chatDetails.isError) return navigate("/");
  }, [chatDetails.isError]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    socket.emit(NEW_MESSAGE, { chatId, message, members });
    sendmessagenoti.play()
    setMessage("");
    

  };

  const newMessagesHandler = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      setMessages((prev) => [...prev, data.message]);
      recivemessagenoti.play()
    },
    [chatId]
  );

  const startTypingHandler = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      setUserTyping(true);
    },
    [chatId]
  );
  const stopTypingHandler = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      setUserTyping(false);
    },
    [chatId]
  );
  const alertHandler = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      const messageForAlert = {
        content: data.message,
        sender: {
          _id: 'lsjasl',
          name: 'Admin',
        },
        chat: chatId,
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, messageForAlert]);
    },
    [chatId]
  );

  const eventHandler = {
    [NEW_MESSAGE]: newMessagesHandler,
    [START_TYPING_CHAT]: startTypingHandler,
    [STOP_TYPING_CHAT]: stopTypingHandler,
    [ALERT]: alertHandler,
  };
  useSocketEvents(socket, eventHandler);

  useErrors(errors);

  const allMessages = [...oldMessages, ...messages];

  return chatDetails.isLoading ? (
    <Skeleton />
  ) : (
    <>
      <ChatNavbar data={data} chatId={chatId} />
      <Stack
        ref={containerRef}
        sx={{
          boxSizing: "border-box",
          padding: "1rem",
          spacing: "1rem",
          bgcolor: "rgba(247,247,247,1)",
          height: "90%",
          overflowX: "hidden",
          overflowY: "auto",
        }}
        style={{
          backgroundImage: `url(${whatsAppBg})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      >
        {allMessages.map((mess) => (
          <MessageComponent key={mess._id} message={mess} user={user} />
        ))}

        {userTyping && <TypingLoader />}
        <div ref={bottomRef} />
      </Stack>

      <form
        style={{
          height: "10%",
          display: "flex",
          alignItems: "center",
        }}
        onSubmit={submitHandler}
      >
        <Stack
          direction="row"
          height="100%"
          width="100%"
          padding={"0.6rem"}
          position={"relative"}
          alignItems="center"
        >
          <IconButton
            sx={{
              position: "absolute",
              left: "1.5rem",
              rotate: "-30deg",
            }}
            onClick={openFileAttachment}
          >
            <AttachFileIcon />
          </IconButton>

          <InputBox
            placeholder="Type message here.."
            value={message}
            onChange={messageChangeHandler}
          />

          <IconButton
            type="submit"
            sx={{
              rotate: "-30deg",
              backgroundColor: "#FFCB74",
              color: "black",
              marginLeft: "1rem",
              padding: "0.5rem",
              ":hover": {
                backgroundColor: "error.dark",
              },
            }}
          >
            <SendIcon />
          </IconButton>
        </Stack>
      </form>

      <Filemenu anchorE1={fileMenuAnchor} chatId={chatId} />
    </>
  );
}

export default Applayout()(Chat);


