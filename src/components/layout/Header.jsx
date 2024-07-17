// import React, { Suspense, lazy, useState } from "react";
// import {
//   Box,
//   AppBar,
//   Toolbar,
//   Typography,
//   IconButton,
//   Tooltip,
//   Backdrop,
//   Badge,
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import SearchIcon from "@mui/icons-material/Search";
// import AddIcon from "@mui/icons-material/Add";
// import GroupIcon from "@mui/icons-material/Group";
// import LogoutIcon from "@mui/icons-material/Logout";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { useDispatch, useSelector } from "react-redux";
// import { userNotExists } from "../../redux/reducer/auth";
// import { setIsMobile, setIsNewGroup, setIsNotifications, setIsSearch } from "../../redux/reducer/misc";
// import { server } from '../../constants/config';
// import { resetNotification } from "../../redux/reducer/chat";
// const SearchDialog = lazy(() => import("../../dialogue/Search"));
// const NotificationDialog = lazy(() => import("../../dialogue/Notifications"));
// const NewGroupDialog = lazy(() => import("../../dialogue/NewGroup"));

// function Header() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { isSearch, isNotifications,isNewGroup } = useSelector((state) => state.misc);
//   const { notificationCount } = useSelector((state) => state.chat);

//   const handleMobile = () => {
//     dispatch(setIsMobile(true));
//   };

//   const openSearch = () => {
//     dispatch(setIsSearch(true));
//   };
//   const openNewGroup = () => {
//     dispatch(setIsNewGroup(true));
//   };
//   const openNotification = () => {
//     dispatch(setIsNotifications(true));
//     dispatch(resetNotification(true));
//   };
//   const logoutHandler = async () => {
//     try {
//       const { data } = await axios.get(`${server}/api/v1/user/logout`, {
//         withCredentials: true,
//       });
//       dispatch(userNotExists());
//       toast.success(data.message);
//     } catch (error) {
//       toast.error(error?.response?.data?.message || "Something went wrong");
//     }
//   };

//   const navigateToGroup = () => navigate("/groups");

//   return (
//     <>
//       <Box sx={{ flexGrow: 1 }} height={"4rem"}>
//         <AppBar
//           position="static"
//           sx={{
//             bgcolor: "#0E1514",
//           }}
//         >
//           <Toolbar>
//             <Typography
//               variant="h6"
//               sx={{
//                 display: { xs: "none", sm: "block" },
//               }}
//             >
//               Chai
//             </Typography>

//             <Box
//               sx={{
//                 display: { xs: "block", sm: "none" },
//               }}
//             >
//               <IconButton color="inherit" onClick={handleMobile}>
//                 <MenuIcon />
//               </IconButton>
//             </Box>

//             <Box sx={{ flexGrow: 1 }} />
//             <Box>
//               <IconBtn
//                 title={"Search"}
//                 icon={<SearchIcon />}
//                 onClick={openSearch}
//               />
//               <IconBtn
//                 title={"New Group"}
//                 icon={<AddIcon />}
//                 onClick={openNewGroup}
//               />
//               <IconBtn
//                 title={"Manage Groups"}
//                 icon={<GroupIcon />}
//                 onClick={navigateToGroup}
//               />
//               <IconBtn
//                 title={"Notifications"}
//                 icon={<NotificationsIcon />}
//                 onClick={openNotification}
//                 value={notificationCount}
//               />
//               <IconBtn
//                 title={"Logout"}
//                 icon={<LogoutIcon />}
//                 onClick={logoutHandler}
//               />
//             </Box>
//           </Toolbar>
//         </AppBar>
//       </Box>
//       {isSearch && (
//         <Suspense fallback={<Backdrop open />}>
//           <SearchDialog />
//         </Suspense>
//       )}
//       {isNotifications && (
//         <Suspense fallback={<Backdrop open />}>
//           <NotificationDialog />
//         </Suspense>
//       )}
//       {isNewGroup && (
//         <Suspense fallback={<Backdrop open />}>
//           <NewGroupDialog />
//         </Suspense>
//       )}
//     </>
//   );
// }

