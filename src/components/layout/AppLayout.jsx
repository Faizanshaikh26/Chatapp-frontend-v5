

// import { Drawer, Grid, Skeleton } from "@mui/material";
// import React, { useCallback, useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import { LightBgColor } from "../../constants/color";
// import { useErrors, useSocketEvents } from "../../hooks/hook";
// import { useMyChatsQuery } from "../../redux/api/api";
// import { setIsDeleteMenu, setIsMobile, setSelectedDeleteChat } from "../../redux/reducer/misc";
// import Title from "../shared/Title";
// import Chatlist from "../specific/Chatlist";
// import Profile from "../specific/Profile";
// import Header from "./Header";
// import { useSocket } from "../../Socket";
// import { NEW_MESSAGE_ALERT, NEW_REQUEST, ONLINE_USERS, REFETCH_CHATS } from "../../constants/events";
// import { incrementNotification, setNewMessagesAlert } from "../../redux/reducer/chat";
// import { getOrSaveFromStorage } from "../../lib/features";
// import DeleteChatMenu from "../../dialogue/DeleteChatMenu";

// const Applayout = () => (WrappedComponent) => {
//   return (props) => {
//     const params = useParams();
//     const chatId = params.chatId;
//     const deleteMenuAnchor = useRef(null);

//     const dispatch = useDispatch();
//     const { isMobile } = useSelector((state) => state.misc);
//     const { user } = useSelector((state) => state.auth);
//     const { newMessagesAlert } = useSelector((state) => state.chat);
//     const navigate = useNavigate();
//     const [onlineUsers, setOnlineUsers] = useState([]);

//     const socket = useSocket();
//     console.log("Applayout", socket.id);
//     const { isLoading, data, isError, error, refetch } = useMyChatsQuery("");
//     useErrors([{ isError, error }]);

//     useEffect(() => {
//       getOrSaveFromStorage({ key: NEW_MESSAGE_ALERT, value: newMessagesAlert });
//     }, [newMessagesAlert]);

//     const handleDeleteChat = (e, _id, groupChat) => {
//       dispatch(setIsDeleteMenu(true));
//       dispatch(setSelectedDeleteChat({ chatId: _id, groupChat }));
//       deleteMenuAnchor.current = e.currentTarget;
//     };

//     const handleMobileClose = () => {
//       dispatch(setIsMobile(false));
//     };

//     const newMessageAlertHandler = useCallback((data) => {
//       if (data.chatId === chatId) return;
//       dispatch(setNewMessagesAlert(data));
//     }, [chatId, dispatch]);

//     const onlineUsersHandler = useCallback((data) => {
//       setOnlineUsers(data);
//     }, []);
    
//     const newRequestHandler = useCallback(() => {
//       dispatch(incrementNotification());
//     }, [dispatch]);

//     const reFetchHandler = useCallback(() => {
//       refetch();
//       navigate("/");
//     }, [refetch, navigate]);

//     const eventHandlers = {
//       [NEW_MESSAGE_ALERT]: newMessageAlertHandler,
//       [NEW_REQUEST]: newRequestHandler,
//       [REFETCH_CHATS]: reFetchHandler,
//       [ONLINE_USERS]: onlineUsersHandler
//     };

//     useSocketEvents(socket, eventHandlers);

//     return (
//       <>
//         <Title />
//         <Header />
//         <DeleteChatMenu dispatch={dispatch} deleteMenuAnchor={deleteMenuAnchor} />
//         {isLoading ? (
//           <Skeleton />
//         ) : (
//           <Drawer open={isMobile} onClose={handleMobileClose}>
//             <Chatlist
//               w="70vw"
//               chats={data?.chats}
//               chatId={chatId}
//               color={LightBgColor}
//               handleDeleteChat={handleDeleteChat}
//               newMessagesAlert={newMessagesAlert}
//               onlineUsers={onlineUsers}
//             />
//           </Drawer>
//         )}
//         <Grid container height={"calc(100vh - 4rem)"}>
//           <Grid
//             item
//             sm={4}
//             md={3}
//             height={"100%"}
//             sx={{
//               display: {
//                 xs: "none",
//                 sm: "block",
//               },
//             }}
//           >
//             {isLoading ? (
//               <Skeleton />
//             ) : (
//               <Chatlist
//                 chats={data?.chats}
//                 chatId={chatId}
//                 color={LightBgColor}
//                 handleDeleteChat={handleDeleteChat}
//                 newMessagesAlert={newMessagesAlert}
//                 onlineUsers={onlineUsers}
//               />
//             )}
//           </Grid>

