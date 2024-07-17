import { Button, Dialog, DialogTitle, Skeleton, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { sampleUsers } from "../constants/sampleData";
import Useritem from "../components/shared/Useritem";
import { useAddGroupMembersMutation, useAvailableFriendsQuery } from "../redux/api/api";
import { useAsyncMutation, useErrors } from "../hooks/hook";
import { useDispatch, useSelector } from "react-redux";
import { setIsAddMember } from "../redux/reducer/misc";
function AddMembers({ chatId }) {
  const dispatch = useDispatch();

  const [members, setmembers] = useState(sampleUsers);
  const { isAddMember } = useSelector((state) => state.misc);
  const [selectedMembers, setselectedMembers] = useState([]);
  const [addMembers, isLoadingAddMembers] = useAsyncMutation(
    useAddGroupMembersMutation
  );
  const {isLoading,data,isError,error} =useAvailableFriendsQuery(chatId)

  const selectMemberHandler = (id) => {
    setselectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currElem) => currElem !== id)
        : [...prev, id]
    );
  };

  const addMemberSubmitHandler = () => {
    addMembers("Adding members...", { members: selectedMembers, chatId });
    closeHandler();
  };

  const closeHandler = () => {
    dispatch(setIsAddMember(false));
  };

  useErrors([{isError,error}])
  return (
    <Dialog open={isAddMember} onClose={closeHandler}>
      <Stack>
        <DialogTitle textAlign={"center"}>Add Member</DialogTitle>

        <Stack spacing={"1rem"}>
          {isLoading ? <Skeleton/> :    data?.friends?.length > 0 ? (
         data?.friends?.map((user) => (
              <Useritem
                user={user}
                key={user._id}
                handler={selectMemberHandler}
                isAdded={selectedMembers.includes(user._id)}
              />
            ))
          ) : (
            <Typography textAlign={"center"}>No Friends</Typography>
          )}
        </Stack>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-evenly"}
        >
          <Button color="error" onClick={closeHandler}>
            Cancel
          </Button>
          <Button
            variant="contained"
            disabled={isLoadingAddMembers}
            onClick={addMemberSubmitHandler}
          >
            Submit Changes
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
}

export default AddMembers;
