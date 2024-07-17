import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Done as DoneIcon,
  Edit as EditIcon,
  KeyboardBackspace as KeyboardBackspaceIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Drawer,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { Suspense, lazy, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Link } from "../components/styles/StyledComponents";
import AvatarCard from "../components/shared/AvatarCard";
import { sampleChats, sampleUsers } from "../constants/sampleData";
import Useritem from "../components/shared/Useritem";
import { useAddGroupMembersMutation, useDeleteChatMutation, useGetChatDetailsQuery, useGetMyGroupsQuery, useMyChatsQuery, useRemoveGroupMemberMutation, useRenameGroupMutation } from "../redux/api/api";
import {useAsyncMutation, useErrors} from '../hooks/hook'

import LayoutLoaders from '../components/layout/Loaders'
import { useDispatch, useSelector } from "react-redux";
import { setIsAddMember } from "../redux/reducer/misc";

const ConfirmDeleteDialog = lazy(() => import("../dialogue/ConfirmDelete"));
const AddMemberDialog = lazy(() => import("../dialogue/AddMembers"));

function Groups() {
  const dispatch = useDispatch();
  const { isAddMember } = useSelector((state) => state.misc);

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isEdit, setisEdit] = useState(false);
  const [groupname, setgroupname] = useState("");
  const [groupnameUpdatedValue, setgroupnameUpdatedValue] = useState("");
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);
  const [members, setMembers] = useState([]);
  const chatId = useSearchParams()[0].get("group");
  const navigate = useNavigate();
 
  const myGroups=useGetMyGroupsQuery("")
  const groupDetails = useGetChatDetailsQuery(
    { chatId, populate: true },
    { skip: !chatId }
  );
  
  const [deleteGroup, isLoadingDeleteGroup] = useAsyncMutation(
    useDeleteChatMutation
  );


  const [updateGroup,isLoadingGroupName]=useAsyncMutation(useRenameGroupMutation)
  const [removeMember, isLoadingRemoveMember] = useAsyncMutation(
    useRemoveGroupMemberMutation
  );


 


  const errors=[{
    isError:myGroups.isError,
    error:myGroups.error,

  },
  {
    isError: groupDetails.isError,
    error: groupDetails.error,
  },]

  useErrors(errors)
  useEffect(() => {
    const groupData = groupDetails.data;
    if (groupData) {
      setgroupname(groupData.chat.name);
      setgroupnameUpdatedValue(groupData.chat.name);
      setMembers(groupData.chat.members);
    }

    return () => {
      setgroupname("");
      setgroupnameUpdatedValue("");
      setMembers([]);
      setisEdit(false);
    };
  }, [groupDetails.data]);
  const handleMobile = () => {
    setIsMobileOpen((prev) => !prev);
  };
  const handleMobileClose = () => {
    setIsMobileOpen(false);
  };
  const navigateBack = () => {
    navigate("/");
  };

  const updateGroupname = () => {
    setisEdit(false);
    updateGroup("Updating group name..",{
      chatId,
      name: groupnameUpdatedValue,
    });
    console.log(groupnameUpdatedValue);
  };

  const openconfirmDeleteHandler = () => {
    setConfirmDeleteDialog(true);
  };
  const closeConfirmDeleteHandler = () => {setConfirmDeleteDialog(false)};

  const removeMemberHandler = (userId) => {
    removeMember('Removing member',{chatId, userId })
 

  };
  const openAddMemberHandler = () => {
  dispatch(setIsAddMember(true))
  };


    const deleteHandler = () => {
      deleteGroup("Deleting Group...", chatId);
      closeConfirmDeleteHandler();
      navigate("/groups");
    };
  

  useEffect(() => {
    if (chatId) {
      setgroupname(`groupname ${chatId}`);
      setgroupnameUpdatedValue(`groupname ${chatId}`);
      setisEdit(false);
    }

    return () => {
      setgroupname("");
      setgroupnameUpdatedValue("");
      setisEdit(false);
    };
  }, [chatId]);

  const IconBtns = (
    <>
      <Box
        sx={{
          display: {
            xs: "block",
            sm: "none",
          },
          position: "fixed",
          right: "1rem",
          top: "1rem",
        }}
      >
        <IconButton onClick={handleMobile}>
          <MenuIcon />
        </IconButton>
      </Box>

      <Tooltip title="back">
        <IconButton
          sx={{
            position: "absolute",
            top: "2rem",
            left: "2rem",
            zIndex: 1,
            bgcolor: "#1c1c1c",
            color: "#fff",
            "&:hover": {
              bgcolor: "#fff",
              color: "#1c1c1c",
            },
          }}
          onClick={navigateBack}
        >
          <KeyboardBackspaceIcon />
        </IconButton>
      </Tooltip>
    </>
  );

  const ButtonGroup = (
    <Stack
      direction={{
        sm: "row",
        xs: "column-reverse",
      }}
      spacing={"1rem"}
      p={{
        xs: "0",
        sm: "1rem",
        md: "1rem 4rem",
      }}
    >
      <Button
        size="large"
        color="error"
        startIcon={<DeleteIcon />}
        onClick={openconfirmDeleteHandler}
      >
        Delete Group
      </Button>
      <Button
        onClick={openAddMemberHandler}
        size="large"
        variant="contained"
        startIcon={<AddIcon />}
      >
        Accept Member
      </Button>
    </Stack>
  );

  const GroupName = (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"center"}
      spacing={"1rem"}
      padding={"3rem"}
    >
      {isEdit ? (
        <>
          <TextField
            value={groupnameUpdatedValue}
            onChange={(e) => setgroupnameUpdatedValue(e.target.value)}
          />
          <IconButton onClick={updateGroupname} disabled={isLoadingGroupName}>
            <DoneIcon />
          </IconButton>
        </>
      ) : (
        <>
          <Typography variant="h4">{groupname}</Typography>
          <IconButton  disabled={isLoadingGroupName} onClick={() => setisEdit(true)}>
            <EditIcon />
          </IconButton>
        </>
      )}
    </Stack>
  );

  return  myGroups.isLoading  ? <LayoutLoaders/> :
  (
    <Grid container height={"100vh"} overflow={'hidden'}>
      <Grid
        item
        sx={{
          display: {
            xs: "none",
            sm: "block",
          },
        }}
        sm={4}
        height={"100%"}
        bgcolor={"bisque"}
        overflow={'auto'}
       
      >
        <GroupsList myGroups={myGroups?.data?.groups} chatId={chatId} />
      </Grid>

      <Grid
        item
        xs={12}
        sm={8}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          padding: "1rem 3rem",
          overflow: "hidden"
        }}
      >
        {IconBtns}
        {groupname && (
          <>
            {GroupName}
            <Typography
              margin={"2rem"}
              alignSelf={"flex-start"}
              variant="body1"
            >
              Members
            </Typography>

            <Stack
              maxWidth={"45rem"}
              width={"100%"}
              boxSizing={"border-box"}
              padding={{
                sm: "1rem",
                xs: "0",
                md: "1rem 4rem",
              }}
              spacing={"2rem"}
              height={"50vh"}
              sx={{
                overflowY: "auto",
              }}
            >
              { isLoadingRemoveMember ? <CircularProgress/> :groupDetails?.data?.chat.members?.map((user) => (
                <Useritem
                  key={user._id}
                  user={user}
                  isAdded
                  styling={{
                    boxShadow: "0 0 0.5rem rgba(0,0,0,0.2)",
                    padding: "1rem",
                    borderRadius: "1rem",
                  }}
                  handler={removeMemberHandler}
                />
              ))}
            </Stack>

            {ButtonGroup}
          </>
        )}
      </Grid>

      {isAddMember && (
        <Suspense fallback={<Backdrop />}>
          <AddMemberDialog  chatId={chatId}/>
        </Suspense>
      )}

      {confirmDeleteDialog && (
        <Suspense fallback={<Backdrop open />}>
          <ConfirmDeleteDialog
            open={confirmDeleteDialog}
            handleclose={closeConfirmDeleteHandler}
            deletehandler={deleteHandler}
          />
        </Suspense>
      )}

      <Drawer
        sx={{
          display: {
            xs: "block",
            sm: "none",
          },
        }}
        open={isMobileOpen}
        onClose={handleMobileClose}
      >
       <GroupsList myGroups={myGroups?.data?.groups} chatId={chatId} />
      </Drawer>
    </Grid>
  );
}

const GroupsList = ({ w = "100%", myGroups = [], chatId }) => (
  <Stack width={w}>
    {myGroups.length > 0 ? (
      myGroups.map((group) => (
        <GroupsListItem group={group} chatId={chatId} key={group._id} />
      ))
    ) : (
      <Typography textAlign={"center"} padding={"1rem"} variant="body1">
        No group
      </Typography>
    )}
  </Stack>
);

const GroupsListItem = ({ group, chatId }) => {
  const { name, avatar, _id } = group;
  return (
    <Link
      to={`?group=${_id}`}
      onClick={(e) => {
        if (chatId === _id) {
          e.preventDefault();
        }
      }}
    >
      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
        <AvatarCard avatar={avatar} />
        <Typography>{name}</Typography>
      </Stack>
    </Link>
  );
};

export default Groups;