//           <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"}>
//             <WrappedComponent {...props} chatId={chatId} user={user} />
//           </Grid>
//           <Grid
//             item
//             md={4}
//             lg={3}
//             height={"100%"}
//             sx={{
//               display: {
//                 xs: "none",
//                 md: "block",
//                 padding: "2rem",
//                 backgroundColor: "rgba(0,0,0,0.85)",
//               },
//             }}
//           >
//             <Profile user={user} />
//           </Grid>
//         </Grid>
//       </>
//     );
//   };
// };

// export default Applayout;

import { Drawer, Grid, Skeleton } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { LightBgColor } from "../../constants/color";
import { useErrors, useSocketEvents } from "../../hooks/hook";
import { useMyChatsQuery } from "../../redux/api/api";
import { setIsDeleteMenu, setIsMobile, setSelectedDeleteChat } from "../../redux/reducer/misc";
import Title from "../shared/Title";
import Chatlist from "../specific/Chatlist";
import Profile from "../specific/Profile";
import Header from "./Header";
import { useSocket } from "../../Socket";
import { NEW_MESSAGE_ALERT, NEW_REQUEST, ONLINE_USERS, REFETCH_CHATS } from "../../constants/events";
import { incrementNotification, setNewMessagesAlert } from "../../redux/reducer/chat";
import { getOrSaveFromStorage } from "../../lib/features";
import DeleteChatMenu from "../../dialogue/DeleteChatMenu";

const Applayout = () => (WrappedComponent) => {
  return (props) => {
    const params = useParams();
    const chatId = params.chatId;
    const deleteMenuAnchor = useRef(null);

    const dispatch = useDispatch();
    const { isMobile } = useSelector((state) => state.misc);
    const { user } = useSelector((state) => state.auth);
    const { newMessagesAlert } = useSelector((state) => state.chat);
    const navigate = useNavigate();
    const [onlineUsers, setOnlineUsers] = useState([]);

    const socket = useSocket();

    const { isLoading, data, isError, error, refetch } = useMyChatsQuery("");
    useErrors([{ isError, error }]);

    useEffect(() => {
      getOrSaveFromStorage({ key: NEW_MESSAGE_ALERT, value: newMessagesAlert });
    }, [newMessagesAlert]);

    const handleDeleteChat = (e, _id, groupChat) => {
      dispatch(setIsDeleteMenu(true));
      dispatch(setSelectedDeleteChat({ chatId: _id, groupChat }));
      deleteMenuAnchor.current = e.currentTarget;
    };

    const handleMobileClose = () => {
      dispatch(setIsMobile(false));
    };

    const newMessageAlertHandler = useCallback((data) => {
      if (data.chatId === chatId) return;
      dispatch(setNewMessagesAlert(data));
    }, [chatId, dispatch]);

    const onlineUsersHandler = useCallback((data) => {
      setOnlineUsers(data);
    }, []);
    
    const newRequestHandler = useCallback(() => {
      dispatch(incrementNotification());
    }, [dispatch]);

    const reFetchHandler = useCallback(() => {
      refetch();
      navigate("/");
    }, [refetch, navigate]);

    const eventHandlers = {
      [NEW_MESSAGE_ALERT]: newMessageAlertHandler,
      [NEW_REQUEST]: newRequestHandler,
      [REFETCH_CHATS]: reFetchHandler,
      [ONLINE_USERS]: onlineUsersHandler
    };

    useSocketEvents(socket, eventHandlers);


    return (
      <>
        <Title />
        <Header />
        <DeleteChatMenu dispatch={dispatch} deleteMenuAnchor={deleteMenuAnchor} />
        {isLoading ? (
          <Skeleton />
        ) : (
          <Drawer open={isMobile} onClose={handleMobileClose}>
            <Chatlist
              w="70vw"
              chats={data?.chats}
              chatId={chatId}
              color={LightBgColor}
              handleDeleteChat={handleDeleteChat}
              newMessagesAlert={newMessagesAlert}
              onlineUsers={onlineUsers}
            />
          </Drawer>
        )}
        <Grid container height={"calc(100vh - 4rem)"}>
          <Grid
            item
            sm={5}
            md={3.5}
            height={"100%"}
            sx={{
              display: {
                xs: "none",
                sm: "block",
              },
            }}
          >
            {isLoading ? (
              <Skeleton />
            ) : (
              <Chatlist
                chats={data?.chats}
                chatId={chatId}
                color={LightBgColor}
                handleDeleteChat={handleDeleteChat}
                newMessagesAlert={newMessagesAlert}
                onlineUsers={onlineUsers}
              />
            )}
          </Grid>

          <Grid item xs={12} sm={7} md={8.5} lg={8.5} height={"100%"}>
            <WrappedComponent {...props} chatId={chatId} user={user} data={data} onlineUsers={onlineUsers} />
          </Grid>
       
        </Grid>
      </>
    );
  };
};

export default Applayout;










