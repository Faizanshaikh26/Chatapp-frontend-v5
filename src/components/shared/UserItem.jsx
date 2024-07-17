// import { Avatar, IconButton, ListItem, Stack, Typography } from "@mui/material";
// import React from "react";
// import { Add as AddIcon, Remove as RemoveICon } from "@mui/icons-material";

// function Useritem({ user, handler, handlerisLoading ,isAdded=false,

//   styling={}
// }) {
//   const { name, _id, avatar } = user;
//   return (
//     <ListItem>
//       <Stack
//         direction={"row"}
//         alignItems={"center"}
//         spacing={"1rem"}
//         width={"100%"}
//        {...styling}
//       >
        
//         <Avatar src={avatar} alt={name} />
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
//           {name}
//         </Typography>
        

//         <IconButton
//           size="small"
//           sx={{
//             bgcolor:isAdded ? "error.main" : "primary.main",
//             color: "white",
//             "&:hover": {
//               bgcolor: isAdded ? "error.dark" :"primary.dark",
//             },
//           }}
//           onClick={() => handler(_id)}
//           disabled={handlerisLoading}
//         >
//          {
//           isAdded ? <RemoveICon/> : <AddIcon />
//          }
//         </IconButton>
//       </Stack>
//     </ListItem>
//   );
// }

// export default Useritem;

import { Avatar, IconButton, ListItem, Stack, Typography } from "@mui/material";
import React from "react";
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import {transformImage} from '../../lib/features'

function Useritem({ user, handler, handlerisLoading, isAdded = false, styling = {} }) {
  const { name, _id, avatar } = user;

  // Ensure avatar is a string
  // const avatarSrc = Array.isArray(avatar) && avatar.length > 0 ? avatar[0] : "";

  return (
    <ListItem>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        width={"100%"}
        sx={styling} // Use sx prop to apply styling
      >
        <Avatar src={transformImage(avatar)} alt={name} />
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
          {name}
        </Typography>
        <IconButton
          size="small"
          sx={{
            bgcolor: isAdded ? "error.main" : "primary.main",
            color: "white",
            "&:hover": {
              bgcolor: isAdded ? "error.dark" : "primary.dark",
            },
          }}
          onClick={() => handler(_id)}
          disabled={handlerisLoading}
        >
          {isAdded ? <RemoveIcon /> : <AddIcon />}
        </IconButton>
      </Stack>
    </ListItem>
  );
}

export default Useritem;
