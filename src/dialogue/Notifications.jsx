// import {
//   Dialog,
//   DialogTitle,
//   Avatar,
//   IconButton,
//   ListItem,
//   Stack,
//   Typography,
//   Button,
// } from "@mui/material";
// import React, { memo } from "react";
// import { sampleNotifications } from "../constants/sampleData";
// // import { Add as AddIcon } from "@mui/icons-material";

// function Notifications() {
//   const friendReqhandler = ({ _id, accept }) => [];
//   return (
//     <Dialog open>
//       <Stack p={{ xs: "1rem", sm: "2rem" }} maxWidth={"25rem"}>
//         <DialogTitle>Notifications</DialogTitle>
//         {sampleNotifications.length > 0 ? (
//           sampleNotifications.map((i) => (
//             <NotificationItem
//               notification={i}
//               sender={i.sender}
//               _id={i._id}
//               handler={friendReqhandler}
//             />
//           ))
//         ) : (
//           <Typography textAlign={"center"}>0 Notifications</Typography>
//         )}
//       </Stack>
//     </Dialog>
//   );
// }

// const NotificationItem = memo(({ sender, _id, handler }) => {
//   const { name, avatar } = sender;
//   return (
//     <ListItem>
//       <Stack
//         direction={"row"}
//         alignItems={"center"}
//         spacing={"1rem"}
//         width={"100%"}
//       >
//         <Avatar />
//         <Typography
//           variant="body1"
//           sx={{
//             flexGrow: 1,
//             display: "-webkit-box",
//             WebkitLineClamp: 1,
//             WebkitBoxOrient: "vertical",
//             overflow: "hidden",
//             textOverflow: "ellipsis",
//           }}
//         >
//           {`${name} sent You a friend request`}
//         </Typography>
//         <Stack
//           direction={{
//             xs: "column",
//             sm: "row",
//           }}
//         >
//           <Button onClick={() => handler({ _id, accept: true })}>Accept</Button>
//           <Button color="error" onClick={() => handler({ _id, accept: true })}>
//             Reject
//           </Button>
//         </Stack>
//       </Stack>
//     </ListItem>
//   );
// });

// export default Notifications;

import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  ListItem,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAsyncMutation, useErrors } from '../hooks/hook';
import { useAcceptFriendRequestMutation, useGetNotificationsQuery } from "../redux/api/api";
import { setIsNotifications } from '../redux/reducer/misc';


function Notifications() {
  const dispatch=useDispatch()
const {isNotifications}=useSelector(state=>state.misc)
  const {isLoading,isError,error,data}=useGetNotificationsQuery()
  const [acceptRequest]=useAsyncMutation(useAcceptFriendRequestMutation)


  const friendReqhandler = async({ _id, accept }) => {
    dispatch(setIsNotifications(false))
    await acceptRequest("Accepting Friend Request",{requestId:_id, accept})
  };
const closeHandler=()=>dispatch(setIsNotifications(false))
  useErrors([{error,isError}])


  return (
    <Dialog open={isNotifications} onClick={closeHandler}>
      <Stack p={{ xs: "1rem", sm: "2rem" }} maxWidth={"25rem"}>
        <DialogTitle>Notifications</DialogTitle>
       {
        isLoading ? <Skeleton/> :(
          <>
          
          {data?.allRequests.length > 0 ? (
          data?.allRequests.map((i) => (
            <NotificationItem
              key={i._id} // Adding a key prop is a best practice for list items
              notification={i}
              sender={i.sender}
              _id={i._id}
              handler={friendReqhandler}
            />
          ))
        ) : (
          <Typography textAlign={"center"}>0 Notifications</Typography>
        )}
          </>
        )
       }
      </Stack>
    </Dialog>
  );
}

const NotificationItem = memo(({ sender, _id, handler }) => {
  const { name, avatar } = sender;
  return (
    <ListItem>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        width={"100%"}
      >
        <Avatar src={avatar} /> {/* Added src prop */}
        <Typography
          variant="body1"
          sx={{
            flexGrow: 1,
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {`${name} sent you a friend request`}
        </Typography>
        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
        >
          <Button onClick={() => handler({ _id, accept: true })}>Accept</Button>
          <Button color="error" onClick={() => handler({ _id, accept: false })}>
            Reject
          </Button>
        </Stack>
      </Stack>
    </ListItem>
  );
});

export default Notifications;