// const IconBtn = ({ title, icon, onClick, value }) => {
//   return (
//     <Tooltip title={title}>
//       <IconButton color="inherit" size="large" onClick={onClick}>
//         {value ? (
//           <Badge badgeContent={value} color="error">
//             {icon}
//           </Badge>
//         ) : (
//           icon
//         )}
//       </IconButton>
//     </Tooltip>
//   );
// };

// export default Header;
import React, { Suspense, lazy, useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
  Backdrop,
  Badge,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import GroupIcon from "@mui/icons-material/Group";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { userNotExists } from "../../redux/reducer/auth";
import { setIsMobile, setIsNewGroup, setIsNotifications, setIsSearch } from "../../redux/reducer/misc";
import { server } from '../../constants/config';
import { resetNotification } from "../../redux/reducer/chat";
const SearchDialog = lazy(() => import("../../dialogue/Search"));
const NotificationDialog = lazy(() => import("../../dialogue/Notifications"));
const NewGroupDialog = lazy(() => import("../../dialogue/NewGroup"));

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isSearch, isNotifications,isNewGroup } = useSelector((state) => state.misc);
  const { notificationCount } = useSelector((state) => state.chat);

  const handleMobile = () => {
    dispatch(setIsMobile(true));
  };

  const openSearch = () => {
    dispatch(setIsSearch(true));
  };
  const openNewGroup = () => {
    dispatch(setIsNewGroup(true));
  };
  const openNotification = () => {
    dispatch(setIsNotifications(true));
    dispatch(resetNotification(true));
  };
  const logoutHandler = async () => {
    try {
      const { data } = await axios.get(`${server}/api/v1/user/logout`, {
        withCredentials: true,
      });
      dispatch(userNotExists());
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const navigateToGroup = () => navigate("/groups");

  return (
    <>
      <Box sx={{ flexGrow: 1 }} height={"4rem"}>
        <AppBar
          position="static"
          sx={{
            bgcolor: "#f0f2f5",
            color:"#3b4a54"
          }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              sx={{
                display: { xs: "none", sm: "block" },
              }}
            >
              Chai
            </Typography>

            <Box
              sx={{
                display: { xs: "block", sm: "none" },
              }}
            >
              <IconButton color="inherit" onClick={handleMobile}>
                <MenuIcon />
              </IconButton>
            </Box>

            <Box sx={{ flexGrow: 1 }} />
            <Box>
              <IconBtn
                title={"Search"}
                icon={<SearchIcon />}
                onClick={openSearch}
              />
              <IconBtn
                title={"New Group"}
                icon={<AddIcon />}
                onClick={openNewGroup}
              />
              <IconBtn
                title={"Manage Groups"}
                icon={<GroupIcon />}
                onClick={navigateToGroup}
              />
              <IconBtn
                title={"Notifications"}
                icon={<NotificationsIcon />}
                onClick={openNotification}
                value={notificationCount}
              />
              <IconBtn
                title={"Logout"}
                icon={<LogoutIcon />}
                onClick={logoutHandler}
              />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      {isSearch && (
        <Suspense fallback={<Backdrop open />}>
          <SearchDialog />
        </Suspense>
      )}
      {isNotifications && (
        <Suspense fallback={<Backdrop open />}>
          <NotificationDialog />
        </Suspense>
      )}
      {isNewGroup && (
        <Suspense fallback={<Backdrop open />}>
          <NewGroupDialog />
        </Suspense>
      )}
    </>
  );
}

const IconBtn = ({ title, icon, onClick, value }) => {
  return (
    <Tooltip title={title}>
      <IconButton color="inherit" size="large" onClick={onClick}>
        {value ? (
          <Badge badgeContent={value} color="error">
            {icon}
          </Badge>
        ) : (
          icon
        )}
      </IconButton>
    </Tooltip>
  );
};

export default Header;